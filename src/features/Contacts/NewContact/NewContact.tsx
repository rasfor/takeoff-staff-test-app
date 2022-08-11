import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AppStateType } from '../../../redux/redux-store';
import { addNewContact } from '../../../redux/contactsReducer';
import {
  Formik,
  Form,
  Field
} from 'formik';


interface IProps {
  onSubmit: (formData: formDataType) => void,
}

type formDataType = {
  name: string,
  number: string
}

type mapStateToPropsType = {}

type mapDispatchToPropsType = {
  addNewContact: (payload: object) => void
}

const NewContact: React.FC<mapDispatchToPropsType & mapStateToPropsType> = (props) => {

  let navigate = useNavigate();

  let onSubmit = (formData: formDataType) => {
    props.addNewContact(formData);
    navigate("/", { replace: true });
  }

  return (
    <NewContactForm onSubmit={onSubmit} />
  )
}

const NewContactForm: React.FC<IProps> = ({ onSubmit }) => {

  const initialValues: formDataType = { name: '', number: '' };

  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  function validateNumber(value: string) {
    let error;
    if (!value) {
      error = 'Number is required';
    }
    return error;
  }

  return (
    <div>
      <h1>New Contact</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
      >
        {({
          isValid,
          errors,
          touched
        }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name: </label>
              <Field className={(touched.name && errors.name) ? 'form-control is-invalid' : 'form-control'}
                type="name" name="name" placeholder="Name" validate={validateName} />
            </div>
            <div className="form-group">
              <label htmlFor="number"> Number: </label>
              <Field className={(touched.number && errors.number) ? 'form-control is-invalid' : 'form-control'}
                type="number" name="number" placeholder="Number" validate={validateNumber} />
            </div>
            <br />
            <div className="form-group">
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              {errors.number && touched.number ? <div>{errors.number}</div> : null}
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit" disabled={!isValid}>Submit</button>
            </div>

          </Form>
        )}
      </Formik>
    </div>

  )
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {}
}

export default connect(mapStateToProps, { addNewContact })(NewContact);