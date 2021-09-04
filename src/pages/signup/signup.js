import React, { useState } from "react";
import Input from "../../components/Input/Input";
import styles from "./signup.module.css";
const Signup = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    setForm((prevForm) => ({ ...prevForm, [name]: e.target.value }));
  };
  return (
    <div className={styles.signup}>
      <form className={styles.signup_form}>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account!</p>
        <hr className={styles.break} />
        <Input
          placeholder="First Name"
          type="text"
          name="firstname"
          value={form.firstname}
          handleInputChange={handleInputChange}
        />
        <Input
          placeholder="Last Name"
          type="text"
          name="lastname"
          value={form.lastname}
          handleInputChange={handleInputChange}
        />
        <Input
          placeholder="Username"
          type="text"
          name="username"
          value={form.username}
          handleInputChange={handleInputChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          handleInputChange={handleInputChange}
        />
        <button className={styles.submit_button}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
