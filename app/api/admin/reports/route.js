import axios from "axios";

export async function GET(req) {
  console.log("[/api/admin/reports] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    // Forward query params exactly (businessId, reportType, page, limit, search, fromDate, toDate)
    const { searchParams } = new URL(req.url);
    const qs = searchParams.toString();

    const cookie = req.headers.get("cookie") || "";
    const base = String(BACKEND_URL).replace(/\/+$/, "");
    const backendUrl = `${base}/admin/reports${qs ? `?${qs}` : ""}`;

    console.log("[/api/admin/reports] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/reports] error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}