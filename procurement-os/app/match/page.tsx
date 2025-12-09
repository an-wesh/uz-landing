// app/match/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function MatchPage(){
  const [pos, setPos] = useState<any[]>([]);
  const [grns, setGrns] = useState<any[]>([]);
  const [invs, setInvs] = useState<any[]>([]);

  useEffect(()=>{ fetch(); }, []);

  async function fetch(){
    const { data: pos } = await supabase.from("purchase_orders").select("*").order("id",{ascending:false});
    const { data: grns } = await supabase.from("grn").select("*").order("id",{ascending:false});
    const { data: invs } = await supabase.from("invoices").select("*").order("id",{ascending:false});
    setPos(pos || []);
    setGrns(grns || []);
    setInvs(invs || []);
  }

  function computeStatus(po:any){
    const grn = grns.find(g => g.po_id === po.id);
    const inv = invs.find(i => i.po_id === po.id);
    const poQty = Number(po.quantity || 0);
    const grnQty = Number(grn?.accepted_qty ?? 0);
    const invQty = Number(inv?.invoice_qty ?? 0);
    let status = "Missing data";
    let issue = "";

    if (!grn && !inv) {
      status = "No GRN & Invoice";
    } else if (poQty === grnQty && grnQty === invQty) {
      status = "OK";
    } else {
      status = "Mismatch";
      if (grnQty < poQty) issue = "Short Receipt";
      if (invQty > grnQty) issue = issue ? issue + " + Excess Invoice" : "Excess Invoice";
      if (!grn) issue = "No GRN";
      if (!inv) issue = issue ? issue + " + No Invoice" : "No Invoice";
    }

    return { status, issue, poQty, grnQty, invQty, grn, inv };
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl mb-4">3-Way Match</h1>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="p-2">PO</th>
            <th>PO Qty</th>
            <th>GRN Qty</th>
            <th>Invoice Qty</th>
            <th>Match?</th>
            <th>Issue</th>
          </tr>
        </thead>
        <tbody>
          {pos.map(po => {
            const r = computeStatus(po);
            return (
              <tr key={po.id} className="border-t">
                <td className="p-2">PO-{String(po.id).padStart(4,'0')} - {po.product}</td>
                <td>{r.poQty}</td>
                <td>{r.grnQty || "-"}</td>
                <td>{r.invQty || "-"}</td>
                <td>{r.status}</td>
                <td>{r.issue || "-"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
