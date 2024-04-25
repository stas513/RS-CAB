import { NextResponse } from "next/server";
import { createBooking, findAllBookings } from '../../helpers/bookings'

export async function GET() {
    try {
        const result = await findAllBookings()
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

export async function POST(req) {
    try {
        const data = await req.json();

        const requiredFields = [
            "paymentType",
            "servicePartnerName",
            "servicePartnerEmail",
            "servicePartnerPhone",
            "commission",
            "clientName",
            "clientNumber",
            "clientEmail",
            "packageName",
            "bookingDate",
            "bookingTime",
            "startAddress",
            "destination",
            "totalDistance",
            "totalDistanceTime",
            "totalWaitingTime",
            "totalBill",
            "vehicleNumberPlate"
        ];

        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            return NextResponse.json({ message: `Required fields are missing: ${missingFields.join(', ')}` }, { status: 400 });
        }
        const newBooking = await createBooking(data)
        return NextResponse.json(newBooking, { status: 201 });


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error: error }, {
            status: 400,
        });;
    }
}
