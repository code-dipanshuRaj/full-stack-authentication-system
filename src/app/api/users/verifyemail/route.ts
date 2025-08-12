import { connectDB } from "@/db/connectDB";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import  User  from "@/models/user.model";

export async function POST(request : NextRequest){
  try {
    const body = await request.json();
    const { token } = body;
    console.log('Received token:', token);
    await connectDB();

    const user = await User.findOne({
      verifyToken : token,
      verifyTokenExpiry : { $gt : Date.now() }
    });
    console.log('User found:', user);
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error : any) {
    console.error('Error in POST /api/users/verifyemail:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }
}