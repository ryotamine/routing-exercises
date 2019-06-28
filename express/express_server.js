const express       = require("express");
const cookieSession = require("cookie-session");
const bcrypt        = require("bcrypt");

const app  = express();
const PORT = 8080;

// Use cookie session for login event
app.use(cookieSession({
  name: "session",
  keys: ["express"]
}));

// Set ejs as the template engine
app.set("view engine", "ejs");

// Use body parser for all routes
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// GET home page
app.get("/", (req, res) => {
  res.render("urls_index");
});

// Boot server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
