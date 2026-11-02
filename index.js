import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import signupRoutes from "./signup/index.js";
import loginRoutes from "./login/login.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database connection
await connectDB();

// Routes
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);

// Error handling
app.use(errorMiddleware);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});