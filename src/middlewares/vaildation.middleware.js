import { Types } from "mongoose";
import joi from "joi";
import { gender } from "../DB/models/user.model.js";
import { rolesTypes } from "./auth.middleware.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const results = schema.validate(data, { abortEarly: false });

    if (results.error) {
      const errorMessage = results.error.details.map((obj) => obj.message);
      return next(new Error(errorMessage, { cause: 400 }));
    }
    return next();
  };
};

export const isValidObjectId = (value, helpers) => {
  // checks if the value is a valid ObjectId
  if(Types.ObjectId.isValid(value)) return true;

  return helpers.message("reciever must be a valid ObjectId");
};


export const generalFields={
userName: joi.string().min(3).max(20),
  email: joi.string().email(),
  password: joi.string(),
  confirmPassword: joi.string().valid(joi.ref("password")),
  phone: joi.string(),
  gender: joi.string().valid(...Object.values(gender)),
  role: joi.string().valid(...Object.values(rolesTypes)),
  /////////////////////////////
  // ObjectId
  id: joi.custom((value, helpers) => {
    // checks
    if (value > 20) return true;
    return helpers.message("id must be less than 20");
  }),
}