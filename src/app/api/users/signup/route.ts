import {connectDB} from "@/db/connectDB";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {username, email, password} = body;
    await connectDB();
    
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    console.log("Received data:", {username, email, password});
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    if (!user) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
    console.log("User created:", user);
    
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Send verification email
    await sendEmail({
      email: user.email,
      emailType: 'VERIFY',
      userId: user._id,
    });
    
    const response = NextResponse.json(
      { message: "User created successfully", user: { _id: user._id, email: user.email, username: user.username } },
      { status: 201 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error : any) {
    console.log("Error in POST /api/users/signup:", error);
    return NextResponse.json(
      { error: "Internal Server Error" + error.message },
      { status: 500 }
    );
  }
}