import * as React from 'react';
import styles from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.png'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import UpdateProfileReduxForm from '../UpdateProfileForm/UpdateProfileForm';
import {ContactsType, ProfileType} from "../../../redux/reducers/profile-reducer.ts";
import {ChangeEvent} from "react";


type PropsType = {
  profile: ProfileType,
  isOwner: boolean,
  status: string,
  updateProfileStatus: (status: string) => void,
  saveProfilePhoto: (file: File) => void,
  updateProfileData: (profile: ProfileType) => Promise<any>
}
const ProfileInfo: React.FC<PropsType> = (props) => {

  const {profile, isOwner, status, updateProfileStatus, saveProfilePhoto, updateProfileData} = props
  const [editMode, setEditMode] = React.useState(false)
  const onClickEditData = () => {
    setEditMode(true)
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      saveProfilePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    // remove then
    updateProfileData(formData).then(() => {
      setEditMode(false)
    })
  }

  if (!profile) {
    return <>
      <Preloader/>
    </>
  }
  return (
    <div>
      <div>
        <img
          className={styles.wallpaper}
          src='https://media.istockphoto.com/id/163196980/it/foto/panorama-del-tramonto.jpg?s=612x612&w=0&k=20&c=9ootHunc7AgbKgQcl0x3AjQ_CB0-MnOm01ODxKHTJYk='
          alt="background"
        />
      </div>
      <div className={styles.profileBlock}>
        <div>
          <div className={styles.avatar}>
            <img
              src={profile.photos.large !== undefined || null ? profile.photos.large : userPhoto}
              alt="avatar!!"
            />
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
          </div>
          <ProfileStatus
            userId={profile.userId}
            status={status}
            updateProfileStatus={updateProfileStatus}
          />
        </div>
        <div>
          <div>
            {
              editMode
                ? <UpdateProfileReduxForm
                  profile={profile}
                  initialValues={profile}
                  onSubmit={onSubmit}
                />
                : <ProfileData
                  profile={profile}
                  isOwner={isOwner}
                  onClickEditData={onClickEditData}
                />
            }
          </div>
        </div>
      </div>
    </div>
  )
}


type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  onClickEditData: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, onClickEditData}) => {

  return (
    <div>
      <div>
        {
          isOwner && <button onClick={onClickEditData}>Edit</button>
        }
      </div>
      <div>
        <b>userId</b> - {profile.userId}
      </div>
      <div>
        <b>Looking for a job -</b> {profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {
        profile.lookingForAJob &&
        <div>
          <b>My skills</b> : {profile.lookingForAJobDescription}
        </div>
      }
      <div>
        <b>Name</b> - {profile.fullName}
      </div>
      <div>
        <b>My github</b> - {profile.contacts.github}
      </div>
      <div>
        <b>About me</b> - {profile.aboutMe}
      </div>

      {
        Object
          .keys(profile.contacts)
          .map((key) => {
            return <Contact
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
              key={key}
            />
          })
      }
    </div>
  )
}

type ContactPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
  return <div><b>{contactTitle}</b> - {contactValue}</div>
}

export default ProfileInfo
