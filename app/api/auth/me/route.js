import axios from "axios";

export async function GET(req) {
  console.log("[/api/auth/me] HIT ✅");
  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).replace(/\/+$/, "");
    const backendUrl = `${base}/auth/me`;

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (e) {
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}