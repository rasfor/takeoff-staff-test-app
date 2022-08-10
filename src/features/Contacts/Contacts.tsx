import React from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  isAuthorized: boolean
}

const Contacts: React.FC<IProps> = (props) => {
  let isAuth = localStorage.getItem("isAuth");
  if (!isAuth && !props.isAuthorized) return (<Navigate to='/' />)
  else
    return (
      <div> Contacts</div>
    )
}

export default Contacts;