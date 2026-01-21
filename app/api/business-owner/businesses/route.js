import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;

    if (!BACKEND_URL) {
      return NextResponse.json(
        { message: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";

    const backendUrl = `${BACKEND_URL.replace(/\/+$/, "")}/business-owner/businesses`;

    console.log("[/api/business-owner/businesses] GET HIT ✅");
    console.log("[/api/business-owner/businesses] calling backend:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie, // 🔑 forward auth cookies
      },
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[/api/business-owner/businesses] error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}