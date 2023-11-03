import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";

const store = {

  _state: {
    profilePage: {
      posts: [
        {
          id: '1',
          message: 'Hello, how are you?',
          likesCount: 11,
        },
        {
          id: '2',
          message: 'It is my first post',
          likesCount: 9,
        },
        {
          id: '3',
          message: 'Hello, where are you?',
          likesCount: 1,
        },
        {
          id: '4',
          message: 'It is my first job',
          likesCount: 23,
        }
      ],
      newPostText: 'I am still alive !!!'
    },
    dialogsPage: {
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
    },
    sidebar: {}
  },
  _callSubscriber() {
    console.log('state was changed')
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)

    this._callSubscriber(this._state)

  }
}

export default store
