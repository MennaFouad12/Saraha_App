import mongoose from "mongoose"


const connectDB=async()=>{
try {
  await mongoose.connect(process.env.DB_URI)
  console.log("database connected successfully");
  
} catch (error) {
  console.log("error connecting DB",error);
  
}
}
export default connectDB