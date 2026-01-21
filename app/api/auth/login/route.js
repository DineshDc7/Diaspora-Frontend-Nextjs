import axios from "axios";

export async function POST(req) {
  console.log("[/api/auth/login] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    console.log("[/api/auth/login] BACKEND_API_BASE_URL:", BACKEND_URL);

    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("[/api/auth/login] body:", body);

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).trim().replace(/\/+$/, "");
    const backendUrl = `${base}/auth/login`;
    console.log("[/api/auth/login] calling backend:", backendUrl);

    const backendRes = await axios.post(backendUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/auth/login] backend status:", backendRes.status);
    console.log("[/api/auth/login] backend data:", backendRes.data);
    console.log("[/api/auth/login] backend set-cookie:", backendRes.headers?.["set-cookie"]);

    // Build response body
    const user = backendRes.data?.data?.user || backendRes.data?.user || null;

    // Return JSON with backend status
    const res = Response.json(backendRes.data, { status: backendRes.status });

    // ✅ Forward backend cookies (accessToken, refreshToken)
    const setCookie = backendRes.headers?.["set-cookie"];
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((c) => res.headers.append("Set-Cookie", c));
    }

    // ✅ Set role cookie for proxy routing (non-httpOnly)
    const role = user?.role;
    if (role) {
      // 7 days
      const maxAge = 60 * 60 * 24 * 7;
      res.headers.append(
        "Set-Cookie",
        `user_role=${role}; Path=/; Max-Age=${maxAge}; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`
      );
    }

    return res;
  } catch (err) {
    console.error("[/api/auth/login] error:", err);
    return Response.json(
      { success: false, message: "Server error", error: err?.message || String(err) },
      { status: 500 }
    );
  }
}