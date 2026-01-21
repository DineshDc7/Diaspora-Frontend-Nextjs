import axios from "axios";

export async function GET(req) {
  console.log("[/api/admin/businesses/options] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).trim().replace(/\/+$/, "");
    const backendUrl = `${base}/admin/businesses/options`;

    console.log("[/api/admin/businesses/options] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/businesses/options] error:", err);
    return Response.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}