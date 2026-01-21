import { NextResponse } from "next/server";

function getBackendBase() {
  const base = process.env.BACKEND_API_BASE_URL;
  if (!base) return null;
  return String(base).replace(/\/+$/, "");
}

function jsonError(message, status = 500, extra = {}) {
  return NextResponse.json(
    { success: false, message, ...extra },
    { status }
  );
}

// GET /api/business-owner/reports?businessId=&reportType=&page=&limit=
export async function GET(req) {
  console.log("[/api/business-owner/reports] GET HIT ✅");

  try {
    const BACKEND = getBackendBase();
    if (!BACKEND) return jsonError("BACKEND_API_BASE_URL is not set", 500);

    const url = new URL(req.url);
    const qs = url.searchParams.toString();

    const backendUrl = `${BACKEND}/business-owner/reports${qs ? `?${qs}` : ""}`;
    console.log("[/api/business-owner/reports] calling backend:", backendUrl);

    const cookie = req.headers.get("cookie") || "";

    const resp = await fetch(backendUrl, {
      method: "GET",
      headers: {
        cookie,
        accept: "application/json",
      },
      cache: "no-store",
    });

    const text = await resp.text();

    try {
      const data = text ? JSON.parse(text) : null;
      return NextResponse.json(data, { status: resp.status });
    } catch {
      return new NextResponse(text || "", {
        status: resp.status,
        headers: { "content-type": resp.headers.get("content-type") || "text/plain" },
      });
    }
  } catch (err) {
    console.error("[/api/business-owner/reports] GET error:", err);
    return jsonError("server error", 500);
  }
}

// POST /api/business-owner/reports (multipart/form-data)
export async function POST(req) {
  console.log("[/api/business-owner/reports] POST HIT ✅");

  try {
    const BACKEND = getBackendBase();
    if (!BACKEND) return jsonError("BACKEND_API_BASE_URL is not set", 500);

    const cookie = req.headers.get("cookie") || "";

    // IMPORTANT: do NOT set Content-Type manually when sending FormData
    const form = await req.formData();

    // Debug: log keys only (avoid dumping binary)
    const keys = [];
    for (const [k, v] of form.entries()) {
      keys.push(k);
      if (v instanceof File) {
        console.log(
          `[/api/business-owner/reports] form file: ${k} -> ${v.name} (${v.type}) ${v.size} bytes`
        );
      }
    }
    console.log("[/api/business-owner/reports] form keys:", Array.from(new Set(keys)));

    const backendUrl = `${BACKEND}/business-owner/reports`;
    console.log("[/api/business-owner/reports] calling backend:", backendUrl);

    const resp = await fetch(backendUrl, {
      method: "POST",
      headers: {
        cookie,
        accept: "application/json",
        // DO NOT set content-type here
      },
      body: form,
    });

    const text = await resp.text();

    // Pass through set-cookie if backend ever sends it
    const outHeaders = new Headers();
    const setCookie = resp.headers.get("set-cookie");
    if (setCookie) outHeaders.set("set-cookie", setCookie);

    try {
      const data = text ? JSON.parse(text) : null;
      return NextResponse.json(data, { status: resp.status, headers: outHeaders });
    } catch {
      return new NextResponse(text || "", {
        status: resp.status,
        headers: {
          ...Object.fromEntries(outHeaders.entries()),
          "content-type": resp.headers.get("content-type") || "text/plain",
        },
      });
    }
  } catch (err) {
    console.error("[/api/business-owner/reports] POST error:", err);
    return jsonError("server error", 500);
  }
}