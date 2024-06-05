

export const userEmailVerification = async (req, res) => {
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
    }
