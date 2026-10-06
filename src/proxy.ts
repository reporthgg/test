import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // защита админки
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const ok = await verifySessionToken(token);
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // локаль по префиксу URL: /kz/... и /en/... → внутренняя переадресация + заголовок x-locale
  const seg = pathname.split("/")[1];
  if (seg === "kz" || seg === "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(seg.length + 1) || "/";
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", seg);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)).*)"],
};
