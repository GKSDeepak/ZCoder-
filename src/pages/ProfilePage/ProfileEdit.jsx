import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const ProfileEdit = () => {
  const {user} = useAuthContext()
  const [newUser,setNewUser] = useState({
    username:"",
    email:"",
    password:"",
    dob: "", // date of birth
    techStack: "", // tech stack
    languages: "" // languages known

    // username:user.username,
    // email:user.username,
    // password:user.username,
    // dob: user.username, // date of birth
    // techStack: user.username, // tech stack
    // languages: user.username // languages known
  })
  return (
    <div>
      
    </div>
  )
}

export default ProfileEdit
