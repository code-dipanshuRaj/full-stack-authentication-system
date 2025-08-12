import nodemailer from 'nodemailer';
import User from '@/models/user.model';
import bcrypt from 'bcrypt';
import { Html } from 'next/document';

export const sendEmail = async({email, emailType, userId} : any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if(emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken : hashedToken,
        verifyTokenExpiry : Date.now() + 60 * 60 * 1000, // 1 hour  
      },
      {
        new: true, // return the updated document
        runValidators: true, // validate the updated document against the schema
      });
    } else if(emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken : hashedToken,
        forgotPasswordExpiry : Date.now() + 60 * 60 * 1000, // 1 hour
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10) || 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: "official.dipanshu.raj@gamil.com",
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<h1>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.</h1>
      ${emailType === 'VERIFY' ?
        `<br><h2>or copy and paste this link into your browser:</h2>
        <br><p>${process.env.domain}/verifyemail?token=${hashedToken}</p>
        <br><p><strong>Your token is:</strong> ${hashedToken}</p>,
        text: Your token is: ${hashedToken}` 
        
        :
        
        `<br><h2>or copy and paste this link into your browser:</h2>
        <br><p>${process.env.domain}/set-password?token=${hashedToken}</p>
        <br><p><strong>Your token is:</strong> ${hashedToken}</p>,
        text: Your token is: ${hashedToken}`
      }`
    };

    return await transport.sendMail(mailOptions);
  } catch (error : any) {
    console.error('Error sending email:', error);
    throw new Error(error.message);
    
  }
} 