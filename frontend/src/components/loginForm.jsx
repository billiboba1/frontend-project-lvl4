import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

export default () => (
  <div>
    <h2 className='text-center'>Войти</h2>
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Не должно быть пустым';
        } else if (!values.password) {
          errors.password = 'Не должно быть пустым';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ username: values.username, password: values.password});
        axios.post('/api/v1/login', { username: values.username, password: values.password}).then((response) => {
          console.log(response.data);
          localStorage.setItem(values.username, values.password);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className='m-1'>
          <div className="my-3">
            <Field className="form-control" type="username" name="username" placeholder="Ваш Ник"/>
            <ErrorMessage className="text-danger" name="username" component="div" />
          </div>
          <div className="my-3">
            <Field className="form-control" type="password" name="password" placeholder="Пароль"/>
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
    <label for="staticusername" class="col-sm-2 col-form-label">username</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticusername" value="username@example.com">
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