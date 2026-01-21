import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("[/api/business-owner/overview] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    console.log(
      "[/api/business-owner/overview] BACKEND_API_BASE_URL:",
      BACKEND_URL
    );

    const cookie = req.headers.get("cookie") || "";

    const backendUrl = `${String(BACKEND_URL).replace(
      /\/+$/,
      ""
    )}/business-owner/dashboard/overview`;

    console.log(
      "[/api/business-owner/overview] calling backend:",
      backendUrl
    );

    const resp = await fetch(backendUrl, {
      method: "GET",
      headers: {
        cookie, // IMPORTANT: forward access/refresh cookies
      },
      cache: "no-store",
    });

    const data = await resp.json().catch(() => null);

    return NextResponse.json(data, { status: resp.status });
  } catch (err) {
    console.error("[/api/business-owner/overview] error:", err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}