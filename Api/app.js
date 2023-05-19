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

const app = express();

// Middlewares
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(helmet()); // Protect app from well-known web vulnerabilities by setting HTTP headers appropriately
app.use(mongoSanitize()); // Prevent NoSQL query injection
app.use(xss()); // Sanitize user input coming from POST body, GET queries, and url params

app.use((req, res, next) => {
  //res.setHeader("Access-Control-Allow-Origin", "https://chatleap.onrender.com"); // zamiast http://localhost:3001 wpisz adres swojej aplikacji klienckiej
  res.setHeader("Access-Control-Allow-Origin", "*"); // zamiast http://localhost:3001 wpisz adres swojej aplikacji klienckiej
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/chatleap/users", userRouter);
app.use("/chatleap/posts", postRouter);
app.use("/chatleap/comments", commentRouter);

app.all("*", (req, res, next) => {
  // Handle all undefined routes
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
