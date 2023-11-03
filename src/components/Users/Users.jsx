import React from 'react';
import styles from "./Users.module.css";
import User from "./User/User";

const Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div>
      <div className={ styles.pagination }>
        {
          pages.map(page => <span
              className={
                props.currentPage === page ?
                  `${ styles.pagItem } ${ styles.selectedItem }` :
                  `${ styles.pagItem }`
              }
              key={ page }
              onClick={ () => props.setCurrentPage(page) }
            >
            { page }
          </span>
          )
        }
      </div>
      {
        props.users.length ?
          props.users.map(user => <User
              id={ user.id }
              fullName={ user.name }
              status={ user.status }
              photos={ user.photos }
              isFollow={ user.followed }
              followingInProgress={ props.followingInProgress }
              follow={ props.follow }
              unfollow={ props.unfollow }
              key={ user.id }
            />
          ) : ''
      }
    </div>
  );
};

export default Users;
