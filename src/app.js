const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to derve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yasindu Dilshan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yasindu Dilshan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "this is some helpful text",
    title: "Help",
    name: "Yasindu Dilshan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You miss provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (errorf, dataf) => {
        if (errorf) {
          return res.send({
            error: errorf,
          });
        }

        res.send({
          forecast: dataf,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you miss provie a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yasindu Dilshan",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yasindu Dilshan",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
