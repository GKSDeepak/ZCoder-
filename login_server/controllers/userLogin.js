const user = require('../model/user');
const bcrypt = require('bcrypt');

const userSignIn = async (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    // Check for empty email or password
    if (!email || !password) {
        return res.json({
            status: "Failed",
            message: "Empty credentials supplied."
        });
    }

    try {
        // Check if user exists
        const data = await user.find({ email });
        if (data.length === 0) {
            return res.json({
                status: "Failed",
                message: "Invalid credentials supplied."
            });
        }

        // User exists
        const userData = data[0];

        // Check if user is verified
        if (!userData.verified) {
            return res.json({
                status: "Failed",
                message: "User is not verified. Please sign up or resend verification email."
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
            return res.json({
                status: "Success",
                message: "Signi successful",
                data: userData
            });
        } else {
            return res.json({
                status: "Failed",
                message: "Invalid password entered."
            });
        }
    } catch (error) {
        return res.json({
            status: "Failed",
            message: "An error occurred during signin.",
            error: error.message
        });
    }
};

module.exports = userSignIn;
