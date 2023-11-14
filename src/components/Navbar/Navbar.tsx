import * as React from "react";
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";


const Navbar: React.FC = () => {

  return (
    <nav className={ styles.nav }>
      <div className={ styles.item }>
        <Link
          className={ styles.itemLink }
          to="/profile"
        >
          Profile
        </Link>
      </div>
      <div className={ styles.item }>
        <Link
          className={ styles.itemLink }
          to="/dialogs"
        >
          Messages
        </Link>
      </div>
      <div className={ styles.item }>
        <Link
          className={ styles.itemLink }
          to="/users"
        >
          Users
        </Link>
      </div>
      <div className={ styles.item }>
        <Link
          className={ styles.itemLink }
          to="/news"
        >
          News
        </Link>
      </div>
      <div className={ styles.item }>
        <Link
          className={ styles.itemLink }
          to="/music"
        >
          Music
        </Link>
      </div>
      <div className={ styles.item }>
        <Link
          className={ styles.itemLink }
          to="/settings"
        >
          Settings
        </Link>
      </div>
    </nav>
  )
}

export default Navbar