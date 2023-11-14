import React from 'react';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";



const mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}


export function withAuthRedirect(Component) {
  const RedirectComponent = (props) => {
    let {isAuth, ...restProps} = props

    if (!isAuth) return <Navigate to={ "/login" }/>

    return <Component { ...restProps }/>

  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent)
}
