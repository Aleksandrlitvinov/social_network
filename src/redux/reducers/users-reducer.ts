import {usersApi} from '../../api/users-api.ts';
import {PhotosType} from './profile-reducer.ts';
import {CommonThunkType, InferActionsTypes} from '../redux-store.ts';
import {Dispatch} from 'redux';

const UNFOLLOW = 'UNFOLLOW'
const FOLLOW = 'FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState: initialStateUsersType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}


const usersReducer = (state = initialState, action: ActionsTypes): initialStateUsersType => {

  switch (action.type) {
    case FOLLOW :
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true}
          }
          return user
        })
        //updateObjectInArray(state.users, action.userId, "id", {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false}
          }
          return user
        })
        //updateObjectInArray(state.users, action.userId, "id", {followed: false})
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case SET_USERS: {
      return {
        ...state,
        users: action.users
      }
    }
    case SET_USERS_TOTAL_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default :
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
  unfollowSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
  setUsers: (users: UserType[]) => ({type: SET_USERS, users} as const),
  setCurrentPage: (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const),
  setTotalUsersCount: (totalUsersCount: number) => ({type: SET_USERS_TOTAL_COUNT, totalUsersCount} as const),
  setIsFetching: (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
  } as const)
}

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
  dispatch(actions.setIsFetching(true))
  dispatch(actions.setCurrentPage(currentPage))

  let data = await usersApi.getUsers(currentPage, pageSize)
  dispatch(actions.setUsers(data.items))
  dispatch(actions.setTotalUsersCount(data.totalCount))
  dispatch(actions.setIsFetching(false))
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   id: number, apiMethod: any,
                                   actionCreator: (id: number) => ActionsTypes) => {

  dispatch(actions.toggleFollowingProgress(true, id))
  let response = await apiMethod(id)
  if (response.resultCode === 0) {
    dispatch(actionCreator(id))
  }
  dispatch(actions.toggleFollowingProgress(false, id))
}
export const follow = (id: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = await usersApi.follow.bind(usersApi)
    await _followUnfollowFlow(dispatch, id, apiMethod, actions.followSuccess)
  }
}
export const unfollow = (id: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersApi.unfollow.bind(usersApi)
    await _followUnfollowFlow(dispatch, id, apiMethod, actions.unfollowSuccess)
    // dispatch(toggleFollowingProgress(true, id))
    // let response = await apiMethod(id)
    // if (response.resultCode === 0) {
    //   dispatch(actionCreator(id))
    // }
    // dispatch(toggleFollowingProgress(false, id))
  }
}
//export const
export default usersReducer

export type UserType = {
  id: number,
  name: string
  photos: PhotosType,
  followingInProgress: [],
  follow: boolean,
  unfollow: boolean,
  fullName: string,
  status: string,
  followed: boolean
}
type FollowingInProgressType = number[] // users id's
export type initialStateUsersType = {
  users: UserType[],
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  followingInProgress: FollowingInProgressType | []
}

type DispatchType = Dispatch<ActionsTypes>
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>