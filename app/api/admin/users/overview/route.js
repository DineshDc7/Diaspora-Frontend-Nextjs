import axios from "axios";

export async function GET(req) {
  console.log("[/api/admin/users/overview] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;

    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    // Forward cookies (accessToken/refreshToken) to backend
    const cookie = req.headers.get("cookie") || "";

    // Forward query params exactly as sent by UI
    const { searchParams } = new URL(req.url);
    const qs = searchParams.toString();

    const backendUrl =
      `${String(BACKEND_URL).replace(/\/+$/, "")}` +
      `/admin/users/overview` +
      (qs ? `?${qs}` : "");

    console.log("[/api/admin/users/overview] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/admin/users/overview] backend status:", backendRes.status);

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/users/overview] error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}