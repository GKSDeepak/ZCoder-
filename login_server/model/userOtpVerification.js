const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userOtpVerificationSchema = new schema({
    userId : String,
    otp:String,
    createdAt : Date,
    expiresAt : Date,
})

const userOtpVerification = mongoose.model('userOtpVerification', userOtpVerificationSchema)

model.exports = userOtpVerification;