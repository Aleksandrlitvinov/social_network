import * as React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/reducers/profile-reducer.ts";

type PropsType = {
  profile: ProfileType | null,
  isOwner: boolean,
  status: string,
  updateProfileStatus: (status: string) => void,
  saveProfilePhoto: (file: File) => void,
  updateProfileData: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {

  return (
    <main>
      <ProfileInfo
        profile={props.profile}
        isOwner={props.isOwner}
        status={props.status}
        updateProfileStatus={props.updateProfileStatus}
        saveProfilePhoto={props.saveProfilePhoto}
        updateProfileData={props.updateProfileData}
      />
      <MyPostsContainer/>
    </main>
  )
}

export default Profile