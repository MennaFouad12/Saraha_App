import mongoose, { Types } from "mongoose";

const messageSchema = new mongoose.Schema({
  
  content:{
    type:String,
    required:[true,"content is required"],
  },
  sender: {
    type: Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: Types.ObjectId,
    ref: "User",
  },
},
{
  timestamps: true,
}
)
const MessageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default MessageModel;