import { NextResponse } from "next/server";
import prisma from '@/database/prisma';
import { findCar, updateCar } from "@/app/api/helpers/driver";
import { convertFormData } from "@/app/api/utils/convertFormData";
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";


export async function GET(_, { params }) {
    const { carId } = params
    try {
        const result = await findCar(carId)
        return NextResponse.json(result, {
            status: 200
        });
    }
    catch (err) {
        return NextResponse.json({
            message: 'Internal Server Error',
            error: err
        }, {
            status: 400,
        });;
    }
}

export async function PUT(req, { params }) {
    const { carId } = params;
    try {
        const body = await req.formData()
        const data = convertFormData(body)


        const car = await findCar(carId)

        if (car == null) {
            return NextResponse.json({ message: 'Car Not Exist' }, {
                status: 400,
            });;
        }

        const fileName = await ImageUploadHelper(data.carImage)
        const updatedCar = await updateCar(carId, data, car, fileName)

        return NextResponse.json({
            data: updatedCar,
            message: "Car Updated Successfully"
        }, { status: 200 });


    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error: error }, {
            status: 400,
        });;
    }
}

export async function DELETE(req, { params }) {
    const { carId } = params;
    try {
        const result = await findCar(carId)
        if (result !== null) {
            await prisma.car.delete({
                where: { id: carId },
            })
            if (result.carDocument) {
                await prisma.carDocument.delete({
                    where: { carId },
                })
            }

            return NextResponse.json({
                message: "Car Deleted Successfully"
            }, { status: 200 });


        }

        return NextResponse.json({
            message: "Car Not Found"
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error: error }, {
            status: 400,
        });;
    }
}
