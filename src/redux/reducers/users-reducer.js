import { usersApi } from "../../api/api";

const UNFOLLOW = 'UNFOLLOW'
const FOLLOW = 'FOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_USERS_TOTAL_COUNT = 'SET-USERS-TOTAL-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 19,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
}


const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true}
          }
          return user
        })
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
        //followingInProgress: action.isFetching
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }

    default :
      return state

  }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_USERS_TOTAL_COUNT, totalUsersCount})
export const setIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
})



export const getUsers = (currentPage, pageSize) => {

  return (dispatch) => {

    dispatch(setIsFetching(true))

    usersApi.getUsers(currentPage, pageSize).then(data => {
      dispatch(setUsers(data.items))
      dispatch(setIsFetching(false))
      //this.props.setTotalUsersCount(response.data.totalCount)
    })

  }
}
export const follow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    usersApi.follow(id).then(data => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(id))
      }
      dispatch(toggleFollowingProgress(false, id))
    })
  }
}
export const unfollow = (id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, id))
    usersApi.unfollow(id).then(data => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(id))
      }
      dispatch(toggleFollowingProgress(false, id))
    })
  }
}
//export const
export default usersReducer