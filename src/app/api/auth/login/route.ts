import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json({ error: "BACKEND_URL is not configured" }, { status: 500 });
  }

  const backendResponse = await fetch(`${backendUrl.replace(/\/$/, "")}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: await request.text(),
  });

  const response = new NextResponse(null, { status: backendResponse.status });
  const setCookie = backendResponse.headers.get("set-cookie");

  if (setCookie) {
    response.headers.set("Set-Cookie", setCookie);
  }

  return response;
}
