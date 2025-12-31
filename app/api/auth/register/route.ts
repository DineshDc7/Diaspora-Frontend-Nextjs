import axios from "axios";

export async function POST(req: Request) {
  try {
    const BACKEND = process.env.BACKEND_API_BASE_URL;

    if (!BACKEND) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();

    /**
     * Call Node backend auth/register
     */
    const backendRes = await axios.post(
      `${BACKEND}/auth/register`,
      body,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        validateStatus: () => true, // handle errors manually
      }
    );

    // If backend returned error
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
     * Forward cookies from backend → browser
     * Backend sets: accessToken, refreshToken
     */
    const headers = new Headers();
    const setCookie = backendRes.headers["set-cookie"];

    if (Array.isArray(setCookie)) {
      setCookie.forEach((c) => headers.append("set-cookie", c));
    } else if (typeof setCookie === "string") {
      headers.append("set-cookie", setCookie);
    }

    /**
     * Set user_role cookie for routing/proxy checks
     */
    const user =
      backendRes.data?.data?.user ||
      backendRes.data?.user ||
      null;

    const role = user?.role || body?.role;

    if (role) {
      headers.append(
        "set-cookie",
        `user_role=${encodeURIComponent(
          role
        )}; Path=/; SameSite=Lax;${
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
      {
        status: 201,
        headers,
      }
    );
  } catch (err: any) {
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