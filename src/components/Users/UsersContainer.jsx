import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { setCurrentPage, getUsers, follow, unfollow } from "../../redux/reducers/users-reducer";
import { connect } from "react-redux";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  };

  onPageChanged = (currentPage) => {
    this.props.setCurrentPage(currentPage)
    this.props.getUsers(currentPage, this.props.pageSize)
  }

  render() {
    return <>
      {
        this.props.isFetching ?
          <Preloader/> :
          <Users
            totalUsersCount={ this.props.totalUsersCount }
            pageSize={ this.props.pageSize }
            currentPage={ this.props.currentPage }
            setCurrentPage={ this.onPageChanged }
            users={ this.props.users }
            isFetching={ this.props.isFetching }
            followingInProgress={ this.props.followingInProgress }
            follow={ this.props.follow }
            unfollow={ this.props.unfollow }
          />
      }
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export default connect(mapStateToProps, {
  setCurrentPage,
  getUsers,
  follow,
  unfollow
})(UsersContainer)

