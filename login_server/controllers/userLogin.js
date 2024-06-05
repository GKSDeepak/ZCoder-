const user = require('../model/user')
const bcrypt = require('bcrypt');


  const userSignIn = async (req, res)=>{
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
}

module.exports = userSignIn