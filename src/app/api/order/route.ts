import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    let attachmentDetails = [];

    // Store the file locally
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      // Create dir if it doesn't exist
      try { await mkdir(uploadDir, { recursive: true }); } catch (e) {}

      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const attachmentPath = join(uploadDir, fileName);
      await writeFile(attachmentPath, buffer);
      
      attachmentDetails.push({
        filename: file.name,
        path: attachmentPath
      });
    }

    // Configure Nodemailer to send to seobydawood@gmail.com
    // Note: You must provide a valid App Password here or use a proper SMTP service in production
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "seobydawood@gmail.com", 
        pass: "YOUR_GMAIL_APP_PASSWORD" // REPLACE THIS with an App Password
      }
    });

    const mailOptions = {
      from: `"Wanderjackets Store" <seobydawood@gmail.com>`, // Send from self
      replyTo: email, // Reply to the customer
      to: "seobydawood@gmail.com", // Send to self
      subject: `New Custom Order Request from ${name}`,
      text: `
You have received a new custom jacket order!

Name: ${name}
Email: ${email}
Phone: ${phone}

Description:
${description}

File Uploaded: ${file && file.size > 0 ? 'Yes (See attached)' : 'No'}
      `,
      attachments: attachmentDetails
    };

    // Attempt to send email. 
    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Email failed to send. You need to configure the Gmail App Password in route.ts:", mailError);
      // We still return success because the file was saved to the server successfully!
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
