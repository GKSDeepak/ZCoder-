import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser,FaLock } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import styles from './Signup.module.css'
const Signup = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    username:"",
    email:"",
    password:"",
  });
  const handleInput=(e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user,
      [name]:value,
    })
  };
  
  const handleSubmit=(e)=>{
    e.preventDefault();
   // console.log(user);
    navigate("/");
  };

  return (
    <section className={styles.sectionForm}>
      
      <div className={styles.signupContent}>
      <h1>Signup</h1>
        <form onSubmit={handleSubmit} action="">
          
          <div className={styles.inputBox}>
            {/* <label htmlFor="">username</label> */}
            <input name="username" className={styles.input} type="text"  placeholder='Username' required value={user.name} onChange={handleInput} />
            <FaUser className={styles.icon}/>
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">Email</label> */}
            <input name="email" className={styles.input} type="email" placeholder='Email' required value={user.email} onChange={handleInput} />
            <MdEmail className={styles.icon}/>
          </div>
          <div className={styles.inputBox}>
            {/* <label htmlFor="">Password</label> */}
            <input name="password" className={styles.input} type="password" placeholder='Password' required value={user.password} onChange={handleInput} />
            <FaLock className={styles.icon} />
          </div>
          <button type="submit" className={styles.signupButton}>Signup</button>
        </form>
      </div>
     
    </section>
  )
}

export default Signup
