import { NextResponse } from "next/server";
import { deleteDriver, findDriver, updateDriver } from "@/app/api/helpers/driver";
import { findUser, updateUser } from "@/app/api/helpers/appUser";
import { convertFormData } from "@/app/api/utils/convertFormData";
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";

export async function GET(_, { params }) {
    let { id } = params

    try {
        const result = await findDriver(id)
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

export async function PUT(req, { params }) {
    let { id } = params;
    try {
        const body = await req.formData()

        let data = convertFormData(body)


        const driver = await findDriver(id);
        const user = await findUser(driver.userId)

        if (!driver) {
            return NextResponse.json({ error: 'Driver Not Exit' }, { status: 400 });

        }

        const userData = {
            firstName: data.firstName ? data.firstName : user.firstName,
            lastName: data.lastName ? data.lastName : user.lastName,
            phoneNumber: data.phoneNumber ? data.phoneNumber : user.phoneNumber
        }

        const fileName = await ImageUploadHelper(data?.profileImage)
        const updatedDriver = await updateDriver(id, { ...data }, driver, fileName)
        const updatedUser = await updateUser(driver.userId, userData)

        return NextResponse.json({ data: { ...updatedDriver, user_info: updatedUser }, message: "Driver Updated Successfully" }, { status: 200 });


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    const { id } = params


    try {
        const driver = await findDriver(id);
        if (!driver) {
            return NextResponse.json({ error: 'Driver Not Exit' }, { status: 400 });

        }
        await deleteDriver(id)
        return NextResponse.json({ message: 'Driver InActive Successfully' }, { status: 200 });

    }

    catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    }





}