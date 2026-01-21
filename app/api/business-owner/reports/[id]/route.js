import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // Next.js dynamic params are async in newer versions
  const { id } = await params;

  console.log("[/api/business-owner/reports/:id] GET HIT ✅", id);

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return NextResponse.json(
        { success: false, message: "BACKEND_API_BASE_URL is not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";

    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/business-owner/reports/${id}`;
    console.log("[/api/business-owner/reports/:id] calling backend:", backendUrl);

    const r = await fetch(backendUrl, {
      method: "GET",
      headers: {
        cookie,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await r.text();
    return new NextResponse(text, {
      status: r.status,
      headers: {
        "content-type": r.headers.get("content-type") || "application/json",
      },
    });
  } catch (err) {
    console.error("[/api/business-owner/reports/:id] error:", err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}
