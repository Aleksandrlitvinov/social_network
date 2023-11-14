import * as React from 'react';
import styles from "./User.module.css"
import userPhoto from "../../../assets/images/user.png"
import {Link} from "react-router-dom";
import {UserType} from "../../../redux/reducers/users-reducer.ts";


type PropsType = {
  user: UserType
  followingInProgress: number[]
  follow: (id: number) => void
  unfollow: (id: number) => void
  isFollow: boolean
}

const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow, isFollow}) => {

  //const {id, photos, followingInProgress, follow, unfollow, fullName, status} = props
  return (
    <div className={styles.userBlock}>
      <div className={styles.left}>
        <div>
          <Link to={'/profile/' + user.id}>
            <img
              src={user.photos.small !== null || undefined ? user.photos.small : userPhoto}
              alt="userImg"/>
          </Link>
        </div>
        <div>
          {
            isFollow ?
              <button
                disabled={followingInProgress.some(id => id === id)}
                onClick={() => unfollow(user.id)}
              >
                Unfollow
              </button> :
              <button
                disabled={followingInProgress.some(id => id === id)}
                onClick={() => follow(user.id)}
              >
                Follow
              </button>
          }
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.userInfo}>
          <div>
            <p>{user.name}</p>
          </div>
          <div>
            <p>{user.status}</p>
          </div>
        </div>
        <div>
          <p>{'props.location.country'} , {'props.location.city'}</p>
        </div>
      </div>


    </div>
  )
    ;
};

export default User;
