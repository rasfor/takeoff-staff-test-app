import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Contacts from './Contacts';
import { getUserContacts, UserType, deleteContact, addNewContact, updateContact } from '../../redux/contactsReducer';
import { logout } from '../../redux/loginReducer';

type mapStateToPropsType = {
  isAuthorized: boolean,
  contacts: Array<UserType>
}

type mapDispatchToProps = {
  getUserContacts: () => void,
  logout: () => void,
  deleteContact: (id: number) => void,
  addNewContact: (data: object) => void,
  updateContact: (id: number, data: object) => void
}

const ContactsContainer: React.FC<mapStateToPropsType & mapDispatchToProps> = (props) => {

  useEffect(() => {
    props.getUserContacts();
  }, [])

  return (
    <Contacts {...props} />
  )
}

let matchStateToProps = (state: AppStateType) => {
  return {
    isAuthorized: state.login.isAuthorized,
    contacts: state.contacts.contacts
  }
}

export default connect(matchStateToProps, { getUserContacts, logout, deleteContact, addNewContact, updateContact })(ContactsContainer);