const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Load environment variables from .env file
const helmet = require("helmet"); // This will set some HTTP headers to help protect your app from some well-known web vulnerabilities
const mongoSanitize = require("express-mongo-sanitize"); // This will prevent NoSQL query injection
const xss = require("xss-clean"); // This will sanitize user input coming from POST body, GET queries, and url params

const userRouter = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" }); // Load environment variables from .env file

const app = express(); // Create express app

// Middlewares - functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use(helmet()); // Protect app from well-known web vulnerabilities by setting HTTP headers appropriately

app.use(mongoSanitize()); // Prevent NoSQL query injection

app.use(xss()); // Sanitize user input coming from POST body, GET queries, and url params

// Routes
app.use("/chatleap/user", userRouter);

module.exports = app;
