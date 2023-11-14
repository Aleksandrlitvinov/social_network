import styles from './Post.module.css'
import * as React from 'react';


type PropsType = {
  message: string
  likes: number
}
const Post: React.FC<PropsType> = ({message, likes}) => {


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