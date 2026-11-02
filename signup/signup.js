import express from "express";

import { signup } from "./signup.controller.js";

import validate from "../middleware/validate.middleware.js";

import { signupSchema } from "../validations/auth.validation.js";

const router = express.Router();

// Signup Route
router.post(
    "/",
    validate(signupSchema),
    signup
);

export default router;