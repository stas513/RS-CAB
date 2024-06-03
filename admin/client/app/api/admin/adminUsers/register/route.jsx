import { NextResponse } from 'next/server';
import prisma from '@/database/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {

const { firstName, lastName, email, phoneNumber, password, role } = await req.json();

if (!firstName || !lastName || !email || !phoneNumber || !password || !role) {
    return NextResponse.json({ message: 'All feilds are required!'}, {
      status: 400,
    });  }

  const existingUser = await prisma.Admin.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (existingUser) {
        return NextResponse.json({ message: 'User with this email or phone number already exists' }, {
      status: 403,
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.Admin.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
      },
    });

   return NextResponse.json(newUser, {
    status: 201,
  });
} catch (error) {
  return NextResponse.json({ message: 'Internal Server Error', error: error }, {
    status: 400,
  });
}}
