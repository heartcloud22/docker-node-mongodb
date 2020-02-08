const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Item = require("./models/Item");

app.get("/", (req, res) => {
  Item.find()
    .then(items => res.render("index", { items }))
    .catch(err => err.status(400).json({ msg: "No item found" }));
});

app.post("/item/add", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.redirect("/"));
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server running..."));
