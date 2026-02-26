import nodemailer from "nodemailer";

export const sendOTPEmail = async (email: string, otp: number) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Marriage Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c8102e; margin: 0;">Marriage Portal</h1>
            <p style="color: #666; margin-top: 5px;">Find Your Perfect Match</p>
          </div>

          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          
          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            Thank you for registering. Please use the OTP below to verify your email address.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background-color: #c8102e; border-radius: 8px; padding: 20px 40px;">
              <span style="color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 10px;">
                ${otp}
              </span>
            </div>
          </div>

          <p style="color: #555; font-size: 15px; line-height: 1.6;">
            This OTP is valid for <strong>10 minutes</strong>. Do not share this with anyone.
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            If you did not request this, please ignore this email.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};