import jwt from "jsonwebtoken";
import UserModel from "../../DB/models/user.model.js";
import CryptoJS from "crypto-js";
import { comparePassword, hashPassword } from "../../utils/hash.js";
export const getUser=async(req,res,next)=>{

  
//decryption
  req.user.phone=CryptoJS.AES.decrypt(req.user.phone, process.env.ENCRYPTION_SECRET).toString(CryptoJS.enc.Utf8);
  return res.status(200).json({succes:true,message:"All user found",results:req.user})
  
  }
  export const updateUser=async(req,res,next)=>{
    if (req.body.phone){
      req.body.phone=CryptoJS.AES.encrypt(req.body.phone, process.env.ENCRYPTION_SECRET).toString();
    }
    const user = await UserModel.findByIdAndUpdate(req.user._id,{...req.body},{new:true,runValidators:true});
    return res.status(200).json({succes:true,message:"Profile updated successfully",results:user})

  }
  export const changePassword=async(req,res,next)=>{
const {oldPassword,newPassword}=req.body;
//check if the old password is correct
const  compareHash=comparePassword({plainText:oldPassword,hash:req.user.password});
if(!compareHash){
  return next(new Error("old password is not correct"),{cause:401});
}
//hash the new password
const hashedPassword=await hashPassword ({plainText:newPassword});
//update the password
const user=await UserModel.findByIdAndUpdate(req.user._id,{password:hashedPassword,changedAt:Date.now()},{new:true,runValidators:true});
return res.status(200).json({succes:true,message:"Password changed successfully",results:user})

  }




  export const deActivateAccount=async(req,res,next)=>{ 
const user=await UserModel.findByIdAndUpdate(req.user._id,{
  isDeleted:true,
  changedAt:Date.now()},
  {new:true,runValidators:true}
  
);
  
return res.status(200).json({succes:true,message:"Account deleted successfully",results:user})



  }