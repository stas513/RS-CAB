import prisma from "@/database/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (obj) => {
  return jwt.sign(obj, "absd", {
    expiresIn: "12h",
  });
};

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      {
        message:"Invalid request body."
      },
      {
        status: 400,
        statusText:"Invalid request body."
      }
    );
  }

  const user = await prisma.AppUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      {
        message:"Incrorrect username or password."
      },
      {
        status: 401,
        statusText:"Incrorrect username or password."
      }
    );
  }
  if (!user.isActive) {
    return NextResponse.json(
      { 
        message:"User was in active"
      },
      {
        status: 401,
        statusText:"User was in active"
      }
    );
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json(
      {
        message:"Incrorrect username or password."

      },
      {
        status: 401,
        statusText:"Incrorrect username or password."
      }
    );
  }
  await prisma.AppUser.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });
  return NextResponse.json(
    { token: generateToken(user) },
    {
      status: 200,
    }
  );
}
