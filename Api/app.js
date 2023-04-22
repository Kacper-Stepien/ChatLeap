const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

dotenv.config({ path: "./config.env" }); // Load environment variables from .env file

const app = express(); // Create express app

// Middlewares - functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use(helmet()); // Protect app from well-known web vulnerabilities by setting HTTP headers appropriately

app.use(mongoSanitize()); // Prevent NoSQL query injection

app.use(xss()); // Sanitize user input coming from POST body, GET queries, and url params

// Routes
app.use("/chatleap/users", userRouter);
app.use("/chatleap/posts", postRouter);
app.use("/chatleap/comments", commentRouter);

app.all("*", (req, res, next) => {
  // Handle all undefined routes
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler); // Global error handler - must be after all routes and middlewares that can throw errors

module.exports = app;
