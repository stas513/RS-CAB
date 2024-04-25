

import prisma from '@/database/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {

  const {email, password, newPassword}=await req.json()
  try {
    const user = await prisma.Admin.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: 'Email or Password is Incorrect' },{status:401});
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: 'Email Or Password is Incorrect' },{status:401});
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    // Update the password field with the new password
    await prisma.admin.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json(result,{status:200});
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' },{status:500});
  }

}


