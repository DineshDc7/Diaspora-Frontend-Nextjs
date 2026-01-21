import axios from "axios";

export async function POST(req) {
  console.log("[/api/auth/refresh] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).replace(/\/+$/, "");
    const backendUrl = `${base}/auth/refresh`;

    console.log("[/api/auth/refresh] calling backend:", backendUrl);

    const backendRes = await axios.post(
      backendUrl,
      {},
      {
        headers: { Cookie: cookie },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    // ✅ IMPORTANT: forward Set-Cookie from backend to browser
    const res = Response.json(backendRes.data, { status: backendRes.status });

    const setCookie = backendRes.headers?.["set-cookie"];
    if (setCookie) {
      // axios can return string or array
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((c) => res.headers.append("Set-Cookie", c));
    }

    return res;
  } catch (err) {
    console.error("[/api/auth/refresh] error:", err);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}