const URL = require('../models/url');
const express = require('express');

const router = express.Router();
const {restrictTo} = require("../middlewares/auth");



router.get("/", async (req, res) => {

    if (!req.user) {
        return res.redirect("/login");
    }

    if (req.user.role === "ADMIN") {
        const allurls = await URL.find({});

        return res.render("home", {
            urls: allurls,
        });
    }

    if (req.user.role === "NORMAL") {
        const allurls = await URL.find({
            createdBy: req.user._id
        });

        return res.render("home", {
            urls: allurls,
        });
    }

    return res.end("Unauthorized");
});

// router.get('/', restrictTo(["ADMIN"]),async (req,res) => {
//  // if(!req.user) return res.redirect('/login');
//   const allurls = await URL.find({});
//   return res.render('home', {
//     urls: allurls,
//   });
// });


// router.get('/', restrictTo(["NORMAL","ADMIN"]),async (req,res) => {
//  // if(!req.user) return res.redirect('/login');
//   const allurls = await URL.find({createdBy: req.user._id});
//   return res.render('home', {
//     urls: allurls,
//   });
// });

router.get("/signup", (req,res) => {
  return res.render("signup");
});

router.get("/login", (req,res) => {
  return res.render("login");
});

module.exports = router;
