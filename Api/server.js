const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Load environment variables from .env file
const app = require("./app");

dotenv.config({ path: "./config.env" }); // Load environment variables from .env file

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Start Express server
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
