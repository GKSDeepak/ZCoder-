import React from 'react'
import { FaUser,FaLock } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import styles from './Signup.module.css'
const Signup = () => {
  return (
    <section className={styles.sectionForm}>
      
      <div className={styles.signupContent}>
      <h1>Signup</h1>
        <form action="">
          
          <div className={styles.inputBox}>
            {/* <label htmlFor="">username</label> */}
            <input className={styles.input} type="text" name="username" placeholder='Username' required />
            <FaUser className={styles.icon}/>
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">Email</label> */}
            <input className={styles.input} type="email" placeholder='Email' required />
            <MdEmail className={styles.icon}/>
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">Password</label> */}
            <input className={styles.input} type="password" placeholder='Password' required />
            <FaLock className={styles.icon} />
          </div>
          <button type="submit" className={styles.signupButton}>Signup</button>
        </form>
      </div>
     
    </section>
  )
}

export default Signup
