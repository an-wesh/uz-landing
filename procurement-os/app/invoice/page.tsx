// app/invoice/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function InvoicePage(){
  const [pos, setPos] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [form, setForm] = useState({ po_id:"", invoice_no:"", invoice_qty:"", invoice_amount:"", taxes:"", file: null as File | null });

  useEffect(()=>{ fetch(); }, []);

  async function fetch(){
    const { data: pos } = await supabase.from("purchase_orders").select("*").order("id",{ascending:false});
    const { data: invoices } = await supabase.from("invoices").select("*").order("id",{ascending:false});
    setPos(pos || []);
    setInvoices(invoices || []);
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    let file_url = "";
    if (form.file) {
      const file = form.file;
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from("invoices").upload(fileName, file);
      if (error) {
        alert("Upload error: " + error.message);
        return;
      }
      // get public URL
      const { data: publicData } = supabase.storage.from("invoices").getPublicUrl(fileName);
      file_url = publicData.publicUrl;
    }

    await supabase.from("invoices").insert({
      po_id: Number(form.po_id),
      invoice_no: form.invoice_no,
      invoice_qty: Number(form.invoice_qty || 0),
      invoice_amount: Number(form.invoice_amount || 0),
      taxes: Number(form.taxes || 0),
      file_url
    });
    setForm({ po_id:"", invoice_no:"", invoice_qty:"", invoice_amount:"", taxes:"", file: null });
    await fetch();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Invoice Upload</h1>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow grid grid-cols-2 gap-3 mb-6">
        <select required value={form.po_id} onChange={e => setForm({...form, po_id: e.target.value})} className="p-2 border">
          <option value="">Select PO</option>
          {pos.map(p => <option key={p.id} value={p.id}>PO-{String(p.id).padStart(4,'0')} - {p.product}</option>)}
        </select>

        <input placeholder="Invoice No" value={form.invoice_no} onChange={e => setForm({...form, invoice_no: e.target.value})} className="p-2 border"/>
        <input placeholder="Invoice Qty" value={form.invoice_qty} onChange={e => setForm({...form, invoice_qty: e.target.value})} className="p-2 border"/>
        <input placeholder="Invoice Amount" value={form.invoice_amount} onChange={e => setForm({...form, invoice_amount: e.target.value})} className="p-2 border"/>
        <input placeholder="Taxes" value={form.taxes} onChange={e => setForm({...form, taxes: e.target.value})} className="p-2 border"/>
        <input type="file" onChange={e => setForm({...form, file: e.target.files ? e.target.files[0] : null})} className="p-2 border"/>
        <div className="col-span-2 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Upload Invoice</button>
        </div>
      </form>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Invoices</h2>
        <table className="w-full text-left">
          <thead><tr className="text-sm text-gray-600"><th>Invoice</th><th>PO</th><th>Qty</th><th>Amount</th></tr></thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-t">
                <td>{inv.invoice_no}</td>
                <td>PO-{String(inv.po_id).padStart(4,'0')}</td>
                <td>{inv.invoice_qty}</td>
                <td>{inv.invoice_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
