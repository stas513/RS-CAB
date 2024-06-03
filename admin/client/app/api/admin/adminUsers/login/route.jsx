import prisma from '@/database/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (obj) => {
  return jwt.sign(obj, 'absd', {
    expiresIn: '12h',
  });
};

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Invalid request body.' }, {
      status: 400
    });
  }

  const user = await prisma.Admin.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Incrorrect username or password.' }, {
      status: 401
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: 'Incrorrect username or password.' }, {
      status: 401
    });
  }
  await prisma.Admin.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });
  return NextResponse.json({ token: generateToken(user) }, {
    status: 200
  });

}