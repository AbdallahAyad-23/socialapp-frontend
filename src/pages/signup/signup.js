import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input/Input";
import styles from "./signup.module.css";
import validateForm from "../../utils/validateForm";
const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  let history = useHistory();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const errors = validateForm(form);
    if (Object.keys(errors).length !== 0) return setErrors(errors);
    axios
      .post("http://localhost:5000/signup", form)
      .then((res) => history.push("/login"))
      .catch((err) => {
        const error = err.response.data.data;
        setErrors((prevErrors) => ({ ...prevErrors, ...error }));
      });
  };

  return (
    <div className={styles.signup}>
      <form className={styles.signup_form} onSubmit={handleFormSubmit}>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account!</p>
        <hr className={styles.break} />
        <Input
          placeholder="First Name"
          type="text"
          name="firstname"
          value={form.firstname}
          handleInputChange={handleInputChange}
          error={errors["firstname"]}
        />
        <Input
          placeholder="Last Name"
          type="text"
          name="lastname"
          value={form.lastname}
          handleInputChange={handleInputChange}
          error={errors["lastname"]}
        />
        <Input
          placeholder="Username"
          type="text"
          name="username"
          value={form.username}
          handleInputChange={handleInputChange}
          error={errors["username"]}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          handleInputChange={handleInputChange}
          error={errors["password"]}
        />
        <button className={styles.submit_button}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
