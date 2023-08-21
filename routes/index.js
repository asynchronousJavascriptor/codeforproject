var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, function (req, res, next) {
  userModel.findOne({username: req.session.passport.user})
  .then(function(foundUser){
    res.render("profile", {foundUser})
  })
});

router.post('/post', isLoggedIn, function (req, res, next) {
  postModel.create({
    username: req.session.passport.user,
    data: req.body.post
  })
  .then(function(createdPost){
    res.redirect("back");
  });
});


router.get('/feed', isLoggedIn, function (req, res, next) {
  postModel.find()
  .then(function(allposts){
    res.render("feed", {allposts});
  });
});

router.get('/login', function (req, res, next) {
  res.render("login");
});

router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",                                                              
  failureRedirect: "/login"
}), function (req, res, next) {
});

router.post('/register', function (req, res, next) {
  var newuser = new userModel({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    image: req.body.image,
  });

  userModel.register(newuser, req.body.password)
  .then(function(u){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  });
});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect("/login");
  }
}

module.exports = router;
