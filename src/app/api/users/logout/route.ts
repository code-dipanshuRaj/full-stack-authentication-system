import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    )
    response.cookies.set("token","",{httpOnly: true, expires: new Date(0)});
    console.log("User logged out");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
