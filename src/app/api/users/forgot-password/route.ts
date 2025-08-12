import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/db/connectDB";
import User from "@/models/user.model";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    await connectDB();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log('forgot password token email sent to:', user.email);

    await sendEmail({
      email: user.email,
      emailType: 'RESET',
      userId: user._id,
    });

    return NextResponse.json({ message: "Reset password email sent" }, { status: 200 });
  } catch (error: any) {
    console.error('Error in POST /api/users/forgot-password:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}