import axios from "axios";

export async function POST(req) {
  console.log("[/api/auth/register] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    console.log("[/api/auth/register] BACKEND_API_BASE_URL:", BACKEND_URL);

    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("[/api/auth/register] body:", body);

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).replace(/\/+$/, "");
    const backendUrl = `${base}/auth/register`;
    console.log("[/api/auth/register] calling backend:", backendUrl);

    const backendRes = await axios.post(backendUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/auth/register] backend status:", backendRes.status);
    console.log("[/api/auth/register] backend data:", backendRes.data);
    console.log(
      "[/api/auth/register] backend set-cookie:",
      backendRes.headers?.["set-cookie"]
    );

    // Return backend body + status
    const res = Response.json(backendRes.data, { status: backendRes.status });

    // ✅ Forward backend Set-Cookie headers (accessToken, refreshToken)
    const setCookie = backendRes.headers?.["set-cookie"];
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((c) => res.headers.append("Set-Cookie", c));
    }

    // ✅ Set role cookie for proxy routing (non-httpOnly)
    const user = backendRes.data?.data?.user || backendRes.data?.user || null;
    const role = user?.role || body?.role;

    if (role) {
      const maxAge = 60 * 60 * 24 * 7; // 7 days
      res.headers.append(
        "Set-Cookie",
        `user_role=${role}; Path=/; Max-Age=${maxAge}; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`
      );
    }

    return res;
  } catch (err) {
    console.error("[/api/auth/register] error:", err);

    return Response.json(
      {
        success: false,
        message: "Server error",
        error: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}