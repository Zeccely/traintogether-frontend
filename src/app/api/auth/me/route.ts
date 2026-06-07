import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json({ error: "BACKEND_URL is not configured" }, { status: 500 });
  }

  const backendResponse = await fetch(`${backendUrl.replace(/\/$/, "")}/api/auth/me`, {
    method: "GET",
    headers: {
      Cookie: request.headers.get("cookie") ?? "",
    },
    cache: "no-store",
  });

  return new NextResponse(await backendResponse.text(), { status: backendResponse.status });
}
