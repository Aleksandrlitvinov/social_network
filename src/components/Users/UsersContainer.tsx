import * as React from 'react';
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader";
import {requestUsers, follow, unfollow, UserType, actions} from "../../redux/reducers/users-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

const {setCurrentPage} = actions

type MapStatePropsType = {
  users: UserType[],
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  followingInProgress: number[]
}

type MapDispatchPropsType = {
  setCurrentPage: (currentPage: number) => void,
  requestUsers: (currentPage: number, pageSize: number) => void,
  follow: (userId:number) => void,
  unfollow: (userId:number) => void
}


export type PropsType = MapStatePropsType & MapDispatchPropsType
const UsersContainer: React.FC = (props: PropsType) => {

  const {
    currentPage, pageSize, isFetching,
    totalUsersCount, users, followingInProgress,
    requestUsers, follow, unfollow
  } = props
  const onPageChanged = (currentPage: number) => {
    requestUsers(currentPage, pageSize)
  }

  React.useEffect(() => {
    requestUsers(currentPage, pageSize)
  }, [])

  return (
    <>
      {
        isFetching
          ? <Preloader/>
          : <Users
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            setCurrentPage={onPageChanged}
            users={users}
            isFetching={isFetching}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
      }
    </>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
  setCurrentPage,
  requestUsers,
  follow,
  unfollow
})(UsersContainer)

