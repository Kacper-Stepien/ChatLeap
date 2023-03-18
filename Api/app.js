const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Load environment variables from .env file

dotenv.config({ path: "./config.env" }); // Load environment variables from .env file

const app = express(); // Create express app

// Connect to database
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(db)
  .then(() => {
    console.log("Połączono z bazą danych");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000; // Get port from environment and store in Express.
app.listen(port, () => {
  // Start Express server
  console.log(port);
  console.log("Serwer uruchomiony na porcie 3000");
});
