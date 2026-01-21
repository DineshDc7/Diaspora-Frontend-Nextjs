import axios from "axios";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
  const params = await context.params; // ✅ Next 15 dynamic params are async
  const id = params?.id;

  console.log("[/api/admin/users/:id/status] PATCH HIT ✅", id);

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return NextResponse.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();

    const base = String(BACKEND_URL).trim().replace(/\/+$/, "");
    const backendUrl = `${base}/admin/users/${id}/status`;

    console.log("[/api/admin/users/:id/status] calling backend:", backendUrl);
    console.log("[/api/admin/users/:id/status] body:", body);

    const backendRes = await axios.patch(backendUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/admin/users/:id/status] backend status:", backendRes.status);

    return NextResponse.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/users/:id/status] error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
