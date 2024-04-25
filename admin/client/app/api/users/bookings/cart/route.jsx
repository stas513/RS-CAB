import { NextResponse } from "next/server";
import { createAddress, createCart, createStopages } from '../../../helpers/bookings'
import { addressFieldChecker } from "@/app/api/utils/addressFieldChecker";

export async function POST(req) {

    try {
        const data = await req.json()

        const { totalDistance, startAddress, destinationAddress, packageId, userId, stopages,budget } = data || {}

        if (!startAddress || !destinationAddress || !totalDistance || !packageId || !userId || !budget) {
            return NextResponse.json({
                message: "Required Fields Are Missing"
            }, { status: 400 })
        }

        const startAddressFields = addressFieldChecker(data.startAddress)
        const destinationAddressFields = addressFieldChecker(data.destinationAddress)

        // Check for errors in the form fields
        if (!startAddressFields || !destinationAddressFields) {
            return NextResponse.json({
                message: "Start Or Destination Address Fields Are Incomplete"
            }, { status: 400 })
        }

        const startForm = await createAddress({ ...startAddress, userId })
        const destination = await createAddress({ ...destinationAddress, userId })


        const newCart = await createCart(data, startForm.id, destination.id)

        await createStopages(stopages, newCart.id,userId)

        return NextResponse.json(newCart, {
            status: 201,
        });

    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error: error }, {
            status: 400,
        });;
    }
}


