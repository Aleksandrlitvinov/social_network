import React from "react";
import { Link } from "react-router-dom"
import styles from "./Dialog.module.css"

const Dialog = (props) => {
  return (
    <div className={styles.dialog}>
      <img className={styles.avatar} src={props.imgUser} alt="avatar"/>
      <Link
        to={`/dialogs/${props.id}`}
        className={`${styles.dialogName}`}
      >
        {props.name}
      </Link>
    </div>
  )
}

export default Dialog