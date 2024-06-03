import { findPackage, updatePackage, deletePackage } from "@/app/api/helpers/package";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    let { id } = params

    try {
        const result = await findPackage(id)
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

        let data = convertFormData(body);

        const packageExist = await findPackage(id);

        if (!packageExist) {
            return NextResponse.json({ error: 'Package Not Exit' }, { status: 400 });

        }
        const fileName = await ImageUploadHelper(data?.coverImage)

        const updatedPackage = await updatePackage(id, data, packageExist, fileName)

        return NextResponse.json({ data: updatedPackage, message: "Package Updated Successfully" }, { status: 200 });


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    const { id } = params


    try {
        const packageExist = await findPackage(id);
        if (!packageExist) {
            return NextResponse.json({ error: 'Package Not Exit' }, { status: 400 });

        }
        await deletePackage(id)
        return NextResponse.json({ message: 'Package InActive Successfully' }, { status: 200 });

    }

    catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    }





}