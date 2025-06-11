// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;

    const protectedRoutes = ["/dashboard", "/create-profile" , "/profile"];

    console.log("request.nextUrl.pathname",request.nextUrl.pathname);

    if (protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

// Enable middleware for specific paths
export const config = {
    matcher: ["/dashboard", "/create-profile", "/profile"],
};
