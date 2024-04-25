import { NextResponse } from "next/server";
import { createCar, findDriverCar } from "@/app/api/helpers/driver";
import { convertFormData } from "@/app/api/utils/convertFormData";
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";



export async function GET(_, { params }) {
    const { id } = params;
    try {
        const result = await findDriverCar(id)
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


export async function POST(req, { params }) {
    const { id } = params;

    try {
        const body = await req.formData()

        let data = convertFormData(body)

        const { color, engine, make, model, year,
            numberPlate
        } = data || {}


        if (!color || !engine || !make || !model || !year
            || !numberPlate) {
            return NextResponse.json({ message: 'All fields are needed', }, {
                status: 400,
            });;
        }

        const fileName = await ImageUploadHelper(data.carImage)


        const car = await findDriverCar(id)
        console.log(car)
        if (car) {
            return NextResponse.json({ message: 'Car Already Exist' }, {
                status: 400,
            });;
        }

        const newCar = await createCar(data, fileName, id)

        return NextResponse.json(newCar, {
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