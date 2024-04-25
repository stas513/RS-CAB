import { NextResponse } from "next/server";
import { updateUser } from "../../helpers/appUser";

export async function PUT(req, { params }) {
    const { id } = params;
    const data = await req.json();

    delete data.cognitoUserName
    delete data.email
    
    try {
        const result = await updateUser(id, data)
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
