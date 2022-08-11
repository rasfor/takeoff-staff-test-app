import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserType } from '../../redux/contactsReducer';
import Contact from './Contact/Contact';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NewContact from './NewContact/NewContact';



interface IProps {
  isAuthorized: boolean,
  contacts: Array<UserType>,
  logout: () => void,
  deleteContact: (id: number) => void
}

const Contacts: React.FC<IProps> = (props) => {

  const [isOpenNewContact, openNewContact] = useState(false);

  const onAddNewContact = () => {
    openNewContact(true)
  }
  const onLogout = () => {
    props.logout();
  }

  let userContacts = props.contacts.map((contact) => {
    return (
      <Col key={contact.id}>
        <Contact {...contact} deleteContact={props.deleteContact} />
      </Col>
    )
  })

  let isAuth = localStorage.getItem("isAuth");
  if (isOpenNewContact) return (<Navigate to='/newContact' />)
  if (!isAuth && !props.isAuthorized) return (<Navigate to='/login' />)
  else
    return (
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand >Contacts</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse >
              <Button variant="outline-primary" onClick={onAddNewContact}>Add new</Button>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Button variant="outline-primary" onClick={onLogout}>Log out</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Row xs={1} md={2} className="g-4">
          {userContacts}
        </Row>
      </div>
    )
}

export default Contacts;