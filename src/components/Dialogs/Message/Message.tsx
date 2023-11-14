import * as React from 'react';
import styles from './Message.module.css'

type PropsType = {
  text: string
}
const Message: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.message}>
      {props.text}
    </div>
  )
}

export default Message