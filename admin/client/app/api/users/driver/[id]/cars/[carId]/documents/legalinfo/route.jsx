import { updateCarDocumentLegalInfo } from "@/app/api/helpers/driver";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { carId } = params;
  try {
    const body = await req.json();
    console.log(carId,body)
   const result = await updateCarDocumentLegalInfo(carId, body);

    return NextResponse.json(
      { message: `Legal Info Updated`,data:result },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err },
      {
        status: 400,
      }
    );
  }
}
