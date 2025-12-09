// app/qc/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function QCPage() {
  const [pos, setPos] = useState<any[]>([]);
  const [qcs, setQcs] = useState<any[]>([]);

  const [form, setForm] = useState({
    po_id: "",
    batch_no: "",
    purity: "",
    moisture: "",
    appearance: "",
    accepted: true,
    coa_url: "",
    raw_text: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: poData } = await supabase
      .from("purchase_orders")
      .select("*")
      .order("id", { ascending: false });

    const { data: qcData } = await supabase
      .from("qc")
      .select("*")
      .order("id", { ascending: false });

    setPos(poData || []);
    setQcs(qcData || []);
  }

  // ✅ FIXED — must be async, must not call parseText(), must return fetch response
  async function parseText() {
    if (!form.raw_text) return;

    const resp = await fetch("/api/parse-qc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: form.raw_text }),
    });

    const body = await resp.json();

    if (body?.parsed) {
      setForm((f) => ({
        ...f,
        batch_no: body.parsed.batch_no ?? f.batch_no,
        purity: body.parsed.purity ?? f.purity,
        moisture: body.parsed.moisture ?? f.moisture,
        appearance: body.parsed.appearance ?? f.appearance,
      }));
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await supabase.from("qc").insert({
      po_id: Number(form.po_id),
      batch_no: form.batch_no,
      purity: Number(form.purity || 0),
      moisture: Number(form.moisture || 0),
      appearance: form.appearance,
      accepted: form.accepted,
      coa_url: form.coa_url,
    });

    setForm({
      po_id: "",
      batch_no: "",
      purity: "",
      moisture: "",
      appearance: "",
      accepted: true,
      coa_url: "",
      raw_text: "",
    });

    fetchData();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">QC Entry</h1>

      <form
        onSubmit={submit}
        className="bg-white p-4 rounded shadow grid grid-cols-2 gap-3 mb-6"
      >
        <select
          required
          value={form.po_id}
          onChange={(e) => setForm({ ...form, po_id: e.target.value })}
          className="p-2 border"
        >
          <option value="">Select PO</option>
          {pos.map((p) => (
            <option key={p.id} value={p.id}>
              PO-{String(p.id).padStart(4, "0")} – {p.product}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Paste text from CoA / PDF here..."
          value={form.raw_text}
          onChange={(e) => setForm({ ...form, raw_text: e.target.value })}
          className="p-2 border col-span-2"
        />

        {/* Button FIXED — must be parseText, NOT parseText() */}
        <div className="col-span-2 flex gap-2">
          <button
            type="button"
            onClick={parseText}
            className="px-3 py-2 bg-gray-200 rounded"
          >
            AI Parse
          </button>
        </div>

        <input
          placeholder="Batch No"
          value={form.batch_no}
          onChange={(e) => setForm({ ...form, batch_no: e.target.value })}
          className="p-2 border"
        />

        <input
          placeholder="Purity"
          value={form.purity}
          onChange={(e) => setForm({ ...form, purity: e.target.value })}
          className="p-2 border"
        />

        <input
          placeholder="Moisture"
          value={form.moisture}
          onChange={(e) => setForm({ ...form, moisture: e.target.value })}
          className="p-2 border"
        />

        <input
          placeholder="Appearance"
          value={form.appearance}
          onChange={(e) => setForm({ ...form, appearance: e.target.value })}
          className="p-2 border"
        />

        <label className="flex items-center gap-2 p-2">
          <input
            type="checkbox"
            checked={form.accepted}
            onChange={(e) =>
              setForm({ ...form, accepted: e.target.checked })
            }
          />
          Accepted
        </label>

        <input
          placeholder="CoA URL (optional)"
          value={form.coa_url}
          onChange={(e) => setForm({ ...form, coa_url: e.target.value })}
          className="p-2 border"
        />

        <div className="col-span-2 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save QC
          </button>
        </div>
      </form>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">QC Entries</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th>PO</th>
              <th>Batch</th>
              <th>Purity</th>
              <th>Moisture</th>
              <th>Accepted</th>
            </tr>
          </thead>
          <tbody>
            {qcs.map((q) => (
              <tr key={q.id} className="border-t">
                <td>PO-{String(q.po_id).padStart(4, "0")}</td>
                <td>{q.batch_no}</td>
                <td>{q.purity}</td>
                <td>{q.moisture}</td>
                <td>{q.accepted ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
