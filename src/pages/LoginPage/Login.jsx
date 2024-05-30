import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser,FaLock } from "react-icons/fa"
// import './Login.css'
import styles from './Login.module.css'

const Login = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.sectionForm}>
      
        <div className={styles.wrapper}>
          <h1>LOGIN</h1>
          <form action="">
            <div className={styles.inputBox}>
              <input className={styles.input} type="text" placeholder='Username' required />
              <FaUser className={styles.icon}/>
            </div>
            <div className={styles.inputBox}>
              <input type="password" placeholder='Password' required />
              <FaLock className={styles.icon} />
            </div>
        
              <button type="submit" className={styles.loginButton} onClick={()=>navigate('/')}>Login</button>
            
            <div className={styles.registerLink}>
              <p>Don't have an account? <a href="./signup">Signup</a></p>
            </div>
          </form>
        </div>
       
    
     
    </section>
     
    
  )
}

export default Login

