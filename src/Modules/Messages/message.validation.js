import Joi from "joi";
import { Types } from "mongoose";


export const sendMessageSchema = Joi.object({
  content: Joi.string().required(),
  receiver: Joi.custom((value, helpers) => {
if (Types.ObjectId.isValid(value)) return true;
return helpers.message("reciever must be valid ObjectId");

  }).required(),
}).required();
export const getSingleMessageSchema = Joi.object({
messageId: Joi.custom((value, helpers) => {
if (Types.ObjectId.isValid(value)) return true;
return helpers.message("messageId must be valid ObjectId");
}).required()
}).required();

export const flags={
  inbox:"inbox",
  outbox:"outbox"
}
export const getAllMessagesSchema = Joi.object({
flag:Joi.string().valid(...Object.values(flags)).required()
}).required();