import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

interface redirectProps {
  isAuthorized: boolean;
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuthorized: state.login.isAuthorized
  }
}

export const WithAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {
  const RedirectComponent: React.FC<redirectProps> = (props) => {
    if (!props.isAuthorized) return <Navigate to='/login' />
    return <Component { ...props as P } />;
  }

  let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return ConnectedRedirectComponent;
}
