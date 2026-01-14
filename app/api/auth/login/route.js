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

    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/auth/login`;
    console.log("[/api/auth/login] calling backend:", backendUrl);

    const backendRes = await axios.post(backendUrl, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/auth/login] backend status:", backendRes.status);
    console.log("[/api/auth/login] backend data:", backendRes.data);
    console.log("[/api/auth/login] backend set-cookie:", backendRes.headers?.["set-cookie"]);

    if (backendRes.status >= 400) {
      return Response.json(
        {
          success: false,
          message: backendRes.data?.message || "Login failed",
          error: backendRes.data,
        },
        { status: backendRes.status }
      );
    }

    // Forward backend cookies (accessToken, refreshToken)
    const headers = new Headers();
    const setCookie = backendRes.headers?.["set-cookie"];

    if (Array.isArray(setCookie)) {
      setCookie.forEach((c) => headers.append("set-cookie", c));
    } else if (typeof setCookie === "string") {
      headers.append("set-cookie", setCookie);
    }

    // Set role cookie for proxy routing
    const user = backendRes.data?.data?.user || backendRes.data?.user || null;
    const role = user?.role;

    if (role) {
      headers.append(
        "set-cookie",
        `user_role=${role}; Path=/; SameSite=Lax;${
          process.env.NODE_ENV === "production" ? " Secure;" : ""
        }`
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "logged_in",
        user,
      }),
      { status: 200, headers }
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "Server error", error: err?.message || String(err) },
      { status: 500 }
    );
  }
}