import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from the specified .env file
dotenv.config();


console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL);
console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD);
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user:process.env.SMTP_EMAIL ,//"mm6331329@gmail.com"
      pass:process.env.SMTP_PASSWORD ,//"kjyr taiq vayf dbsj"
    }
  });
  const info=await transporter.sendMail({
    from:process.env.SMTP_EMAIL,
    to ,//"hanahanaahmed448@gmail.com"
    subject,
    html,
  })
console.log(info );
return info.rejected.length===0?true:false
};
export const subject={
  register:"activate your account",
  resetPassword:"reset your password"
}
export default sendEmail

