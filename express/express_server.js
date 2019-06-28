const express = require("express");
const app     = express();
const PORT    = 8080;

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// GET home page
app.get("/", (req, res) => {
  res.render("urls_index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
