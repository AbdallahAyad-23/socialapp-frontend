import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import validateForm from "../../utils/validateForm";
import styles from "./login.module.css";
const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    setForm((prevForm) => ({ ...prevForm, [name]: e.target.value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors) !== 0) setErrors(errors);
  };
  return (
    <div className={styles.login}>
      <form className={styles.login_form} onSubmit={handleFormSubmit}>
        <GoogleButton />
        <hr className={styles.hr_text} data-content="or" />
        <h1>Login</h1>
        <hr className={styles.break} />
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
        <button className={styles.submit_button}>Login</button>
        <Link to="/signup">Create New Account</Link>
      </form>
    </div>
  );
};

export default Login;
