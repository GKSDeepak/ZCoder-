

export const  userSignUp = async (req, res) => {
    
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

}