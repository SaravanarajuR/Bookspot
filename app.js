//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/loginDB", {
  useNewUrlParser: true
});


const schema = {
  emailId: String,
  password: String,
};

const Data = mongoose.model("Data", schema);

app.get("/", function(req, res) {
  res.render("index", {
    i: 'hidden',
  });
});

app.get("/home", function(req, res) {
  res.render("mainpage");
})

app.get("/signup", function(req, res) {
  res.render("signup");
});

app.get("/lucky", function(req, res) {
  res.render("lucky");
});

app.get("/categories", function(req, res) {
  res.render("categories");
});

app.get("/authors", function(req, res) {
  res.render("authors");
});


app.post("/signup", function(req, res) {
  var data = new Data({
    emailId: req.body.email,
    password: req.body.pass,
  })
  data.save();
  res.redirect("/");
});

app.post("/", function(req, res) {
      Data.find({}, function(err, found) {
          var i = 0;
          found.forEach(function(object) {
              if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
                function ValidateEmail(mail) {
                  if (object.emailId === req.body.email && object.password === req.body.pass)
                   {
                    res.render("mainpage");
                  } else {
                    alert("You have entered an invalid email address!")
                  }
                }
              }
            });

            if (i != 1) {
              res.render("index", {
                i: 'visible',
              })
            }
              });
          });

    app.listen(3000, function() {
      console.log("Server started on port 3000");
    });
