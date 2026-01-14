import axios from "axios";

export async function GET(req, ctx) {
  console.log("[/api/admin/reports/:id] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    // Next (newer) requires params to be awaited in route handlers
    const { id } = await ctx.params;

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).replace(/\/+$/, "");
    const backendUrl = `${base}/admin/reports/${id}`;

    console.log("[/api/admin/reports/:id] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/reports/:id] error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}