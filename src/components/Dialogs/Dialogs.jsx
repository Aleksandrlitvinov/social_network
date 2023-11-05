import React from "react";
import styles from "./Dialogs.module.css"
import Dialog from "./Dialog/Dialog"
import Message from "./Message/Message";


const Dialogs = (props) => {

  const {persons, messages, newMessageText} = props.dialogsPage

  const onNewSendMessage = () => props.sendMessage()
  const onNewChangeMessage = (e) => {
    let text = e.target.value
    props.updateNewMessageBody(text)
  }

  return (
    <div className={ styles.dialogs }>
      <div className={ styles.dialogsItems }>
        { persons.map(user => <Dialog
            imgUser={ user.imgUrl }
            name={ user.name }
            id={ user.id }
            key={ user.id }
          />
        ) }
      </div>
      <div className={ styles.messages }>
        { messages.map(message => <Message
          key={ message.id }
          text={ message.text }
        />) }
        <div>
          <textarea
            placeholder='Enter your message'
            onChange={ onNewChangeMessage }
            value={ newMessageText }
          />
        </div>
        <button
          onClick={ onNewSendMessage }
        >
          Send message
        </button>
      </div>
    </div>
  )
}

export default Dialogs