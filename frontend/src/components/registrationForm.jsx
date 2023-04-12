import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { logIn } from '..';
import { useDispatch } from 'react-redux';

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
  <div>
    <h2 className='text-center'>Регистрация</h2>
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Не должно быть пустым';
        } else if (values.username.length < 3 || values.username.length > 20) {
          errors.password = 'От 3 до 20 символов';
        } else if (!values.password) {
          errors.password = 'Не должно быть пустым';
        } else if (values.password.length < 6) {
          errors.password = 'Не менее 6 символов';
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'Пароли должны совпадать';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ username: values.username, password: values.password});
        try {
          axios.post('/api/v1/signup', { username: values.username, password: values.password}).then((response) => {
            console.log(response.data);
            dispatch(logIn({ username: values.username, token: response.data.token }));
            localStorage.setItem(response.data, {token: response.data, username: values.username, password: values.password});
            navigate('/');
          });
        } catch (e) {
          navigate('/login');
        }
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
)};