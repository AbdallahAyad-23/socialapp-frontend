import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navbar =
    state.isAuth && state.user ? (
      <>
        <li>
          <NavLink to="/profile" className={styles.profile_link}>
            <img
              className={styles.profile_img}
              src={`https://firebasestorage.googleapis.com/v0/b/connect-324011.appspot.com/o/${state.user.imageUrl}?alt=media`}
              alt="profile_image"
            />
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => dispatch({ type: "LOGOUT" })}
            className={styles.logout_btn}
          >
            Logout
          </button>
        </li>
      </>
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
          <NavLink to={state.isAuth ? "/" : "#"}>Connect</NavLink>
        </div>
        <ul className={styles.navbar}>{navbar}</ul>
      </nav>
    </header>
  );
};

export default Navbar;
