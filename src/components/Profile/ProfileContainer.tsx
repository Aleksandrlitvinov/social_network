import * as React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
  getProfileData,
  getProfileStatus,
  updateProfileStatus,
  saveProfilePhoto,
  updateProfileData, ProfileType
} from "../../redux/reducers/profile-reducer.ts"
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store.ts";


// type MapPropsType = {
//   authorizedUserId: number
//   isOwner: boolean
//   profile: ProfileType | null
//   status: string
// }
type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchProps = {
  getProfileData: (userId: number) => void
  getProfileStatus: (userId: number) => void
  updateProfileStatus: (status: string) => void
  saveProfilePhoto: (file: File) => void
  updateProfileData: (profile: ProfileType) => Promise<any>
}

type pathParamsType = {
  userId: string
}

type PropsType = MapPropsType & MapDispatchProps
const ProfileContainer: React.FC<PropsType> = (props) => {

  let userId: number | null = +useParams<pathParamsType>()

  React.useEffect(() => {

    if (!userId) {
      userId = props.authorizedUserId
    }

    if (!userId) {
      console.error('User ID should be exist')
    } else {
      props.getProfileData(userId)
      props.getProfileStatus(userId)
    }


  }, [userId]);

  return (

    <Profile
      isOwner={!userId}
      profile={props.profile}
      status={props.status}
      updateProfileStatus={props.updateProfileStatus}
      saveProfilePhoto={props.saveProfilePhoto}
      updateProfileData={props.updateProfileData}
    />
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getProfileData,
    getProfileStatus,
    updateProfileStatus,
    saveProfilePhoto,
    updateProfileData
  }),
  withAuthRedirect
)(ProfileContainer)
