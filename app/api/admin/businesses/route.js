import axios from "axios";

export async function GET(req) {
  console.log("[/api/admin/businesses] GET HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";

    const { searchParams } = new URL(req.url);
    const qs = searchParams.toString();

    const backendUrl =
      `${String(BACKEND_URL).replace(/\/+$/, "")}` +
      `/admin/businesses` +
      (qs ? `?${qs}` : "");

    console.log("[/api/admin/businesses] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/businesses] GET error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  console.log("[/api/admin/businesses] POST HIT ✅");

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";
    const body = await req.json();

    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/admin/businesses`;
    console.log("[/api/admin/businesses] calling backend:", backendUrl);
    console.log("[/api/admin/businesses] body:", body);

    const backendRes = await axios.post(backendUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/businesses] POST error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}