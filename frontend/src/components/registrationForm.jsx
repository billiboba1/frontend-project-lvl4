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
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'Пароли должны совпадать';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ username: values.username, password: values.password});
        axios.post('/api/v1/signup', { username: values.username, password: values.password}).then((response) => {
          console.log(response.data);
          localStorage.setItem('user', {token: response.data, username: values.username, password: values.password});
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="my-3">
            <Field className="form-control" type="username" name="username" placeholder="Имя Пользователя"/>
            <ErrorMessage className="text-danger" name="username" component="div" />
          </div>
          <div className="my-3">
            <Field className="form-control" id="password" type="password" name="password" placeholder="Пароль"/>
            <ErrorMessage className="text-danger" name="password" component="div" />
          </div>
          <div className="my-3">
            <Field className="form-control" id="confirmPassword" type="confirmPassword" name="confirmPassword" placeholder="Подтвердите Пароль"/>
            <ErrorMessage className="text-danger" name="confirmPassword" component="div" />
          </div>
          <button className="btn btn-outline-light w-100" type="submit" disabled={isSubmitting}>
            Зарегистрироваться 
          </button>
        </Form>
      )}
    </Formik>
  </div>
);