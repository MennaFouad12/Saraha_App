import { Router } from "express";
import * as messageService from "./message.service.js"
import asyncHandler from "../../utils/asyncHandler.js";
import { allowTo, authenticate } from "../../middlewares/auth.middleware.js";
import {validation} from "../../middlewares/vaildation.middleware.js";
import * as messageValidation from "./message.validation.js";
const router=Router();

router.post("/",authenticate,allowTo(["User"]),validation(messageValidation.sendMessageSchema),asyncHandler(messageService.sendMessage))
router.get("/:messageId",authenticate,allowTo(["User"]),validation(messageValidation.getSingleMessageSchema),asyncHandler(messageService.getSingleMessage))
router.get("/",authenticate,allowTo(["User"]),validation(messageValidation.getAllMessagesSchema),asyncHandler(messageService.getAllMessages))
router.patch("/:messageId",authenticate,allowTo(["User"]),asyncHandler(messageService.UpdateMessage))
router.delete("/:messageId",authenticate,allowTo(["User"]),asyncHandler(messageService.DeleteMessage))
export default router;