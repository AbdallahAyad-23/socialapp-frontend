import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import "./App.css";
import { intialState, reducer, AuthContext } from "./store";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Users from "./pages/users/users";
import axios from "./utils/axios";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (Date.now() <= jwtDecode(token).exp * 1000) {
        dispatch({ type: "INTIAL", payload: { token } });
        axios.get("/user").then((res) => {
          console.log(res);
          const user = res.data;
          dispatch({ type: "SET_USER", payload: { user } });
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar />
          {/* {state.isAuth ? <Redirect to="/" /> : <Redirect to="/login" />} */}
          {state.isAuth && state.user && (
            <>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route path="/users" exact>
                <Users />
              </Route>
            </>
          )}

          {!state.isAuth && (
            <Route path="/signup">
              <Signup />
            </Route>
          )}

          {!state.isAuth && (
            <Route path="/login">
              <Login />
            </Route>
          )}
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
