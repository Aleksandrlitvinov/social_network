import React from 'react'
import styles from "./Header.module.css"
import { Link } from "react-router-dom";
import axios from "axios";
import { logDOM } from "@testing-library/react";

const Header = (props) => {


  return (
    <header className={ styles.header }>
      <img className={ styles.headerImg } src="https://www.logodesign.net/logo/crossed-steel-pillars-2472ld.png?size=2"
           alt='logo'/>
      <div className={ styles.loginBlock }>
        {
          props.isAuth ?
            props.login :
            <Link to={ '/login' }>Login</Link>
        }
      </div>
    </header>
  )
}

export default Header