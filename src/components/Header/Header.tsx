import * as React from 'react'
import styles from './Header.module.css'
import {Link} from 'react-router-dom';


export type MapPropsType = {
  isAuth: boolean
  login: string | null

}

export type DispatchPropsType = {
  logout: () => void
}

export type PropsType = MapPropsType & DispatchPropsType
const Header: React.FC<PropsType> = (props) => {

  return (
    <header className={styles.header}>
      <img className={styles.headerImg} src="https://www.logodesign.net/logo/crossed-steel-pillars-2472ld.png?size=2"
           alt='logo'/>
      <div className={styles.authBlock}>
        <div className={styles.loginBlock}>
          {
            props.isAuth ?
              <div>{props.login}
                <Link to={'/login'}>
                  <button onClick={props.logout}>logout</button>
                </Link>
              </div> :
              <Link to={'/login'}>Login</Link>
          }
        </div>
      </div>
    </header>
  )
}

export default Header