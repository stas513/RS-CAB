import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  let { email } = await req.json();
  try {
    const user = await prisma.AppUser.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found.",isExits:false }, { status: 200 });
    }

    return NextResponse.json({message:"User Exits",user,isExits:true}, { status: 200 });
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
