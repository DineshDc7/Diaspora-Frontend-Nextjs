import axios from "axios";

export async function GET(req, context) {
  const params = await context.params; // ✅ important (Next dynamic params)
  const id = params?.id;

  console.log("[/api/admin/businesses/:id] GET HIT ✅", id);

  try {
    const BACKEND_URL = process.env.BACKEND_API_BASE_URL;
    if (!BACKEND_URL) {
      return Response.json(
        { success: false, message: "BACKEND_API_BASE_URL not set" },
        { status: 500 }
      );
    }

    const cookie = req.headers.get("cookie") || "";

    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/admin/businesses/${id}`;
    console.log("[/api/admin/businesses/:id] calling backend:", backendUrl);

    const backendRes = await axios.get(backendUrl, {
      headers: { Cookie: cookie },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/businesses/:id] GET error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  const params = await context.params; // ✅ important
  const id = params?.id;

  console.log("[/api/admin/businesses/:id] PUT HIT ✅", id);

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

    const backendUrl = `${String(BACKEND_URL).replace(/\/+$/, "")}/admin/businesses/${id}`;
    console.log("[/api/admin/businesses/:id] calling backend:", backendUrl);
    console.log("[/api/admin/businesses/:id] body:", body);

    const backendRes = await axios.put(backendUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      withCredentials: true,
      validateStatus: () => true,
    });

    return Response.json(backendRes.data, { status: backendRes.status });
  } catch (err) {
    console.error("[/api/admin/businesses/:id] PUT error:", err);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}