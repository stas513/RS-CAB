import { NextResponse } from "next/server";
import { findAllPackages, createPackage, findPackageByName, deletePackage } from '../../helpers/package'
import { ImageUploadHelper } from "../../helpers/imageUpload";
import { convertFormData } from "../../utils/convertFormData";

export async function GET() {
    try {
        const result = await findAllPackages()
        return NextResponse.json(result, {
            status: 200
        });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Internal Server Error', error: err }, {
            status: 500,
        });;
    }
}

export async function POST(req) {
    try {
        const body = await req.formData()

        let data = convertFormData(body);

        const {
            name,
            summary,
            description,
            sortIndex,
        } = data || {}

        if (!name || !summary || !description || !sortIndex) {
            return NextResponse.json({ message: "Missing Required Fields" }, { status: 400 })
        }

        const findPackage = await findPackageByName(name);

        if (findPackage) {
            return NextResponse.json({ message: 'Package Already Exit With This Name' }, {
                status: 400,
            });;

        }
        const fileName = await ImageUploadHelper(data?.coverImage)
        const newPackage = await createPackage(data, fileName)

        return NextResponse.json(newPackage, {
            status: 201,
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error', error: error }, {
            status: 400,
        });;
    }
}
