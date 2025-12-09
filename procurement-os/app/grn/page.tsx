// app/grn/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function GRNPage(){
  const [pos, setPos] = useState<any[]>([]);
  const [qcs, setQcs] = useState<any[]>([]);
  const [grns, setGrns] = useState<any[]>([]);
  const [form, setForm] = useState({ po_id:"", qc_id:"", accepted_qty:"", rejected_qty:"", remarks:"" });

  useEffect(()=>{ fetch(); }, []);

  async function fetch(){
    const { data: pos } = await supabase.from("purchase_orders").select("*").order("id",{ascending:false});
    const { data: qcs } = await supabase.from("qc").select("*").order("id",{ascending:false});
    const { data: grns } = await supabase.from("grn").select("*").order("id",{ascending:false});
    setPos(pos || []);
    setQcs(qcs || []);
    setGrns(grns || []);
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    const acceptedNum = Number(form.accepted_qty || 0);
    const rejectedNum = Number(form.rejected_qty || 0);

    // fetch PO to check qty
    const { data: po } = await supabase.from("purchase_orders").select("*").eq("id", Number(form.po_id)).single();
    if (po && acceptedNum + rejectedNum > Number(po.quantity)) {
      alert("Invalid quantity: accepted + rejected > PO qty");
      return;
    }

    // insert grn, then update grn_code to GRN-<id>
    const { data: inserted } = await supabase.from("grn").insert({
      po_id: Number(form.po_id),
      qc_id: Number(form.qc_id) || null,
      accepted_qty: acceptedNum,
      rejected_qty: rejectedNum,
      remarks: form.remarks
    }).select().single();

    if (inserted?.id) {
      const code = `GRN-${inserted.id.toString().padStart(4,'0')}`;
      await supabase.from("grn").update({ grn_code: code }).eq("id", inserted.id);
    }

    setForm({ po_id:"", qc_id:"", accepted_qty:"", rejected_qty:"", remarks:"" });
    await fetch();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">GRN</h1>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow grid grid-cols-2 gap-3 mb-6">
        <select required value={form.po_id} onChange={e => setForm({...form, po_id: e.target.value})} className="p-2 border">
          <option value="">Select PO</option>
          {pos.map(p => <option key={p.id} value={p.id}>PO-{String(p.id).padStart(4,'0')} - {p.product}</option>)}
        </select>

        <select value={form.qc_id} onChange={e => setForm({...form, qc_id: e.target.value})} className="p-2 border">
          <option value="">QC (optional)</option>
          {qcs.map(q => <option key={q.id} value={q.id}>QC-{q.id} (PO-{String(q.po_id).padStart(4,'0')})</option>)}
        </select>

        <input placeholder="Accepted qty" value={form.accepted_qty} onChange={e => setForm({...form, accepted_qty: e.target.value})} className="p-2 border"/>
        <input placeholder="Rejected qty" value={form.rejected_qty} onChange={e => setForm({...form, rejected_qty: e.target.value})} className="p-2 border"/>
        <input placeholder="Remarks" value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} className="p-2 border"/>
        <div className="col-span-2 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Create GRN</button>
        </div>
      </form>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">GRNs</h2>
        <table className="w-full text-left">
          <thead><tr className="text-sm text-gray-600"><th>GRN</th><th>PO</th><th>Accepted</th><th>Rejected</th></tr></thead>
          <tbody>
            {grns.map(g => (
              <tr key={g.id} className="border-t">
                <td>{g.grn_code || `GRN-${g.id}`}</td>
                <td>PO-{String(g.po_id).padStart(4,'0')}</td>
                <td>{g.accepted_qty}</td>
                <td>{g.rejected_qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}
