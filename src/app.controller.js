import connectDB from "./DB/connection.js"
import authRouter from "./Modules/Auth/auth.controller.js"
import messageRouter from "./Modules/Messages/message.controller.js"
import userRouter from "./Modules/User/user.controller.js"
import cors from "cors"
const bootstrap =async(app,express)=>{
  await connectDB();
  app.use(cors());
  //اي داتا بتتبعت فالنيكست بتروح علي الجلوبال ايرور هاندلينج
app.use(express.json());
app.get("/",(req,res)=>{
  res.send("hello world");
});  
app.get(
  "/test",
  (req,res,next)=>{
  next({name:"menna"});
  },
  (req,res,next)=>{
    console.log("2nd middleware");
  }
);

app.use("/auth",authRouter)
app.use("/message",messageRouter)
app.use("/user",userRouter)
app.all("*",(req,res,next)=>{
return next(new Error("route not found"),{cause:404});
})

//this is global error handler
app.use((err, req, res, next) => {
  // Uncomment the following line for debugging
  // console.log(err);
  // console.log("hello from global error handler");

  const status = err.status || 500; // Ensure you're using `err` consistently
  return res.status(status).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});
}
export default bootstrap;