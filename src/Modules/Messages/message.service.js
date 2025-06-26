import MessageModel from "../../DB/models/message.model.js";
import UserModel from "../../DB/models/user.model.js";
import { flags } from "./message.validation.js";
export const sendMessage=async(req,res,next)=>{
const {content,receiver}=req.body;
const user=await UserModel.findById(receiver);
if (!user) 
  return next(new Error("user not found"),{cause:404});

const message=await MessageModel.create({content,sender:req.user._id,receiver:receiver});
  return res.status(200).json({succes:true,message:"message found",results:message})
  
  }




  export const getSingleMessage=async(req,res,next)=>{
 const {messageId}=req.params;
 const {user}=req;
//  Without populate, the sender field in the message would just be an ObjectId. With populate,
//  it fetches the referenced User document and replaces the sender field with its full details.
 const message=await MessageModel.findById(messageId).populate([{path:"sender",select:"userName email -_id"}]);
 //to check if the sender is objectid
 console.log(message.populated("sender"));
 if (!message)
  return next(new Error("message not found"),{cause:404});
// if(message.sender._id.toString()==req.user._id.toString() || message.receiver._id.toString()==req.user._id.toString()){
//     return res.status(200).json({succes:true,message:"message found"})
// }
if (message.receiver?.email===user.email || message.sender?.email===user.email) {
  return res.status(200).json({succes:true,message:"message found",results:message})
}
return next(new Error("unauthorized"),{cause:403});
    
    }





    export const getAllMessages=async(req,res)=>{
      //استخدمت الفلاج عشان افصل بين المسدجات اللي انا بعتها والمسدجات اللي جتلي
const {flag}=req.query;

      return res.status(200).json({succes:true,results:flag==flags.inbox
        ?await MessageModel.find({receiver:req.user._id})
      :await MessageModel.find({sender:req.user._id})})
      
      }
      export const UpdateMessage=async(req,res)=>{

        return res.status(200).json({succes:true,message:"message found"})
        
        }
        export const DeleteMessage=async(req,res)=>{

          return res.status(200).json({succes:true,message:"message found"})
          
          }