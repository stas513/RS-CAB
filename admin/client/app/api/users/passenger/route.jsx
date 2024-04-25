import { NextResponse } from "next/server";
import { createPassenger, findPassenger, findPassengerByUserId } from '@/app/api/helpers/passenger'
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";
import { convertFormData } from '@/app/api/utils/convertFormData'


export async function POST(req) {

  try {
    const body = await req.formData()

    let data = convertFormData(body)

    const { userId
    } = data || {}


    if (!userId) {
      return NextResponse.json({ message: 'All fields are needed', }, {
        status: 400,
        statusText:'All fields are needed.'
      });;
    }
   
    const passengerExit = await findPassengerByUserId(userId)
    if (passengerExit) {
      return NextResponse.json(
        { message: "Passenger Already Exits" },
        {
          status: 400,
          statusText: "Passenger Already Exits",
        }
      );
    }
    const fileName = await ImageUploadHelper(data?.profileImage)

    const passenger = await createPassenger(data, fileName, userId)

    return NextResponse.json({ ...passenger }, {
      status: 201,
    });

  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error', error: error }, {
      status: 400,
     statusText: 'Internal Server Error'
    });;
  }
}
