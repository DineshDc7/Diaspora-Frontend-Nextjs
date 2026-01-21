import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("[/api/admin/users/options] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return NextResponse.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role"); // optional

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).trim().replace(/\/+$/, "");

    const finalUrl = `${base}/admin/users/options${role ? `?role=${encodeURIComponent(role)}` : ""}`;

    console.log("[/api/admin/users/options] calling backend:", finalUrl);

    const backendRes = await axios.get(finalUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return NextResponse.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/users/options] error:", err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}