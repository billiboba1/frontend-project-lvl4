import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default () => (
  <div>
    <h2>Sign in</h2>
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
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='m-1 justify-content-center'>
          <div className="my-2 form-group row">
            <label for="email" className="col-sm-2 col-form-label">Email</label>
            <Field className="col-sm-10" type="email" name="email" placeholder="Email"/>
            <ErrorMessage className="col-form-label text-danger" name="email" component="p" />
          </div>
          <div className="my-2 form-group row">
            <label for="password" class="col-sm-2 col-form-label">Password</label>
            <Field className="col-sm-10" type="password" name="password" placeholder="Password"/>
            <ErrorMessage className="text-danger" name="password" component="p" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            Sign in
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