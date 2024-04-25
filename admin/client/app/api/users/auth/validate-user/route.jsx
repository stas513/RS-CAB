import prisma from "@/database/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const generateToken = (obj) => {
  return jwt.sign(obj, "absd", {
    expiresIn: "12h",
  });
};
export async function POST(req) {
  let { email, otp } = await req.json();
  try {
    const user = await prisma.AppUser.findUnique({ where: { email } });

    if (!email || !otp) {
      return NextResponse.json({ message: "Email or Otp is missing." }, { status: 400,statusText:"Email or Otp is missing." });
    }
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 401,statusText:"User not found." });
    }
    if (!otp || user.otp != Number(otp)) {
      return NextResponse.json(
        { message: "Invalid OTP." },
        { status: 401, statusText: "Invalid OTP." }
      );
    }
    await prisma.AppUser.update({ where: { email }, data: { isActive: true } });

    return NextResponse.json({token:generateToken(user)}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error"},
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
