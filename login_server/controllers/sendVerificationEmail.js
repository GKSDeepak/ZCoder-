

export const sendVerificationEmail = ({_id, email}, res) => {
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