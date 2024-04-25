
import prisma from '@/database/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
    let {email,otp}=await req.json()
    try {
        const user = await prisma.Admin.findUnique({ where: { email } });
    
        if (!user) {
            return NextResponse.json({message:"User not found."}, {status:401});        
        }
        if (!otp || user.otp !== otp) {
            return NextResponse.json({message:"Invalid OTP."}, {status:401});
        }
        return NextResponse.json(user, {status:200});
        } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, {
            status: 500
        });
    }
}

