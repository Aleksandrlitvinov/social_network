import {profileAPI} from "../../api/profile-api.ts";
import {FormAction, stopSubmit} from "redux-form";
import {CommonThunkType, InferActionsTypes} from "../redux-store.ts";

const ADD_POST = 'ADD-POST'
const REMOVE_POST = 'REMOVE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS'
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO'


const initialState: InitialStateProfileType = {
  posts: [
    {
      id: 1,
      message: 'Hello, how are you?',
      likesCount: 11,
    },
    {
      id: 2,
      message: 'It is my first post',
      likesCount: 9,
    },
    {
      id: 3,
      message: 'Hello, where are you?',
      likesCount: 1,
    },
    {
      id: 4,
      message: 'It is my first job',
      likesCount: 23,
    }
  ],
  profile: null,
  status: '',
  newPostText: ''
}
const profileReducer = (state = initialState, action: ActionsTypes): InitialStateProfileType => {

  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        message: action.payload,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      }


    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.postId)
      }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    case SET_PROFILE_STATUS:
      return {
        ...state,
        status: action.status
      }

    case SET_PROFILE_PHOTO:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos
        }
      }

    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (payload: string) => ({type: ADD_POST, payload} as const),
  removePostActionCreator: (postId: number) => ({type: REMOVE_POST, postId} as const),
  setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
  setUserStatus: (status: string) => ({type: SET_PROFILE_STATUS, status} as const),
  setUserPhoto: (photos: PhotosType) => ({type: SET_PROFILE_PHOTO, photos} as const),
}

export const getProfileData = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId)

  dispatch(actions.setUserStatus(data))
}

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status)

  if (data.resultCode === 0) {
    dispatch(actions.setUserStatus(status))
  }
}

export const saveProfilePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.updatePhoto(file)

  if (data.resultCode === 0) {
    dispatch(actions.setUserPhoto(data.data.photos))
  }
}

export const updateProfileData = (updatedProfile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId
  let data = await profileAPI.updateProfile(updatedProfile)

  if (data.resultCode === 0) {
    if (userId !== null) {
      await dispatch(getProfileData(userId))
    } else {
      throw new Error('UserId can not be null!!!')
    }


  } else {
    dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
    return Promise.reject(data.messages[0])
  }
}
export default profileReducer;

export type PostType = {
  id: number,
  message: string,
  likesCount: number,
}

export type ContactsType = {
  facebook: string,
  website: string,
  vk: string,
  twitter: string,
  instagram: string,
  youtube: string,
  github: string,
  mainLink: string
}

export type PhotosType = {
  small: string | null,
  large: string | null
}

export type ProfileType = {
  userId: number | null
  aboutMe?: string
  lookingForAJob?: boolean
  lookingForAJobDescription?: string
  fullName?: string
  photos: PhotosType
  contacts: ContactsType
}

type InitialStateProfileType = {
  posts: PostType[],
  profile: ProfileType | null,
  status: string,
  newPostText: string
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes | FormAction>