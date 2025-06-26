import mongoose,{Schema} from "mongoose";
import { rolesTypes } from "../../middlewares/auth.middleware.js";
export const gender = {
  male: "male",
  female: "female",
};
const userSchema=new Schema({
  userName:{
    type:String,
    required:[true,"name is required"],
    minLength:[3,"username must be at least 3 characters"],
    maxLength:[20,"username must be at most 20 characters"],
    trim:true
  },
    email:{
      type:String,
      required:[true,"email is required"],
      unique:[true,"email must be unique"],
      match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"email is not valid"],
      lowercase:true,
      trim:true
    },
    password:{
      type:String,
      required:[true,"password is required"],
    
    },
    gender:{
      type:String,
      enum:{
        values:["male","female"],
        message:"gender must be male or female"
      },
      // default:"male"
    },
  confirmEmail:{
    type:Boolean,
    default:false
  }  ,
  role:{
  type:String,
  enum:Object.values(rolesTypes),
  default:rolesTypes.User
  },
  DOB:String,
  address:String,
  phone:String,
  image:String,
  changedAt:Date,
  isDeleted:Boolean
},{timestamps:true});//to add created_at and updated_at in database


const UserModel=mongoose.model("User",userSchema);
export default UserModel ;