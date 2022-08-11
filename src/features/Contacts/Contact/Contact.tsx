import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { UserType } from '../../../redux/contactsReducer';
import CloseButton from 'react-bootstrap/CloseButton';
import EditContact from '../EditContact/EditContact';

type componentProps = {
  deleteContact: (id: number) => void,
  updateContact: (id: number, data: object) => void
}

const Contact: React.FC<UserType & componentProps> = (props) => {


  const [show, changeShow] = useState(false);

  const onDeleteContact = () => {
    props.deleteContact(props.id);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>
        <CloseButton onClick={onDeleteContact} />
      </Card.Header>
      <Card.Img src="https://i.pinimg.com/originals/6f/17/82/6f1782cc79ce91d0d16caab2270d24fc.jpg" />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Number: {props.number}
        </Card.Text>
        <EditContact show={show}
          id={props.id}
          name={props.name}
          number={props.number}
          updateContact={props.updateContact}
          onClose={() => changeShow(false)} />
        <Button variant="primary" onClick={() => changeShow(true)}>Edit</Button>
      </Card.Body>
    </Card>
  )
}

export default Contact;