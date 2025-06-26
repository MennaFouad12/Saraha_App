import joi from "joi";
import { gender } from "../../DB/models/user.model.js";
import { rolesTypes } from "../../middlewares/auth.middleware.js";
import { generalFields } from "../../middlewares/vaildation.middleware.js";

export const registerSchema = joi.object({
userName:generalFields.userName.required(),
  email: generalFields.email.required(),
  password: generalFields.password.required(),
  confirmPassword: generalFields.confirmPassword.required(),
  phone: generalFields.phone.required(),
  gender: generalFields.gender,
  role: generalFields.role,
  id: generalFields.id,

});

export const loginSchema = joi.object({
  email: generalFields.email.required(),
  password: generalFields.password.required(),
});
