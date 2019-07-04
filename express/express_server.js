const express        = require("express");
const cookieSession  = require("cookie-session");
const bcrypt         = require("bcrypt");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");

const app  = express();
const PORT = 8080;

// Create AJAX database environment
const environment   = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database      = require("knex")(configuration);

// Use cookie session for login event
app.use(cookieSession({
  name: "session",
  keys: ["express"]
}));

// Use body parser for all routes
app.use(bodyParser.urlencoded({ extended: true }));

// Use method override for login and register
app.use(methodOverride("_method"));

// Set ejs as the template engine
app.set("view engine", "ejs");

/* Generate string of 12 random numeric characters for user ID in register 
database */
function generateRandomString() {
  let text = "";
  let str = "0123456789";
  for (let i = 0; i < 12; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
}

// GET home page
app.get("/", (req, res) => {
  res.render("urls_index");
});

// GET registration form
app.get("/register", (req, res) => {
  res.render("urls_register");
});

// Boot server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
