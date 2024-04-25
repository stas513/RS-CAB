import { NextResponse } from "next/server";
import { getImageToS3 } from "@/app/(RSAdmin)/admin/utils/s3bucket";


export async function GET(_, { params }) {
    const { id } = params;
    try {
        const result = await getImageToS3(id)
        return NextResponse.json(result, {
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

