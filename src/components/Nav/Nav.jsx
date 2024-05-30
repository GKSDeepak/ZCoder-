import React,{useState}from 'react'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import './Nav.css'
const Nav = () => {
  const[menuOpen,setMenuOpen] = useState(false);
  return (
      <div className="nav-bar">
        <div className="logo">
          <h1>Zcoder</h1>
        </div>
        <div className="hamburger-menu" onClick={()=>{setMenuOpen(!menuOpen);}}>
          <a href="#" ><GiHamburgerMenu /></a>
        </div>
        
        <ul className={menuOpen?"open":""}>
          <li><NavLink to='/contests'>Contests</NavLink></li>
          <li><NavLink to='/practice'>Practice</NavLink></li>
          <li><NavLink to='/submissions'>Submissions</NavLink></li>
          <li><NavLink to='/bookmarks'>Bookmarks</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/signup'>Signup</NavLink></li>
        </ul>
          
        
      </div>

  )
}
export default Nav
