import styles from "./Post.module.css"
import React from "react";

const Post = ({message, likes}) => {


  return (
    <div className={styles.post}>
      <div>
        <img
          src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
          alt=""/>
      </div>
      <div>
        {message}
        <div className={styles.likes}>
          <span>likes - {likes}</span>
        </div>
      </div>


    </div>
  )
}

export default Post