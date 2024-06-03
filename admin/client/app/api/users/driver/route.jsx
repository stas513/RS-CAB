import { NextResponse } from "next/server";
import { createDriver, findDriver, findDriverByUserId } from "@/app/api/helpers/driver";
import { convertFormData } from "@/app/api/utils/convertFormData";
import { ImageUploadHelper } from "@/app/api/helpers/imageUpload";

export async function POST(req) {
  try {
    const body = await req.formData();

    let data = convertFormData(body);

    const { userId } = data || {};

    if (!userId) {
      return NextResponse.json(
        { message: "Missing Required Fields" },
        { status: 400, statusText: "Missing Required Fields." }
      );
    }
    
    const driverExit = await findDriverByUserId(userId)
    
    if (driverExit) {
      return NextResponse.json(
        { message: "Driver Already Exits" },
        {
          status: 400,
          statusText: "Driver Already Exits",
        }
      );
    }

    const fileName = await ImageUploadHelper(data?.profileImage);

    const driver = await createDriver(data, userId, fileName);

    return NextResponse.json(
      { ...driver },
      {
        status: 201,
      }
    );
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      {
        status: 400,
        statusText: error.message,
      }
    );
  }
}
