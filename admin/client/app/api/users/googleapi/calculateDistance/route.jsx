import { NextResponse } from "next/server";
import axios from "axios";


export async function POST(req) {
    try {
        const { startname,destinationname,waypoints } = await req.json();
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startname}&destination=${destinationname}&waypoints=${waypoints}&key=${apiKey}`;
        const response = await axios.get(url);

        return NextResponse.json(response.data, {
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

