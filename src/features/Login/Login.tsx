import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { login } from '../../redux/loginReducer';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Formik,
  Form,
  Field
} from 'formik';


interface IProps {
  onSubmit: (formData: formDataType) => void,
  authError: string | null
}

type formDataType = {
  email: string,
  password: string
}

type mapStateToPropsType = {
  isAuthorized: boolean,
  authError: string | null
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
    <LoginForm onSubmit={onSubmit} authError={props.authError} />
  )
}

const LoginForm: React.FC<IProps> = ({ onSubmit, authError }) => {

  const initialValues: formDataType = { email: '', password: '' };

  if (authError) {
    alert(authError);
  }

  function validateEmail(value: string) {
    let error;
    if (!value) {
      error = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  function validatePassword(value: string) {
    let error;
    if (!value) {
      error = 'Password is required';
    }
    return error;
  }

  return (
    <div>
      <h1>Sign in</h1>
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
              <label htmlFor="email">Email: </label>
              <Field className={(touched.email && errors.email) ? 'form-control is-invalid' : 'form-control'}
                type="email" name="email" placeholder="Email" validate={validateEmail} />
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password: </label>
              <Field className={(touched.password && errors.password) ? 'form-control is-invalid' : 'form-control'}
                type="password" name="password" placeholder="password" validate={validatePassword} />
            </div>
            <br />
            <div className="form-group">
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
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
  return {
    isAuthorized: state.login.isAuthorized,
    authError: state.login.authError
  }
}

export default connect(mapStateToProps, { login })(Login);