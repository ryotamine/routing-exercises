"use strict"

// Libraries
const express        = require("express");
const cookieSession  = require("cookie-session");
const bcrypt         = require("bcrypt");
const bodyParser     = require("body-parser");
const methodOverride = require("method-override");

// Use port 8080
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

// Use method override for login, register, and logout
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
  const registerEmail = req.body.email;
  const registerPassword = req.body.password;
  const hashedRegisterPassword = bcrypt.hashSync(registerPassword, 10);

  // Check for registration errors
  if (!firstName || !lastName || !registerEmail || !registerPassword) {
    res.status(400).send("Invalid entry. Please try again.");
    return;
  } else {
    /* Check if email already exists in users database. 
    If so, send error message. 
    If not, add registration information in users database. */
    database.select("email")
      .from("users")
      .where("email", registerEmail)
      .then((emailList) => {
        if (emailList.length !== 0) {
          res.status(400).send("Email already exists. Please try again.");
          return;
        } else {
          database.insert([{
            id: userId,
            first_name: firstName,
            last_name: lastName,
            email: registerEmail,
            password: hashedRegisterPassword
          }])
          .into("users")
          .then((result) => {
            // Add cookie session after registration
            req.session.user_id = userId;
            res.redirect("/welcome");
          });
        }
      });
  }
});

// GET login form
app.get("/login", (req, res) => {
  res.render("urls_login");
});

// PUT login form
app.put("/login", (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;

  // Check for login errors
  if (!loginEmail || !loginPassword) {
    res.status(400).send("Invalid entry. Please try again.");
    return;
  } else {
    /* Compare email and password to users database.
    If both matches, go to welcome page.
    If not, send error message. */
    database.select("email")
      .from("users")
      .where("email", loginEmail)
      .then((emailList) => {
        if (emailList.length === 0) {
          res.status(400).send("Invalid email. Please try again.");
          return;
        } else {
          database.select("password")
            .from("users")
            .where("password", loginPassword)
            .then((passwordList) => {
              if (passwordList === database.registerPassword) {
                res.status(400).send("Invalid password. Please try again.");
                return;
              } else {
                // Add cookie session after login
                req.session.user_id = database.id;
                res.redirect("/welcome");
              }
            });
        }
      });
  }
});

// GET welcome page
app.get("/welcome", (req, res) => {
  res.render("urls_welcome");
});

// DELETE logout and remove cookie session
app.delete("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

// Boot server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
