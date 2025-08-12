import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest){
  const path = request.nextUrl.pathname;
  console.log("Request path:", path);
  const isPublicPath = path==="/login" || path==="/signup" || path==="/set-password";
  
  const token = request.cookies.get("token")?.value || "";
  if(isPublicPath && token){
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher : [
    "/login",
    "/signup",
    "/verifyemail",
    "/set-password",
    "/profile",
    "/profile/:path*"
  ]
}
