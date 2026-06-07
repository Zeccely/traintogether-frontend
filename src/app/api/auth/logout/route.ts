import { NextResponse } from "next/server";

export async function POST() {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json({ error: "BACKEND_URL is not configured" }, { status: 500 });
  }

  const backendResponse = await fetch(`${backendUrl.replace(/\/$/, "")}/api/auth/logout`, {
    method: "POST",
  });

  const response = new NextResponse(null, { status: backendResponse.status });
  const setCookie = backendResponse.headers.get("set-cookie");

  if (setCookie) {
    response.headers.set("Set-Cookie", setCookie);
  }

  return response;
}
