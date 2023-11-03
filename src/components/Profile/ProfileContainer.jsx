import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfileData } from "../../redux/reducers/profile-reducer"
import { Navigate, useParams } from "react-router-dom";

// class ProfileContainer extends React.Component {
//   componentDidMount() {
//     //this.props.setIsFetching(true)
//     axios.get(
//       `https://social-network.samuraijs.com/api/1.0/profile/2`)
//       .then(response => {
//         this.props.setUserProfile(response.data)
//         //this.props.setIsFetching(false)
//         //this.props.setTotalUsersCount(response.data.totalCount)
//       })
//   }
//
//   render() {
//     return (
//       <Profile { ...this.props } profile={ this.props.profile }/>
//     );
//   }
//
// }
function ProfileContainer(props) {
  let {userId} = useParams()
  if (!userId) {
    userId = 2
  }

  React.useEffect(() => {
    props.getProfileData(userId)
    // usersApi.getProfile(userId).then(response => {
    //   props.setUserProfile(response.data)
    // })
  }, [userId]);


  if (!props.isAuth) return <Navigate to={ "/login" }/>

  return (
    <Profile profile={ props.profile }/>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, {getProfileData})(ProfileContainer);
