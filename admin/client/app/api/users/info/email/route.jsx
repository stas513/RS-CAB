import { checkUserByCognito, checkUserByEmail } from "@/app/api/helpers/appUser";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const generateToken = (obj) => {
  return jwt.sign(obj, "absd", {
    expiresIn: "12h",
  });
};

export async function POST(req) {
    const { email } = await req.json() || {};
    try {
        const result = await checkUserByEmail(email);
        if (!result){
            return NextResponse.json({message:'user not found'}, {
                status: 404,
                 statusText: "user not found."
            });

        }

        return NextResponse.json({token:generateToken(result)}, {
            status: 200
        });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Internal Server Error', error: err }, {
            status: 400,
            statusText:err.message
        });;
    }
}