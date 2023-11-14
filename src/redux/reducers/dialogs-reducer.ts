import {InferActionsTypes} from "../redux-store.ts";

const SEND_MESSAGE = 'SEND-MESSAGE'

type MessageType = {
  id: number,
  text: string
}

type PersonType = {
  id: number,
  name: string,
  imgUrl: string
}

export type InitialStateDialogsType = {
  persons: PersonType[],
  messages: MessageType[]
}
const initialState: InitialStateDialogsType = {
  persons: [
    {
      id: 1,
      name: 'Sveta',
      imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4b1WaNo11P1XY5KRRfHu1OJSbuVJ0SjK-DrAklnuLEuvZ2BdQ5J74FmifNIftkKhzZbQ&usqp=CAU'
    },
    {
      id: 2,
      name: 'Dima',
      imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/332/small/ablack-man-avatar-character-isolated-icon-free-vector.jpg'
    },
    {
      id: 3,
      name: 'Yurii',
      imgUrl: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/427/small/man-avatar-character-isolated-icon-free-vector.jpg'
    },
    {
      id: 4,
      name: 'Andrey',
      imgUrl: 'https://as2.ftcdn.net/v2/jpg/02/23/50/73/1000_F_223507324_jKl7xbsaEdUjGr42WzQeSazKRighVDU4.jpg'
    }
  ],
  messages: [
    {id: 1, text: 'Hello'},
    {id: 2, text: 'How are you'},
    {id: 3, text: 'I am ok'}
  ]
}
const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateDialogsType => {
  //let stateCopy;
  switch (action.type) {

    case SEND_MESSAGE:
      let newMessage = {
        id: 4,
        text: action.payload
      }
      return {
        ...state,
        messages: [...state.messages, newMessage]
      }

    default:
      return state
  }
}
export const actions = {
  sendNewMessage: (payload: string) => ({
    type: SEND_MESSAGE,
    payload
  } as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>


export default dialogsReducer