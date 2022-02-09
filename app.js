const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

//set certain option for apps
//use special engine to process files 'EJS'
app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "ejs");

//middleware for static files CSS/Images
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  // const htmlFilePaths = path.join(__dirname, "pages", "restaurants.html");
  // res.sendFile(htmlFilePaths);

  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/recommend", function (req, res) {
  // const htmlFilePaths = path.join(__dirname, "pages", "recommend.html");
  // res.sendFile(htmlFilePaths);
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  // const restaurantName = req.body.name;
  const restaurantInput = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurantInput);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  // const htmlFilePaths = path.join(__dirname, "pages", "confirm.html");
  // res.sendFile(htmlFilePaths);
  res.render("confirm");
});

app.get("/about", function (req, res) {
  // const htmlFilePaths = path.join(__dirname, "pages", "about.html");
  // res.sendFile(htmlFilePaths);
  res.render("about");
});

//incoming request/network on certain port
app.listen(3000);
