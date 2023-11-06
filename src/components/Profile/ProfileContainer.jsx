import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfileData } from "../../redux/reducers/profile-reducer"
import { useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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

const ProfileContainer = (props) => {
  let {userId} = useParams()
  if (!userId) {
    userId = 2
  }

  React.useEffect(() => {
    props.getProfileData(userId)
  }, [userId]);

  return (
    <Profile profile={ props.profile }/>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  }
}

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// export default connect(mapStateToProps, {getProfileData})(AuthRedirectComponent);

export default compose(
  connect(mapStateToProps, {getProfileData}),
  withAuthRedirect
)(ProfileContainer)
