import { NextResponse } from "next/server";
import prisma from "@/database/prisma";
import jwt from "jsonwebtoken";
import { checkUser, checkUserByCognito, checkUserByEmail, checkUserByPhone } from "@/app/api/helpers/appUser";
import uuidv4 from "@/app/(RSAdmin)/admin/utils/uuidv4";

const generateToken = (obj) => {
  return jwt.sign(obj, "absd", {
    expiresIn: "12h",
  });
};
export async function POST(req) {
  const data = await req.json()
  const { email, phoneNumber, cognitoUserName } = data || {};

  if (!email || !cognitoUserName) {
    console.log('trigred 1')
    return NextResponse.json(
      { message: "Username or email is required." },
      {
        status: 400,
        statusText: "error",
      }
    );

  }
  const userEmailExists = await checkUserByEmail(email)
  const userPhoneExists = phoneNumber?await checkUserByPhone(phoneNumber):null
  const userCognitoExists = await checkUserByCognito(cognitoUserName)
  if (userEmailExists) {
    console.log('trigred 2')

    return NextResponse.json(
      { message: "Email already exists!" },
      {
        status: 400,
        statusText: "error",
      }
    );
  } else if (userPhoneExists) {
    console.log('trigred 3')

    return NextResponse.json(
      { message: "Phone number already exists!" },
      {
        status: 400,
        statusText: "error",
      }
    );
  } else if (userCognitoExists) {
    console.log('trigred 4')

    return NextResponse.json(
      { message: "This user already exists!" },
      {
        status: 400,
        statusText: "error",
      }
    );
  }

  try {
    const newUser = await prisma.AppUser.create({
      data: { ...data, phoneNumber: phoneNumber ? phoneNumber : `${uuidv4()}` }
    });

    return NextResponse.json(
      { token: generateToken(newUser) },
      {
        status: 201,
      }
    );
  }
  catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      {
        status: 400,
        statusText: error.message,
      }
    );
  }
}
