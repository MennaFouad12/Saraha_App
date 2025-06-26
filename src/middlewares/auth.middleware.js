import jwt from "jsonwebtoken";
import UserModel from "../DB/models/user.model.js";


export const rolesTypes={
  Admin:"Admin",
  User:"User"
}
//token based authentication
export const authenticate=async(req,res,next)=>{
  try{
  const {authorization}=req.headers;
  if(!authorization){
    return next
    (new error("authorization token is required"),{cause:401})
  }
  const [bearer,token]=authorization.split(" ");
  let token_signature=undefined;
  switch(bearer){
    case "User":
      token_signature=process.env.TOKEN_SECRET_USER;
      break;
      case "Admin":
      token_signature=process.env.TOKEN_SECRET_ADMIN;
      break;
    default:
      break;
  }
    //DECODED TOKEN
    const decoded=jwt.verify(token,token_signature);
    const user=await UserModel.findById(decoded.id);
    if(!user){
    return next(new Error("user not found"),{cause:404});
    }
console.log({passwordTime:user.changedAt.getTime(),tokenIat:decoded.iat*1000});
//*1000 to convert from seconds to milliseconds 
if (user.changedAt.getTime() > decoded.iat*1000) {
  return next(new Error("please login again"),{cause:404});
}
if(user.isDeleted===true){
  return next(new Error("please login again"),{cause:401});
}
req.user=user


return next()
  }
  catch(error){
    return next(error)
  }

}
//authentication middleware
export const allowTo=(roles=[])=>{
  return (req,res,next)=>{
    try{
      if(!roles.includes(req.user.role)){
        return next(new Error("you are not allowed"),{cause:403});
      }
    return next();
    }
    catch(error){
      return next(error)
    }

  }
}