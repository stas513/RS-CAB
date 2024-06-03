import { NextResponse } from "next/server";
import { deletePassenger, findPassenger, updatePassenger } from "@/app/api/helpers/passenger";
import { findUser, updateUser } from "@/app/api/helpers/appUser";
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";
import { convertFormData } from '@/app/api/utils/convertFormData'



export async function GET(_, { params }) {
    let { id } = params

    try {
        const result = await findPassenger(id)
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

export async function PUT(req, { params }) {
    let { id } = params;
    const body = await req.formData()

    let data = convertFormData(body)
    const result = await findPassenger(id)

    if (!result) {
        return NextResponse.json({ message: "Passenger Not Found" }, { status: 404 });

    }

    const appUser = await findUser(result.userId)


    const userData = {
        firstName: data.firstName ? data.firstName : appUser.firstName,
        lastName: data.lastName ? data.lastName : appUser.lastName,
        phoneNumber: data.phoneNumber ? data.phoneNumber : appUser.phoneNumber
    }

    const fileName = await ImageUploadHelper(data.profileImage)

    try {
        const passenger = await updatePassenger(id, { ...data }, fileName, result)

        const user = await updateUser(result.userId, userData)

        return NextResponse.json({ data: { ...passenger, user_info: user }, message: "Passenger Updated Successfully" }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    const { id } = params
    try {
        const result = await findPassenger(id)
        if (!result) {
            return NextResponse.json({ message: "Passenger Not Exits" }, { status: 404 });

        }
        await deletePassenger(id)
        return NextResponse.json({ message: "Passenger Delete Successfully" }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}