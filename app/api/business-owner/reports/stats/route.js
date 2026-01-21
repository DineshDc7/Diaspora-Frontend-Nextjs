// app/api/business-owner/reports/stats/route.js
export async function GET(req) {
  console.log("[/api/business-owner/reports/stats] GET HIT ✅");

  const BACKEND = process.env.BACKEND_API_BASE_URL;
  if (!BACKEND) {
    return Response.json({ success: false, message: "BACKEND_API_BASE_URL missing" }, { status: 500 });
  }

  const cookie = req.headers.get("cookie") || "";
  const url = new URL(req.url);

  const backendUrl =
    `${BACKEND.replace(/\/+$/, "")}/business-owner/reports/stats` +
    (url.search ? url.search : "");

  const r = await fetch(backendUrl, {
    method: "GET",
    headers: { cookie },
    cache: "no-store",
  });

  const text = await r.text();
  return new Response(text, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") || "application/json" },
  });
}