import { NextResponse } from "next/server";
import { createDriver, findAllDrivers } from '../../helpers/driver'
import { checkUser, createUser } from '../../helpers/appUser'
import { convertFormData } from '@/app/api/utils/convertFormData'
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";

export async function GET() {
  try {
    const result = await findAllDrivers()
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
    const body = await req.formData()

    let data = convertFormData(body);


    const { firstName, lastName, email, password, phoneNumber
    } = data || {}

    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      return NextResponse.json({ message: "Missing Required Fields" }, { status: 400 })
    }


    const user = await checkUser(email, phoneNumber)

    if (user) {
      return NextResponse.json({ message: 'User Already Exist' }, {
        status: 400,
      });;
    }

    const newUser = await createUser(firstName, lastName, email, password, phoneNumber);

    const fileName = await ImageUploadHelper(data?.profileImage)

    const driver = await createDriver(data, newUser.id, fileName)

    return NextResponse.json({ ...driver, userInfo: newUser }, {
      status: 201,
    });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error', error: error }, {
      status: 400,
    });;
  }
}
