import * as React from 'react';
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader";
import {requestUsers, follow, unfollow, UserType, actions, FilterType} from "../../redux/reducers/users-reducer";
import {connect, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getCurrentPage, getIsFetching, getPageSize, getTotalUsersCount} from "../../redux/reducers/users-selectors.ts";

const {setCurrentPage} = actions

// type MapStatePropsType = {
//   users: UserType[],
//   pageSize: number,
//   totalUsersCount: number,
//   currentPage: number,
//   isFetching: boolean,
//   followingInProgress: number[]
//   filter: FilterType
// }

type MapDispatchPropsType = {
  setCurrentPage: (currentPage: number) => void,
  requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void
}


//export type PropsType = MapStatePropsType & MapDispatchPropsType
export const UsersPage: React.FC = () => {
  // const {
  //   //currentPage, pageSize, isFetching,
  //   users, followingInProgress,
  //   requestUsers, follow, unfollow, filter
  //} = props

  const isFetching = useSelector(getIsFetching)
  // const currentPage = useSelector(getCurrentPage)
  // const pageSize = useSelector(getPageSize)

  // const onPageChanged = (currentPage: number) => {
  //   requestUsers(currentPage, pageSize, filter)
  // }

  // const onFilterChanged = (filter: FilterType) => {
  //   requestUsers(1, pageSize, filter)
  // }

  // React.useEffect(() => {
  //   requestUsers(currentPage, pageSize, filter)
  // }, [])

  return (
    <>
      {
        isFetching ? <Preloader/> : <Users/>
      }
    </>
  )
}


// const mapStateToProps = (state: AppStateType): MapStatePropsType => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//     filter: state.usersPage.filter
//   }
// }
//
// export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
//   setCurrentPage,
//   requestUsers,
//   follow,
//   unfollow
// })(UsersContainer)

