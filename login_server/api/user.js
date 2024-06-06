const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
//unique string
const {v4 : uuidv4} = require('uuid')
require("dotenv").config()
// password handle 
const bcrypt = require('bcrypt');
const { userInfo } = require('os');

const user = require('../model/user')
const Userverification = require('../model/userVerification')

// controllers
const {userEmailVerification} = require('../controllers/userEmailVerification')
const {userSignIn} = require('../controllers/userLogin')
const {userSignUp} = require('../controllers/userSignUp')
const { userEmailVerification } = require('../controllers/userEmailVerification');
const {sendVerificationEmail} = require('../controllers/sendVerificationEmail');

//path for static verified page, html page 
const path = require('path');



// node mailer transporter
let transporter = nodemailer.createTransport({
    service :  "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false, // true for 465 
    auth : {
        user : process.env.AUTH_EMAIL,
        pass : process.env.NODE_MAILER_PASS
    }
})
// testing succes
transporter.verify((error, success) => {
    if(error){
        console.log(error);
    }
    else {
        console.log("ready for messages");
        console.log(success);
    }
}
)


// ROUTES

//signup
router.post('/signup', userSignUp)

// email verification route
router.get("/verify/:id/:uniqueString" , userEmailVerification)

// verified route
router.get("/verified", (req, res) => {
    // a static html page that shows user is verified.
    // res.sendFile(path.join(__dirname, "./../views/verify.html"));
    // create a html page such that according to the parameters 
   return res.json({
    "status" : "verificatoin done",
   })
})


router.get("/verification/failed" , (req, res) => {
    return res.json({
        "status" : "verificatoin failed",
       })
})

//signin
router.post('/signin', userSignIn )

module.exports = router;