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

/* Generate string of 9 random numeric characters for user ID in register 
database */
function generateRandomString() {
  let text = "";
  let str = "0123456789";
  for (let i = 0; i < 9; i++) {
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

// PUT registration form
app.put("/register", (req, res) => {
  const userId = generateRandomString();
  const firstName = req.body.firstName
  const lastName = req.body.lastName;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  // Add registration information in users database
  database.insert([{
    id: userId,
    first_name: firstName,
    last_name: lastName,
    email: userEmail,
    password: bcrypt.hashSync(userPassword, 10)
  }])
  .into("users")
  .then((result) => {
    res.redirect("/logged-in");
  });
});

// Boot server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
