import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model.js";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { password, token } = await request.json();

  await connectDB();
  console.log(`Received Token ${token} and password ${password}`);
  const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordExpiry: { $gt: Date.now() } });
  if (!user) {
    return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();

  return NextResponse.json({ message: "Password has been reset successfully." }, { status: 200 });
}
  