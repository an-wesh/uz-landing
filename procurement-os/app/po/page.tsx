// app/po/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function POPage(){
  const [vendors, setVendors] = useState<any[]>([]);
  const [poList, setPoList] = useState<any[]>([]);
  const [form, setForm] = useState({ vendor_id:"", product:"", quantity:"", rate:"", delivery_date:"", tax:"", payment_terms:"", notes:"" });

  useEffect(()=>{ fetch(); }, []);

  async function fetch(){
    const { data: vendors } = await supabase.from("vendors").select("*");
    const { data: poList } = await supabase.from("purchase_orders").select("*").order("id",{ascending:false});
    setVendors(vendors || []);
    setPoList(poList || []);
  }

  async function onVendorOrProductChange(vendorId:string, product:string){
    setForm({...form, vendor_id: vendorId, product});
    if (!vendorId || !product) return;
    const today = new Date().toISOString().slice(0,10);
    const { data: contract } = await supabase
      .from("rate_contracts")
      .select("*")
      .eq("vendor_id", Number(vendorId))
      .eq("product", product)
      .lte("valid_from", today)
      .gte("valid_to", today)
      .maybeSingle();
    // If your Supabase client doesn't support maybeSingle in older versions, use .single() with error check
    if (contract) {
      setForm(prev => ({ ...prev, rate: String(contract.rate) }));
    }
  }

  async function submit(e:React.FormEvent){
    e.preventDefault();
    await supabase.from("purchase_orders").insert({
      vendor_id: Number(form.vendor_id),
      product: form.product,
      quantity: Number(form.quantity),
      rate: Number(form.rate),
      delivery_date: form.delivery_date || null,
      tax: Number(form.tax || 0),
      payment_terms: form.payment_terms,
      notes: form.notes
    });
    setForm({ vendor_id:"", product:"", quantity:"", rate:"", delivery_date:"", tax:"", payment_terms:"", notes:"" });
    await fetch();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Purchase Orders</h1>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow grid grid-cols-2 gap-3 mb-6">
        <select required value={form.vendor_id} onChange={e => onVendorOrProductChange(e.target.value, form.product)} className="p-2 border">
          <option value="">Select vendor</option>
          {vendors.map(v=> <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>
        <input required placeholder="Product" value={form.product} onChange={e => onVendorOrProductChange(form.vendor_id, e.target.value)} className="p-2 border"/>
        <input required placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} className="p-2 border"/>
        <input placeholder="Rate (auto-filled)" value={form.rate} onChange={e => setForm({...form, rate: e.target.value})} className="p-2 border"/>
        <input type="date" value={form.delivery_date} onChange={e => setForm({...form, delivery_date: e.target.value})} className="p-2 border"/>
        <input placeholder="Tax" value={form.tax} onChange={e => setForm({...form, tax: e.target.value})} className="p-2 border"/>
        <input placeholder="Payment terms" value={form.payment_terms} onChange={e => setForm({...form, payment_terms: e.target.value})} className="p-2 border"/>
        <input placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="p-2 border"/>
        <div className="col-span-2 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Create PO</button>
        </div>
      </form>

      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold">PO Preview (last 5)</h2>
        {poList.slice(0,5).map(po => (
          <div key={po.id} className="border p-2 my-2">
            <div className="text-sm text-gray-600">PO-{po.id.toString().padStart(4,'0')}</div>
            <div><strong>Vendor:</strong> {vendors.find(v=>v.id===po.vendor_id)?.name || po.vendor_id}</div>
            <div><strong>Product:</strong> {po.product}</div>
            <div><strong>Qty:</strong> {po.quantity}</div>
            <div><strong>Rate:</strong> {po.rate}</div>
            <div><strong>Value:</strong> {Number(po.quantity) * Number(po.rate)}</div>
            <div><strong>Delivery:</strong> {po.delivery_date}</div>
          </div>
        ))}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">All POs</h2>
        <table className="w-full text-left">
          <thead><tr className="text-sm text-gray-600"><th>PO</th><th>Vendor</th><th>Product</th><th>Qty</th></tr></thead>
          <tbody>
            {poList.map(po=>(
              <tr key={po.id} className="border-t">
                <td>PO-{String(po.id).padStart(4,'0')}</td>
                <td>{vendors.find(v=>v.id===po.vendor_id)?.name || po.vendor_id}</td>
                <td>{po.product}</td>
                <td>{po.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}
