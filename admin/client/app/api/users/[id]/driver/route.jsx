import { findDriverByUserId } from "@/app/api/helpers/driver";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    const { id } = params;
    try {
        const result = await findDriverByUserId(id)
        return NextResponse.json(result, {
            status: 200
        });
    }
    catch (err) {
        return NextResponse.json({ message: 'Internal Server Error', error: err }, {
            status: 400,
        });;
    }
}