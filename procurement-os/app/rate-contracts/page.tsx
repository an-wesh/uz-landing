// app/rate-contracts/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function RateContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [form, setForm] = useState({ vendor_id: "", product: "", rate: "", valid_from: "", valid_to: "", packaging: "" });

  useEffect(() => { fetch(); }, []);

  async function fetch() {
    const { data: vendors } = await supabase.from("vendors").select("*").order("id",{ascending:false});
    const { data: contracts } = await supabase.from("rate_contracts").select("*").order("id",{ascending:false});
    setVendors(vendors || []);
    setContracts(contracts || []);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("rate_contracts").insert({
      vendor_id: Number(form.vendor_id),
      product: form.product,
      rate: Number(form.rate),
      valid_from: form.valid_from || null,
      valid_to: form.valid_to || null,
      packaging: form.packaging
    });
    setForm({ vendor_id:"", product:"", rate:"", valid_from:"", valid_to:"", packaging:"" });
    await fetch();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Rate Contracts</h1>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow grid grid-cols-2 gap-3 mb-6">
        <select required value={form.vendor_id} onChange={e => setForm({...form, vendor_id: e.target.value})} className="p-2 border">
          <option value="">Select vendor</option>
          {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>
        <input required placeholder="Product" value={form.product} onChange={e => setForm({...form, product: e.target.value})} className="p-2 border"/>
        <input required placeholder="Rate" value={form.rate} onChange={e => setForm({...form, rate: e.target.value})} className="p-2 border"/>
        <input type="date" value={form.valid_from} onChange={e => setForm({...form, valid_from: e.target.value})} className="p-2 border"/>
        <input type="date" value={form.valid_to} onChange={e => setForm({...form, valid_to: e.target.value})} className="p-2 border"/>
        <input placeholder="Packaging" value={form.packaging} onChange={e => setForm({...form, packaging: e.target.value})} className="p-2 border"/>
        <div className="col-span-2 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Contract</button>
        </div>
      </form>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Contracts</h2>
        <table className="w-full text-left">
          <thead><tr className="text-sm text-gray-600"><th>Vendor</th><th>Product</th><th>Rate</th><th>Valid</th></tr></thead>
          <tbody>
            {contracts.map(c => (
              <tr key={c.id} className="border-t">
                <td>{vendors.find(v=>v.id===c.vendor_id)?.name || c.vendor_id}</td>
                <td>{c.product}</td>
                <td>{c.rate}</td>
                <td>{c.valid_from} → {c.valid_to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
