import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Contacts from './Contacts';


type mapStateToPropsType = {
  isAuthorized: boolean
}

const ContactsContainer: React.FC<mapStateToPropsType> = (props) => {
  return (
    <Contacts {...props} />
  )
}

let matchStateToProps = (state: AppStateType) => {
  return {
    isAuthorized: state.login.isAuthorized
  }
}

export default connect(matchStateToProps, {})(ContactsContainer);