import express from "express";

import { login } from "./login.controller.js";

import validate from "../middleware/validate.middleware.js";

import { loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

// Login API
router.post(
    "/",
    validate(loginSchema),
    login
);

export default router;