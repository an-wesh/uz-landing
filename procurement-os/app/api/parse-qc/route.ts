import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY!;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OpenAI key" },
        { status: 500 }
      );
    }

    const prompt = `
Extract the following fields from the text:
batch_no, purity, moisture, appearance.
Return only JSON.

Text:
${text}
    `;

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Return only JSON object." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content;

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch {}

    return NextResponse.json({ parsed }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
