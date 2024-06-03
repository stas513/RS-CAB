import { NextResponse } from "next/server";
import { checkUser, createUser } from '@/app/api/helpers/appUser'
import { createPassenger, findAllPassengers } from '@/app/api/helpers/passenger'
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";
import { convertFormData } from '@/app/api/utils/convertFormData'

export async function GET() {
  try {
    const result = await findAllPassengers()
    return NextResponse.json(result, {
      status: 200
    });
  }
  catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', error: err }, {
      status: 400,
    });
  }
}

export async function POST(req) {

  try {
    const body = await req.formData()

    let data = convertFormData(body)

    const { firstName, lastName, email, password, phoneNumber
    } = data || {}


    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return NextResponse.json({ message: 'All fields are needed', }, {
        status: 400,
      });;
    }

    const user = await checkUser(email, phoneNumber)

    if (user) {
      return NextResponse.json({ message: 'User Already Exist' }, {
        status: 400,
      });;
    }

    const newUser = await createUser(firstName, lastName, email, password, phoneNumber);

    const fileName = await ImageUploadHelper(data?.profileImage)

    const passenger = await createPassenger(data, fileName, newUser.id)

    return NextResponse.json({ ...passenger, userInfo: newUser }, {
      status: 201,
    });

  }
  catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error }, {
      status: 400,
    });;
  }
}
