import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    await connectDB();
    
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }
    
    const user = await User.findOne({ email });
  
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  
    const token = jwt.sign(
      {_id : user._id},
      process.env.JWT_SECRET!,  
      { expiresIn: "1d" }
    )
    
    if (!token) {
      return NextResponse.json({ message: "Failed to generate token" }, { status: 500 });
    }
    
    const responses = NextResponse.json(
      {message : "Login successful", email: user.email, username: user.username},
      { status: 200}
    );
    responses.cookies.set("token", token, { httpOnly: true });
    return responses;
  } catch (error: any) {
    console.error("Error in POST /api/users/login:", error);
    return NextResponse.json(
      { message: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}