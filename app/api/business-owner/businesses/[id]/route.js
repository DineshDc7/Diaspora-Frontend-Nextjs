import { NextResponse } from "next/server";
import apiClient from "@/lib/apiClient";

// GET /api/business-owner/businesses/:id
export async function GET(req, { params }) {
  const { id } = params;

  console.log("[/api/business-owner/businesses/:id] GET HIT ✅", id);

  try {
    const res = await apiClient.get(`/business-owner/businesses/${id}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    console.error("[/api/business-owner/businesses/:id] GET error:", err?.response?.data || err);
    return NextResponse.json(
      err?.response?.data || { message: "Failed to fetch business" },
      { status: err?.response?.status || 500 }
    );
  }
}

// PUT /api/business-owner/businesses/:id
export async function PUT(req, { params }) {
  const { id } = params;

  console.log("[/api/business-owner/businesses/:id] PUT HIT ✅", id);

  try {
    const body = await req.json();
    console.log("[/api/business-owner/businesses/:id] body:", body);

    const res = await apiClient.put(`/business-owner/businesses/${id}`, body);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    console.error("[/api/business-owner/businesses/:id] PUT error:", err?.response?.data || err);
    return NextResponse.json(
      err?.response?.data || { message: "Failed to update business" },
      { status: err?.response?.status || 500 }
    );
  }
}
