import { NextResponse } from "next/server";
import { findBooking } from "@/app/api/helpers/bookings";

export async function GET(_, { params }) {
    let { id } = params

    try {
        const result = await findBooking(id)
        return NextResponse.json(result, {
            status: 200
        });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Internal Server Error', error: err }, {
            status: 400,
        });;
    }
}

