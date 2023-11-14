import * as React from 'react'
import Header, {PropsType, MapPropsType, DispatchPropsType} from './Header'
import {connect} from 'react-redux'
import {logout} from '../../redux/reducers/auth-reducer.ts'
import {AppStateType} from '../../redux/redux-store.ts'


class HeaderContainer extends React.Component<PropsType> {

  render() {
    return (
      <Header
        isAuth={this.props.isAuth}
        login={this.props.login}
        logout={this.props.logout}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
})

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps, {logout})(HeaderContainer)