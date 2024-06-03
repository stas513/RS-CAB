import prisma from '@/database/prisma';
import { NextResponse } from 'next/server';

export async function GET() {

    try {
        const admins = await prisma.Admin.findMany({
          select: {
            id: true,
            role: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        return NextResponse.json(admins, {
            status: 200
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, {
            status: 500
        });
    }
    };
  

