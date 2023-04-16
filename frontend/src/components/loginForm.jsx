import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import mainSlice from '..';
import { logIn } from '..';

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='w-100'>
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
          axios.post('/api/v1/login', { username: values.username, password: values.password }).then((response) => {
            dispatch(logIn({ username: values.username, token: response.data.token }));
            localStorage.setItem(response.data.token, values.username);
            navigate('/');
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="my-3">
              <Field className="form-control" type="username" name="username" placeholder="Имя Пользователя" />
              <ErrorMessage className="text-danger" name="username" component="div" />
            </div>
            <div className="my-3">
              <Field className="form-control" type="password" name="password" placeholder="Пароль" />
              <ErrorMessage className="text-danger" name="password" component="div" />
            </div>
            <button className="btn btn-light w-100" type="submit" disabled={isSubmitting}>
              Войти
            </button>
          </Form>
        )}
      </Formik>
      <button className="btn btn-outline-light my-3 form-control w-100" type="button" onClick={() => {
        navigate('/registration');
      }}>Зарегистрироваться</button>
    </div >
  )
}
