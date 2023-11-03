import React from 'react';
import styles from "./User.module.css"
import userPhoto from "../../../assets/images/user.png"
import { Link } from "react-router-dom";


const User = (props) => {

  return (
    <div className={ styles.userBlock }>
      <div className={ styles.left }>
        <div>
          <Link to={ '/profile/' + props.id }>
            <img
              src={ props.photos.small !== null ? props.photos.small : userPhoto }
              alt="userImg"/>
          </Link>
        </div>
        <div>
          {
            props.isFollow ?
              <button
                disabled={ props.followingInProgress.some(id => id === props.id) }
                onClick={ () => props.unfollow(props.id) }
              >
                Unfollow
              </button> :
              <button
                disabled={ props.followingInProgress.some(id => id === props.id) }
                onClick={ () => props.follow(props.id) }
              >
                Follow
              </button>
          }
        </div>
      </div>
      <div className={ styles.right }>
        <div className={ styles.userInfo }>
          <div>
            <p>{ props.fullName }</p>
          </div>
          <div>
            <p>{ props.status }</p>
          </div>
        </div>
        <div>
          <p>{ 'props.location.country' } , { 'props.location.city' }</p>
        </div>
      </div>


    </div>
  )
    ;
};

export default User;
