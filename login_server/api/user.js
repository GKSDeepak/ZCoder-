<<<<<<< HEAD
const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
//unique string
const {v4 : uuidv4} = require('uuid')
require("dotenv").config()

const user = require('../model/user')
const Userverification = require('../model/userVerification')

//path for static verified page, html page 
=======
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const bcrypt = require('bcrypt');

const User = require('../model/user');
const UserVerification = require('../model/userVerification');

// controllers
const { userEmailVerification } = require('../controllers/userEmailVerification');
const userSignIn  = require('../controllers/userLogin');
const userSignUp = require('../controllers/userSignUp');
const { sendVerificationEmail } = require('../controllers/sendVerificationEmail');

// path for static verified page, html page
>>>>>>> 4b09633dbcafe4c4168b2157ac98cbd786a3d0ee
const path = require('path');

// node mailer transporter
let transporter = nodemailer.createTransport({
<<<<<<< HEAD
    service :  "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false, // true for 465 
    auth : {
        user : process.env.AUTH_EMAIL,
        pass : process.env.NODE_MAILER_PASS
    }
})

// // mail options 
// const mailOptions = {
//     from : {
//         name : 'Zoro',
//         address : process.env.AUTH_EMAIL
//     },
//     to : ["deepakgubbala23@gmail.com", "jyoshnasainigubbala@gmail.com"],
//     subject : "Yoo",
//     text : "Hello",
//     html : "<h1> first mail </h1>",
// }

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

// // send mail
// const sendMail = async (transporter, mailOptions) => {
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log("email has been sent successfully")
//     } catch (error) {
//         console.error(error)
//     }
// }

// sendMail(transporter, mailOptions);

// password handle 
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { userInfo } = require('os');

// sending verification Email
const sendVerificationEmail = ({_id, email}, res) => {
    //url to be used in the email sent
    const currentUrl = 'http://localhost:8008/';

    const uniqueString = uuidv4();

    const verificationLink = `${currentUrl}user/verify/${_id}/${uniqueString}`;

    const verificationMailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify Your Email Address to Complete Signup',
      html: `
        <p>Verify your email address to complete the signup process. This link expires in <b>1 hour</b>.</p>
        <p>Press <a href="${verificationLink}">here</a> to verify your email.</p>
      `,
    };

    // hash the unique string and store it in user verification schema.
    const saltRounds = 10;
    bcrypt
        .hash(uniqueString, saltRounds)
        .then((hashedUniqueString) => {
            // add this data into a new userVerification 
            const newVerfication = new Userverification({
                userId : _id,
                uniqueString : hashedUniqueString,
                createdAt : Date.now(),
                expiresAt : Date.now()+ 36000000
            })
            newVerfication
            .save()
            .then(() => {
                transporter
                    .sendMail(verificationMailOptions)
                    .then(() => {
                        // email sent and verification recoed saved.
                        res.json({
                            status : "Pending",
                            message : " Done sending email and storing the verification detail, conformiing is pending by user. "
                        })
                    })
            })
            .catch(error => {
                console.log(error);
                res.json({
                    status : "Failed",
                    message : " Error occured while saving the hashed data . "
                })
            })
        })
        .catch(() => {
            res.json({
                status : "Failed",
                message : " Error occured while hashing the link . "
            })
        })
}

//signup
router.post('/signup', (req, res) => {
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    //if any is empty
    if(!name||!email||!password||!dateOfBirth){
        res.json({
            Status : "Failed",
            message : "enter all input fields"
        })
    }else if(!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status : "FAILEd",
            message : "Invalid name entered"
        })
    }
    else if(! /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status : "FAILEd",
            message : "Invalid email entered"
        })
    }
    else if(!new Date(dateOfBirth).getTime()){
        res.json({
            status : "FAILEd",
            message : "Invalid DOB entered"
        })
    }
    else if(password.length < 8){
        res.json({
            status : "FAILEd",
            message : "Password is too sohort"
        })
    }
    else {
        // check if user alreadu exists
        user.find({email}).then( result => {
            if(result.length){
                // user already exists over this email
                res.json({
                    status : "failed",
                    message : "user with the provided email already exixts"
                })
            } else {
                // create new user 
                
                //pass handling 
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new user ({
                        name,
                        email,
                        password : hashedPassword,
                        dateOfBirth,
                        verified : false
                    })

                    newUser
                    .save()
                    .then(result => {
                        // res.json({
                        //     status : "Success",
                        //     message : "done creating user.",
                        //     date : result
                        // })

                        // handle email verification
                        sendVerificationEmail(result , res);

                    })
                    .catch(err => {
                        res.json({
                            status : "success",
                            message : " sign up succesfully done",
                            data : result
                        })
                    })
                })
                .catch(err => {
                    res.json({status : " Failed",
                    message : " an error ocured while creating passowrd"
                })
            })
        } } )
        .catch(err => {
            console.log(err)
            res.json({
                status : "failed",
                message : "an error occured while checking for exixteing email user"
            })
        })
    
    }

})

// email verification route
router.get("/verify/:id/:uniqueString" , (req, res) => {
    let {userId, uniqueString} = req.params;

    // check if user id exists in the verifiaction data
    Userverification
        .find(userId)
        .then((result) => {
            //console.log(result);
            if(result.length > 0){
                // user verification recoed exists
                const {expiresAt} = result[0];
                console.log(expiresAt);
                const hashedUniqueString = result[0].uniqueString;
                if(expiresAt < Date.now()){
                    // code is not valid anymore
                    Userverification.deleteOne({userId})
                        .then((result) => {
                            user.deleteOne({_id : userId})
                            .then(()=>{
                                let message = 'link expired please sign up again.';
                                res.redirect(`/user/verified/error=true&message=${message}`)

                            })
                        })
                        .catch((err) => {
                            let message = 'error occured while deleting the user verification part as link expired';
                            
                            //res.redirect(`/user/verified/error=true&message=${message}`)


                        })
                }
                else {
                    // link is still valid.
                    bcrypt.compare(uniqueString, hashedUniqueString)
                        .then((result) =>{
                            if(result){
                                // strings match
                                user.updateOne({_id : userId}, {verified : true})
                                    .then(() => {
                                        Userverification.deleteOne({userId})
                                            .then(() => {
                                                 res.redirect(`/user/verified`);

                                               // res.sendFile(path.join(__dirname, "./../views/verify.html"))
                                            })
                                    })
                                    .catch((err) => {
                                        let message = ' error occured while updating the user database.';
                                        //res.redirect(`/user/verified/error=true&message=${message}`)
                                        res.redirect(`user/verification/failed`)

                                    })
                            } else{
                                // no match i strings 
                                let message =  " invalid verification link , check ur inbox";
                                //res.redirect(`/user/verified/error=true&message=${message}`)
                                res.redirect(`user/verification/failed`)

                            }
                        })
                        .catch((err) => {
                            let message =  " error occured while comparing the unique strings ";
                             //res.redirect(`/user/verified/error=true&message=${message}`)
                            res.redirect(`user/verification/failed`)

                        })

                }
            }else {
                // user verification record doesnt exists maybe logged in or need to sign up.
                let message =  " user verification data does not exists , either already verified or need to sign up.";
                //res.redirect(`/user/verified/error=true&message=${message}`)
                res.redirect(`user/verification/failed`)

            }

        })
        .catch((error) => {
            console.log(error)
            let message =  " error occured while verifying  user data.";
            //res.redirect(`/user/verified/error=true&message=${message}`)
            res.redirect(`user/verification/failed`)
        })
})

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
router.post('/signin', (req, res)=>{
    let { email, password} = req.body;
    email = email.trim();
    password = password.trim();

    // check empty email or password
    if(!email||!password){
        res.json({
            status : " Failed",
            message : " Empty credentials supplied."
        })
    }
     else {
            // check if such user exists
            user.find({email})
            .then(data => {
                // user exists

                // chck if user is verified
                if(!data[0].verified){
                    res.json({
                        status : "failed",
                        message : "user is not verified sign up or send verf email again."
                    })
                }else{
                    const hashedPassword = data[0].password;
                    bcrypt.compare(password, hashedPassword) 
                    .then(result => {
                        // password match
                        if(result){
                            res.json({
                                status : "Success",
                                message : " signin successfull",
                                data : data
                            })
                        }
                        else {
                            res.json({
                                status : "Failed",
                                message : "Invalid Password entered"
                            })
                        }
                    })
                    .catch(err =>{
                        res.json({
                            status : "Failed",
                            message : "An error occued while comparing passowrds"
                        })
                    })
                }
                
                // else {
                //     res.json({
                //         status : "failed",
                //         message : "Invalid credential entered"
                //     })
                // }
            }
         )
    }
})

module.exports = router;
=======
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

// testing success
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('ready for messages');
    console.log(success);
  }
});

// ROUTES

// signup
router.post('/signup', async (req, res) => {
  try {
    await userSignUp(req, res);
  } catch (error) {
    res.status(500).json({
      status: 'failedd',
      message: 'An error occurred during signup',
      error: error.message,
    });
  }
});

// email verification route
router.get('/verify/:userId/:uniqueString', async (req, res) => {
  try {
    await userEmailVerification(req, res);
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'An error occurred during email verification',
      error: error.message,
    });
  }
});

// verified route
router.get('/verified', (req, res) => {
    try {
      res.sendFile(path.join(__dirname, '../views/verify.html'));
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'An error occurred during verification',
        error: error.message,
      });
    }
  });

// verification failed route
router.get('/verification/failed', (req, res) => {
    try {
      res.sendFile(path.join(__dirname, '../views/verificationFailed.html'));
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'An error occurred during verification failure handling',
        error: error.message,
      });
    }
  });

// signin
router.post('/signin', async (req, res) => {
  try {
    await userSignIn(req, res);
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'An error occurred during signin',
      error: error.message,
    });
  }
});

module.exports = router;
>>>>>>> 4b09633dbcafe4c4168b2157ac98cbd786a3d0ee
