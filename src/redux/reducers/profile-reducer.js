import { profileAPI } from "../../api/api";
import profile from "../../components/Profile/Profile";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialState = {
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
  profile: null,
  newPostText: 'I am still alive !!!'
}
const profileReducer = (state = initialState, action) => {

  let stateCopy;

  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: '5',
        message: state.newPostText,
        likesCount: 0
      }

      stateCopy = {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      }
      return stateCopy

    case UPDATE_NEW_POST_TEXT:
      stateCopy = {
        ...state,
        newPostText: action.newText
      }
      //stateCopy.newPostText = action.newText
      return stateCopy
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_POST_TEXT,
    newText: text
  }
}
const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const getProfileData = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId).then(response => {
      dispatch(setUserProfile(response.data))
    })
  }
}
export default profileReducer;