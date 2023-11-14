import * as React from 'react'
import styles from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Textarea} from '../common/FormsControls/FormsControls.tsx'
import {maxLengthCreator, requiredField} from '../../utils/validators.ts'
import {InitialStateDialogsType} from "../../redux/reducers/dialogs-reducer.ts";

const maxLength50 = maxLengthCreator(50)

type AddMessageFormPropsTypes = {
  newMessageText: string
}
const AddMessageForm: React.FC = (props: InjectedFormProps<AddMessageFormPropsTypes>) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newMessageText"
          validate={[requiredField, maxLength50]}
          placeholder='Enter your message'
        />
      </div>
      <button>Send message</button>
    </form>
  )
}

const AddMessageReduxForm = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

type DialogsPropsType = {
  dialogsPage: InitialStateDialogsType
  sendMessage: (newMessageText: string) => void
}
const Dialogs: React.FC = (props: DialogsPropsType) => {

  const {persons, messages} = props.dialogsPage

  const addNewMessage = (values: { newMessageText: string }) => {
    props.sendMessage(values.newMessageText)
  }

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {persons.map(user => <Dialog
            imgUser={user.imgUrl}
            name={user.name}
            id={user.id}
            key={user.id}
          />
        )}
      </div>
      <div className={styles.messages}>
        {messages.map(message => <Message
          key={message.id}
          text={message.text}
        />)}
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}

export default Dialogs