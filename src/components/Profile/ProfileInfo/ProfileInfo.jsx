import React from "react";
import styles from "./ProfileInfo.module.css"
import userPhoto from "../../../assets/images/user.png"
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <>
      <Preloader/>
    </>
  }
  return (
    <div>
      <div>
        <img
          className={ styles.wallpaper }
          src='https://media.istockphoto.com/id/163196980/it/foto/panorama-del-tramonto.jpg?s=612x612&w=0&k=20&c=9ootHunc7AgbKgQcl0x3AjQ_CB0-MnOm01ODxKHTJYk='
          alt="background"
        />
      </div>
      <div className={ styles.profileBlock }>
        <div className={ styles.avatar }>
          <img
            src={ props.profile.photos.small !== null ? props.profile.photos.small : userPhoto }
            alt="avatar!!"
          />
        </div>
        <div>
          <p>Name - { props.profile.fullName }</p>
          <p>About me - { props.profile.aboutMe }</p>
          <p>About me - { props.profile.userId }</p>
          <p>My github - { props.profile.contacts.github }</p>
          <p>My twitter - { props.profile.contacts.twitter }</p>
          <p>My facebook - { props.profile.contacts.facebook }</p>
        </div>

      </div>

    </div>
  )
}

export default ProfileInfo