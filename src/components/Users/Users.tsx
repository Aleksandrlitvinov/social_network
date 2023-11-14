import * as React from 'react'
import User from './User/User'
import Paginator from '../common/Paginator/Paginator'
import {UserType} from '../../redux/reducers/users-reducer'
import {PhotosType} from "../../redux/reducers/profile-reducer";

type PropsType = {
  currentPage: number,
  setCurrentPage: (page: number) => void
  pageSize: number,
  totalUsersCount: number,
  isFetching: boolean
  users: UserType[],
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  followingInProgress: number[]
}

const Users: React.FC<PropsType> = (props) => {

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    totalUsersCount,
    users,
    follow,
    unfollow,
    followingInProgress
  } = props

  return (
    <div>
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        totalUsersCount={totalUsersCount}
      />
      {
        users.length ?
          props.users.map((u) => {
            return <User
              user={u}
              isFollow={u.followed}
              followingInProgress={followingInProgress}
              follow={follow}
              unfollow={unfollow}
              key={u.id}
            />
          }) : ''
      }
    </div>
  );
};

export default Users;
