import * as React from "react";
import Dialogs from './Dialogs'
import {actions} from '../../redux/reducers/dialogs-reducer'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from "../../redux/redux-store.ts";


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

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: (newMessageText: string) => {
//       dispatch(actions.sendNewMessage(newMessageText))
//     },
//   }
// }

//const AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
//
// export default DialogsContainer

export default compose<React.FC>(
  connect(mapStateToProps, {
    sendMessage: actions.sendNewMessage
  }),
  withAuthRedirect
)(Dialogs)