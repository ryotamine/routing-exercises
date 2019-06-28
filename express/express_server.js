const express       = require("express");
const cookieSession = require("cookie-session");
const app           = express();
const PORT          = 8080;

app.use(cookieSession({
  name: "session",
  keys: ["express"]
}));

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
