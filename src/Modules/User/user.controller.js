import { Router } from "express";
import * as userService from "./user.service.js"
import { allowTo, authenticate } from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as userValidation from "./user.validation.js";
import { validation } from "../../middlewares/vaildation.middleware.js";
const router=Router();

router.get("/profile",authenticate,allowTo(["User","Admin"]),asyncHandler(userService.getUser));
router.patch("/",authenticate,allowTo(["User","Admin"]),validation(userValidation.updateProfileSchema),asyncHandler(userService.updateUser));
router.patch("/changePassword",authenticate,allowTo(["User","Admin"]),validation(userValidation.changePasswordSchema),asyncHandler(userService.changePassword));
router.delete("/",authenticate,allowTo(["User","Admin"]),asyncHandler(userService.deActivateAccount));
export default router;