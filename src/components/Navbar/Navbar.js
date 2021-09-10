import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navbar = state.isAuth ? (
    <li>
      <button
        onClick={() => dispatch({ type: "logout" })}
        className={styles.logout_btn}
      >
        Logout
      </button>
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
    <header className={styles.header}>
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
