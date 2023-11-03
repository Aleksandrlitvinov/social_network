import React from "react";
import Dialogs from "./Dialogs";
import {
  sendNewMessageActionCreator,
  updateNewMessageTextActionCreator
} from "../../redux/reducers/dialogs-reducer";
import { connect } from "react-redux";


// const DialogsContainer = (props) => {
//
//   const state = props.store.getState().dialogsPage
//
//   const onNewSendMessage = () => props.store.dispatch(sendNewMessageActionCreator())
//   const onNewChangeMessage = (body) => {
//     props.store.dispatch(updateNewMessageTextActionCreator(body))
//   }
//
//   return (
//     <Dialogs
//       dialogsPage={ state }
//       sendMessage={ onNewSendMessage }
//       updateNewMessageBody={ onNewChangeMessage }
//     />
//   )
// }

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageTextActionCreator(body))
    },
    sendMessage: () => {
      dispatch(sendNewMessageActionCreator())
    },
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer