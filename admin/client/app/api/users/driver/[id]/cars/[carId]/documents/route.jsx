import { NextResponse } from "next/server";
import prisma from '@/database/prisma';
import { deleteImageToS3 } from "@/app/(RSAdmin)/admin/utils/s3bucket";
import { createCarDocument, findCarDocument, updateCarDocument } from "@/app/api/helpers/driver";
import { convertFormData } from "@/app/api/utils/convertFormData";

export async function POST(req, { params }) {
    const { carId } = params

    try {
        const body = await req.formData()

        let data = convertFormData(body)

        const CarDocument = await findCarDocument(carId)

        if (CarDocument) {
            return NextResponse.json({ message: 'Car Document Already Exist' }, {
                status: 400,
            });;
        }

        const fieldsToExtract = [
            "motDoc",
            "insurenceDoc",
            "pcoVehicleLicenceDoc",
            "vehicleLogBookDoc",
            "otherDoc",
        ];

        const result = await createCarDocument(data, fieldsToExtract, carId)

        return NextResponse.json(result, {
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

export async function PUT(req, { params }) {
    const { carId } = params;
    try {

        const result = await prisma.CarDocument.findMany({
            where: { carId },
        });
        if (!result) {
            return NextResponse.json({ message: 'Document Not Found' }, {
                status: 400,
            });;
        }
        const body = await req.formData()

        let data = convertFormData(body)

        const updatedDocument = await updateCarDocument(data, carId)
        return NextResponse.json({ message: 'Document Updated',data:updatedDocument }, {
            status: 200,
        });;
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Internal Server Error', error: err }, {
            status: 400,
        });;
    }
}

export async function DELETE(req, { params }) {
    const { carId } = params

    const data = req.json()
    try {

        const result = await findCarDocument(carId)

        if (result !== null) {
            for (const field in data) {
                await deleteImageToS3(result[field])
                await prisma.CarDocument.update({ where: { carId }, data: { [field]: null } })

            }


            return NextResponse.json({ message: 'Document Delete Successfully' }, {
                status: 200,
            });;

        }

        return NextResponse.json({ message: 'Document Not Found', error: error }, {
            status: 404,
        });;
    }

    catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error: error }, {
            status: 400,
        });;
    }

}