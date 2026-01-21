import axios from "axios";

export async function POST(req) {
  console.log("[/api/auth/logout] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    console.log("[/api/auth/logout] BACKEND_API_BASE_URL:", BACKEND_URL);

    if (!BACKEND_URL) {
      const res = Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );

      // Best-effort clear role cookie
      res.headers.append(
        "Set-Cookie",
        `user_role=; Path=/; Max-Age=0; SameSite=Lax${
          process.env.NODE_ENV === "production" ? "; Secure" : ""
        }`
      );

      return res;
    }

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).replace(/\/+$/, "");
    const backendUrl = `${base}/auth/logout`;

    console.log("[/api/auth/logout] calling backend:", backendUrl);

    const backendRes = await axios.post(
      backendUrl,
      {},
      {
        headers: { Cookie: cookie },
        withCredentials: true,
        validateStatus: () => true,
      }
    );

    console.log("[/api/auth/logout] backend status:", backendRes.status);
    console.log("[/api/auth/logout] backend data:", backendRes.data);
    console.log("[/api/auth/logout] backend set-cookie:", backendRes.headers?.["set-cookie"]);

    const res = Response.json(backendRes.data, { status: backendRes.status });

    // ✅ Forward backend Set-Cookie headers (this clears httpOnly access/refresh tokens)
    const setCookie = backendRes.headers?.["set-cookie"];
    if (setCookie) {
      const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];
      cookies.forEach((c) => res.headers.append("Set-Cookie", c));
    }

    // ✅ Also clear the non-httpOnly role cookie
    res.headers.append(
      "Set-Cookie",
      `user_role=; Path=/; Max-Age=0; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return res;
  } catch (err) {
    console.error("[/api/auth/logout] error:", err);

    const res = Response.json(
      { success: false, message: "server error" },
      { status: 500 }
    );

    // Best-effort clear role cookie even on error
    res.headers.append(
      "Set-Cookie",
      `user_role=; Path=/; Max-Age=0; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return res;
  }
}