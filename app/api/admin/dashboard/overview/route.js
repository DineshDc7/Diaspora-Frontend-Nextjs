import axios from "axios";

export async function GET(req) {
  console.log("[/api/admin/dashboard/overview] HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";
    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/admin/dashboard/overview`;

    console.log("[/api/admin/dashboard/overview] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    console.log("[/api/admin/dashboard/overview] backend status:", backendRes.status);

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/dashboard/overview] error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}