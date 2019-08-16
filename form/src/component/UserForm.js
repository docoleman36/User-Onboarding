import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (
    <div className="Form">
      <Form>
        <Field
          type="text"
          name="name"
          placeholder="Name"
        />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field
          type="text"
          name="email"
          placeholder="Email"
        />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field
          type="text"
          name="password"
          placeholder="Password"
        />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <label className="checkbox-container">
          Terms and Conditions
        <Field
            type="checkbox"
            name="terms"
            checked={values.terms}
          />
          <span className="checkmark" />
        </label>
        <button type="submit">Submit!</button>
      </Form>
      {user.map(users => (
        <p key={users.id}>{users.name}</p>
      ))}
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please write your name"),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log("handleSubmit: then: res: ", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error("handleSubmit: catch: err: ", err));
  }
});

const UserFormWithFormik = formikHOC(UserForm);

export default UserFormWithFormik;  