import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

export default () => (
  <div>
    <h2 className='text-center'>Войти</h2>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ username: values.email, password: values.password});
        axios.post('/api/v1/login', { username: 'admin', password: 'admin' }).then((response) => {
          console.log(response.data);
        });
        axios.post('/api/v1/login', { username: values.email, password: values.password}).then((response) => {
          console.log(response.data);
          localStorage.setItem(values.email, values.password);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className='m-1'>
          <div className="my-3">
            <Field className="form-control" type="email" name="email" placeholder="Email"/>
            <ErrorMessage className="text-danger" name="email" component="div" />
          </div>
          <div className="my-3">
            <Field className="form-control" type="password" name="password" placeholder="Password"/>
            <ErrorMessage className="text-danger" name="password" component="div" />
          </div>
          <button className="btn btn-outline-light w-100" type="submit" disabled={isSubmitting}>
            Войти
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

/*
<form>
  <div class="form-group row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="Password">
    </div>
  </div>
</form>
*/