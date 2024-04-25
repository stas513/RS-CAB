import { findDriverDocument, updateDocumentLegalInfo } from "@/app/api/helpers/driver";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    
    const document = await findDriverDocument(id)
        
    if (!document){
        return NextResponse.json({ message: 'Document Not Found'}, {
            status: 400,
        });;
    }

    const result =await updateDocumentLegalInfo(document.id, body);

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
