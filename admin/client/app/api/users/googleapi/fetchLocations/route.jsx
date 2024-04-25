import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(req) {
    try {
        const { inputValue } = await req.json();
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&key=${apiKey}`
        );

        return NextResponse.json(response.data.predictions, {
            status: 200
        });;
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Internal Server Error', error: err }, {
            status: 400,
        });;
    }
}

