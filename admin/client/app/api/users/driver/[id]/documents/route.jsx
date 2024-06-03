import { NextResponse } from "next/server";
import prisma from '@/database/prisma';
import { createDocument, createDocumentWeb, findDriverDocument, updateDocument } from "@/app/api/helpers/driver";
import { convertFormData } from "@/app/api/utils/convertFormData";

export async function GET(_, { params }) {
    const { id } = params

    try {
        const result = await findDriverDocument(id)
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

export async function POST(req, { params }) {
    const { id } = params
    try {
        const Document = await findDriverDocument(id)

        if (Document) {
            return NextResponse.json({ message: 'Document Already Exist' }, {
                status: 400,
            });;
        }

        const body = await req.formData()

        let data = convertFormData(body)

        const fieldsToExtract = [
            "accProfDoc",
            "licenceDocFront",
            "licenceDocBack",
            "pcoBadgeDocFront",
            "pcoBadgeDocBack",
            "pcoPaperDoc",
            "passportDocFront",
            "passportDocBack",
            "addressProfDoc"
        ];

        const result = await createDocument(data, fieldsToExtract, id)


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
    const { id } = params;
    try {
        const body = await req.formData()

        let data = convertFormData(body)

        const document = await findDriverDocument(id)
        
        if (!document){
            return NextResponse.json({ message: 'Document Not Found'}, {
                status: 400,
            });;
        }

       const updatedDocument=  await  updateDocument(data, id)

        return NextResponse.json({ message: `Document Updated`,data:updatedDocument }, {
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
    const { id } = params

    const data = await  req.json()
    try {

        const result = await findDriverDocument(id)

        if (result !== null) {
            for (const field in data) {
                await prisma.Document.update({ where: { id }, data: { [field]: null } })
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
