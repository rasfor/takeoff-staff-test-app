import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  Formik,
  Form,
  Field
} from 'formik';

type componentProps = {
  id: number
  show: boolean,
  onClose: () => void,
  name: string,
  number: string
  updateContact: (id: number, data: object) => void
}

const EditContact: React.FC<componentProps> = (props) => {


  const id = props.id;

  const initialValues = {
    name: props.name,
    number: props.number
  }

  const onSubmit = (values: object) => {
    props.updateContact(id, values);
    props.onClose();
  }

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit contact</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onSubmit(values);
          }}
        >
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name:  </label>
                <Field type="name" name="name" placeholder="Name" />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="number"> Number:  </label>
                <Field type="number" name="number" placeholder="Number" />
              </div>
              <br />
              <div className="form-group">
                <button className="btn btn-primary" type="submit" >Save</button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default EditContact;