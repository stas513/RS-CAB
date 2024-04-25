

import prisma from '@/database/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const admin = await prisma.Admin.findUnique({
            where: { id }, select: {
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
        if (!admin) {
            return NextResponse.json({ message: 'Admin not found.' }, { status: 404 });
        }
        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {

    try {
        const body = await req.json();
        let { id } = params
        const admin = await prisma.Admin.update({
            where: { id },
            data: body,
        });
        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    let { id } = params
    try {
        const admin = await prisma.Admin.delete({ where: { id } });
        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}