import React from 'react';
import { Navigate } from "react-router-dom";

export const withAuthRedirect = (Component) => {

  return (props) => {
    if (!props.isAuth) return <Navigate to={ "/login" }/>
    return (
      <Component { ...props }/>
    );
  }
};
