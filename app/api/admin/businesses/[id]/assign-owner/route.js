import { NextResponse } from "next/server";

export async function PUT(req, ctx) {
  const { id } = (await ctx.params) || {}; // ✅ FIX

  console.log("[/api/admin/businesses/:id/assign-owner] PUT HIT ✅", id);

  const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
  const cookie = req.headers.get("cookie") || "";
  const body = await req.json();

  const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/admin/businesses/${id}/assign-owner`;

  const r = await fetch(backendUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie,
    },
    body: JSON.stringify(body),
  });

  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}