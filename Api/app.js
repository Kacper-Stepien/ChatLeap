const express = require("express");

const app = express(); // Create express app

app.listen(3000, () => {
  // Start Express server
  console.log("Serwer uruchomiony na porcie 3000");
});
