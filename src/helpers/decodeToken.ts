import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const decodeToken = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value || "";
  try {
    const decoded : any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded token:", decoded);
    return decoded._id;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
}