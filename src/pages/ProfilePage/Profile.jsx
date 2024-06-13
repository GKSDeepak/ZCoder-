import React,{useContext} from 'react'
import styles from './Profile.module.css'
// import { useAuthContext } from '../../hooks/useAuthContext'
// import { useNavigate } from 'react-router-dom'
const Profile = () => {
  // const {userLogin,isEdit,updatedUser} = useAuthContext()
  // const navigate = useNavigate()
  return (
    
    
    
    <div className={styles.container}>
      <div className={styles.content}>
        {/* {
            !isEdit ? 
              <>
                <p>{userLogin.data.username}</p>
                <p>{userLogin.data.email}</p>
              </>
            :
              <>
                <p>{updatedUser.data.username}</p>
                <p>{updatedUser.data.email}</p>
              </>
        } */}
        
        {/* <div className="userInfo">
            <p>Username:dev</p>
            <p>Email: dev</p>
            <p>Email: dev</p>
            <p>Email: dev</p>
            <p>Email: dev</p> */}
            {/* <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Date of birth: {user.dob ? user.dob : "Date of Birth"}</p>
            <p>Teck stack: {user.teckStack ? user.teckStack : "TeckStack known" }</p>
            <p>Languages: {user.languages ? user.languages : "Languages known" }</p> */}
        {/* </div>
        <div className="ratings">

        </div>*/}
        {/* <button onClick={()=>navigate('/profile/edit')}className="edit">Edit Profile</button>  */}
      </div>
    </div>
  
  )
}

export default Profile
