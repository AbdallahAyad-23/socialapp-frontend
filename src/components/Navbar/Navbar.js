import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { state } = useContext(AuthContext);
  const navbar = state.isAuth ? (
    <li>
      <NavLink to="/logout">Logout</NavLink>
    </li>
  ) : (
    <>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.nav_header}>
          <NavLink to="/">Connect</NavLink>
        </div>
        <ul className={styles.navbar}>{navbar}</ul>
      </nav>
    </header>
  );
};

export default Navbar;
