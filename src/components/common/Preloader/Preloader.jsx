import React from 'react';
import loader from "../../../assets/images/loading.gif";
import styles from "./Preloader.module.css"

const Preloader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <img src={loader} alt="loader"/>
    </div>
  );
};

export default Preloader;
