import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import fs from 'fs'
const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_REGION,
    credentials: {
        accessKeyId: process.env.A_ACCESS_KEY,
        secretAccessKey: process.env.A_SECRET_KEY,
    },
});

export async function uploadImageToS3(
    file,
    fileName
) {
    const resizedImageBuffer = await sharp(file)
        .toBuffer();

    const key = `${Date.now()}-${fileName}`
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: resizedImageBuffer,
        ContentType: "image/*", // Change the content type accordingly
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return key;
}


export async function deleteImageToS3(
    Key
) {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key,
        };

        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        return Key;
    }
    catch (err) {
        console.log(err)
    }

}


export async function getImageToS3(
    Key
) {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key,
        };


        const command = new GetObjectCommand(params);
        const response = await s3Client.send(command);
        const chunks = [];

        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:image/png;base64,${base64}`;
        return dataUrl;
    }
    catch (err) {
        console.log(err)
    }

}

