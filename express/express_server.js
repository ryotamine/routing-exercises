const express        = require("express");
const cookieSession  = require("cookie-session");
const bcrypt         = require("bcrypt");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");

const app  = express();
const PORT = 8080;

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

// GET home page
app.get("/", (req, res) => {
  res.render("urls_index");
});

// Boot server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
