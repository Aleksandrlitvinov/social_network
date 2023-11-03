import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { setAuthUserData, getAuthUserData } from "../../redux/reducers/auth-reducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.getAuthUserData()
      // authApi.me(this.props.setAuthUserData)
      // .then(response => {
      //   if (response.data.resultCode === 0) {
      //     let {id, email, login} = response.data.data
      //     this.props.setAuthUserData(id, email, login)
      //   }
      // })
  }

  render() {
    return (
      <Header
        isAuth={ this.props.isAuth }
        login={ this.props.login }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData, getAuthUserData})(HeaderContainer)