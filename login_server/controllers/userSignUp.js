const user = require('../model/user');
const Userverification = require('../model/userVerification');
const bcrypt = require('bcrypt');
const  sendVerificationEmail  = require('./sendVerificationEmail');

const userSignUp = async (req, res) => {
  try {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    // Check if any field is empty
    if (!name || !email || !password || !dateOfBirth) {
      return res.json({
        status: "Failed",
        message: "Enter all input fields"
      });
    } else if (!/^[a-zA-Z\s]*$/.test(name)) { // Allow spaces in names
      return res.json({
        status: "Failed",
        message: "Invalid name entered"
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.json({
        status: "Failed",
        message: "Invalid email entered"
      });
    } else if (!new Date(dateOfBirth).getTime()) {
      return res.json({
        status: "Failed",
        message: "Invalid DOB entered"
      });
    } else if (password.length < 8) {
      return res.json({
        status: "Failed",
        message: "Password is too short"
      });
    } else {
      // Check if user already exists
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return res.json({
          status: "Failed",
          message: "User with the provided email already exists"
        });
      } else {
        // Password handling
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new user({
          name,
          email,
          password: hashedPassword,
          dateOfBirth,
          verified: false
        });

        const result = await newUser.save();
        sendVerificationEmail(result, res);
      }
    }
  } catch (err) {
    console.error(err);
    res.json({
      status: "Failed",
      message: "An error occurred during the sign-up process"
    });
  }
};

module.exports = userSignUp;
