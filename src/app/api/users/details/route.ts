import {NextResponse, NextRequest} from 'next/server';
import User from '@/models/user.model';
import {connectDB} from '@/db/connectDB';
import {decodeToken} from '@/helpers/decodeToken';  

connectDB();

export async function GET(req : NextRequest){
  try {
    const userId = await decodeToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("User ID from token:", userId);
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User details:", user);
    return NextResponse.json({ message : "User found", user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: "Failed to fetch user details" }, { status: 500 });
  }
}