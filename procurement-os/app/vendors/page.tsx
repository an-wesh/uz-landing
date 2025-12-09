// app/vendors/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    gst: "",
    payment_terms: "",
    lead_time: "",
    contact_name: "",
    contact_email: "",
    contact_phone: ""
  });

  async function fetchVendors() {
    const { data } = await supabase.from("vendors").select("*").order("id", { ascending: false });
    setVendors(data || []);
  }

  useEffect(() => { fetchVendors(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("vendors").insert(form);
    setForm({ name:"", gst:"", payment_terms:"", lead_time:"", contact_name:"", contact_email:"", contact_phone:"" });
    await fetchVendors();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Vendors</h1>

      <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
        <input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="p-2 border"/>
        <input placeholder="GST" value={form.gst} onChange={e => setForm({...form, gst: e.target.value})} className="p-2 border"/>
        <input placeholder="Payment terms" value={form.payment_terms} onChange={e => setForm({...form, payment_terms: e.target.value})} className="p-2 border"/>
        <input placeholder="Lead time" value={form.lead_time} onChange={e => setForm({...form, lead_time: e.target.value})} className="p-2 border"/>
        <input placeholder="Contact name" value={form.contact_name} onChange={e => setForm({...form, contact_name: e.target.value})} className="p-2 border"/>
        <input placeholder="Contact email" value={form.contact_email} onChange={e => setForm({...form, contact_email: e.target.value})} className="p-2 border"/>
        <input placeholder="Contact phone" value={form.contact_phone} onChange={e => setForm({...form, contact_phone: e.target.value})} className="p-2 border"/>
        <div className="col-span-2 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Create Vendor</button>
        </div>
      </form>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Vendor List</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>Name</th><th>GST</th><th>Contact</th><th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(v => (
              <tr key={v.id} className="border-t">
                <td className="py-2">{v.name}</td>
                <td>{v.gst}</td>
                <td>{v.contact_name} / {v.contact_phone}</td>
                <td>{v.payment_terms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
