import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { login } from '../../redux/loginReducer';
import { Navigate } from 'react-router-dom';
import {
  Formik,
  Form,
  Field
} from 'formik';


interface IProps {
  onSubmit: (formData: formDataType) => void;
}

type formDataType = {
  email: string,
  password: string
}

type mapStateToPropsType = {
  isAuthorized: boolean
}

type mapDispatchToPropsType = {
  login: (payload: object) => void
}

const Login: React.FC<mapDispatchToPropsType & mapStateToPropsType> = (props) => {

  let onSubmit = (formData: formDataType) => {
    props.login(formData);
  }

  if (props.isAuthorized) return (<Navigate to="/contacts" />)
  return (
    <LoginForm onSubmit={onSubmit} />
  )
}

const LoginForm: React.FC<IProps> = ({ onSubmit }) => {

  const initialValues: formDataType = { email: '', password: '' };

  return (
    <div>
      <h1>Sign in</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSubmit(values);
        }}
      >
        <Form>
          <label htmlFor="email">Email: </label>
          <Field id="email" name="email" placeholder="Email" />
          <label htmlFor="password"> Password: </label>
          <Field id="password" name="password" placeholder="password" />
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>

  )
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    isAuthorized: state.login.isAuthorized
  }
}

export default connect(mapStateToProps, { login })(Login);