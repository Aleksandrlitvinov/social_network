const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'


const initialState = {
  persons: [
    {
      id: '1',
      name: 'Sveta',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4b1WaNo11P1XY5KRRfHu1OJSbuVJ0SjK-DrAklnuLEuvZ2BdQ5J74FmifNIftkKhzZbQ&usqp=CAU'
    },
    {
      id: '2',
      name: 'Dima',
      imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small/ablack-man-avatar-character-isolated-icon-free-vector.jpg'
    },
    {
      id: '3',
      name: 'Yurii',
      imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/427/small/man-avatar-character-isolated-icon-free-vector.jpg'
    },
    {
      id: '4',
      name: 'Andrey',
      imgUrl: 'https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg'
    }
  ],
  messages: [
    {id: '1', text: 'Hello'},
    {id: '2', text: 'How are you'},
    {id: '3', text: 'I am ok'}
  ],
  newMessageText: ''
}
const dialogsReducer = (state = initialState, action) => {
  //let stateCopy;
  switch (action.type) {

    case SEND_MESSAGE:
      let newMessage = {
        id: '4',
        text: state.newMessageText
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageText: ''
      }
    //stateCopy.messages = [...state.messages]
    //stateCopy.messages.push(newMessage)
    //stateCopy.newMessageText = ''

    case UPDATE_NEW_MESSAGE_TEXT:

      return {
        ...state,
        newMessageText: action.textMessage
      }
    //stateCopy.newMessageText = action.textMessage

    default:
      return state
  }
}

export const sendNewMessageActionCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    textMessage: text
  }
}

export default dialogsReducer