import * as React from 'react';
import loader from "../../../assets/images/loading.gif";
import styles from "./Preloader.module.css"

const Preloader: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <img src={loader} alt="loader"/>
    </div>
  );
};

export default Preloader;
