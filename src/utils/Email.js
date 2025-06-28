import { EventEmitter } from "events";
import sendEmail, { subject } from "./sendEmail.js";
import { signUp } from "./generateHTML.js";
import jwt from "jsonwebtoken"


export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async (email,userName) => {

  const token=jwt.sign({email},process.env.TOKEN_SECRET_EMAIL);
  const link=`http://sarahaapp19122003.eu-4.evennode.com/auth/activate_account/${token}`;
  const isSent=await sendEmail({
    to:email,
    subject:subject.register,
    html:signUp(link,userName)
    
  }
);
});
