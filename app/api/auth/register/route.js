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

    
    // Call Node backend
    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/auth/register`;
    console.log("[/api/auth/register] calling backend:", backendUrl);
    const backendRes = await axios.post(
      backendUrl,
      body,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        validateStatus: () => true,
      }
    );
    console.log("[/api/auth/register] backend status:", backendRes.status);
    console.log("[/api/auth/register] backend data:", backendRes.data);
    console.log("[/api/auth/register] backend set-cookie:", backendRes.headers?.["set-cookie"]);

    // Pass backend error directly
    if (backendRes.status >= 400) {
      return Response.json(
        {
          success: false,
          message: backendRes.data?.message || "Register failed",
          error: backendRes.data,
        },
        { status: backendRes.status }
      );
    }

    /**
     * Forward Set-Cookie headers from backend
     * Backend sets:
     *  - accessToken
     *  - refreshToken
     */
    const headers = new Headers();
    const setCookie = backendRes.headers["set-cookie"];

    if (Array.isArray(setCookie)) {
      setCookie.forEach((cookie) =>
        headers.append("set-cookie", cookie)
      );
    } else if (typeof setCookie === "string") {
      headers.append("set-cookie", setCookie);
    }

    /**
     * Add role cookie for proxy routing
     */
    const user =
      backendRes.data?.data?.user ||
      backendRes.data?.user ||
      null;

    const role = user?.role || body?.role;

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
        message: "registered",
        user,
      }),
      { status: 201, headers }
    );
  } catch (err) {
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