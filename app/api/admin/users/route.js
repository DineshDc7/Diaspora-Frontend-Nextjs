import axios from "axios";

export async function POST(req) {
  console.log("[/api/admin/users] POST HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();

    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/admin/users`;
    console.log("[/api/admin/users] calling backend:", backendUrl);
    console.log("[/api/admin/users] body:", body);

    const backendRes = await axios.post(backendUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/admin/users] backend status:", backendRes.status);

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/users] error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}