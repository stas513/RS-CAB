import { uploadImageToS3 } from "@/app/(RSAdmin)/admin/utils/s3bucket";
import { v4 as uuid } from "uuid";


export const ImageUploadHelper = async (image) => {

    const mimeType = image?.type;
    const fileExtension = mimeType?.split("/")[1];

    const buffer = image ? Buffer?.from(await image?.arrayBuffer()) : null;

    const fileName = image ? await uploadImageToS3(
        buffer,
        uuid() + "." + fileExtension,
    ) : null;


    return fileName
}
