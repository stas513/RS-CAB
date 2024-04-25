import { NextResponse } from 'next/server';
import prisma from '@/database/prisma';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'justice78@ethereal.email',
    pass: 'bZ59Sd1HutyegqjEdk',
  },
});

// Email Template
const ReturnHtmlForSms = (otp) => {
  let html = `<html>
  <head>
    <meta charset="utf-8">
    <title>Send Otp</title>
  </head>
  <body>
    <h1>Dear Your Verification OTP Is</h1>
    <p>${otp}</p>
    <p>Thank you,</p>
    <p>Rider Share Team</p>
  </body>
  </html>`;
  return html;
};

export async function POST(req) {
  try {
    const user = await prisma.Admin.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({message:"User not found!"}, {
        status: 401
      });    
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Store the OTP in the user record
    await prisma.Admin.update({
      where: { id: user.id },
      data: { otp },
    });

    const mailOptions = {
      from: 'justice78@ethereal.email',
      to: email,
      subject: 'OTP Verification',
      html: ReturnHtmlForSms(otp),
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(user, {
      status: 200
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' },{
      status: 500
    });
  }

}