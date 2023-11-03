import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { Navigate } from "react-router-dom";

const Profile = (props) => {


  return (
    <main>
      <ProfileInfo profile={ props.profile }/>
      <MyPostsContainer/>
    </main>
  )
}

export default Profile