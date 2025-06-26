import UserModel from "../../DB/models/user.model.js";
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"
import { rolesTypes } from "../../middlewares/auth.middleware.js";
import sendEmail, { subject } from "../../utils/sendEmail.js";
import { signUp } from "../../utils/generateHTML.js";
import { EventEmitter } from "events";
import { emailEmitter } from "../../utils/Email.js";
export const register=async(req,res,next)=>{

  const {userName,email,password,confirmPassword,phone,role}=req.body;
  if(password!==confirmPassword){
    return next(new Error("password is not matched"),{cause:401});
  }
  const checkUser=await UserModel.findOne({email:email});
  if(checkUser){
    return next(new Error("user already exists"),{cause:401});
  }
  //hashing password
  const hashPassword= bcrypt.hashSync(password,10);//block code
  //encryption
const encryptPhone = CryptoJS.AES.encrypt(phone, process.env.ENCRYPTION_SECRET).toString();
  const user=await UserModel.create({
    userName,
    email,
    password:hashPassword,
    phone:encryptPhone,
    role
  });
  emailEmitter.emit("sendEmail",user.email,user.userName);

return res.status(200).json({succes:true,message:"user logged in successfully",user:user})

}


export const login =async(req,res,next)=>{

    const {email,password}=req.body;
  
    const user=await UserModel.findOne({email:email});
    if(!user){
    return next(new Error("user not found"),{cause:404});
    }
    if (!user.confirmEmail) {
      return next(new Error("user not confirmed"),{cause:401});
    }
    const match=await bcrypt.compare(password,user.password); //هنا بيقارن الباسورد المدخل والباسورد اللي معمله هاش  في الداتا بيز
    if(!match){
      return next(new Error("password not correct"),{cause:401});
    }
    //decryption
    // user.phone=CryptoJS.AES.decrypt(user.phone, process.env.ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
    //create token
    const token=jwt.sign({id:user._id,isloggedin:true},
      user.role===rolesTypes.User ?
      process.env.TOKEN_SECRET_USER:
      process.env.TOKEN_SECRET_ADMIN
      ,{expiresIn:"1d"});
      if (user.isDeleted===true) {
        user.isDeleted=false;
        await user.save();
      }
  return res.status(200).json({succes:true,message:"user created successfully",token})

  }




  export const activateAccount=async(req,res,next)=>{
  
      const {token}=req.params;
      const decoded=jwt.verify(token,process.env.TOKEN_SECRET_EMAIL);
      const user=await UserModel.findOne({email:decoded.email});
      if(!user){
        return next(new Error("user not found"),{cause:404});
      }
      user.confirmEmail=true;
      await user.save();
      return res.status(200).json({succes:true,message:"user activated successfully"})
    
    }