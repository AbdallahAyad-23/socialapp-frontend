import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import { intialState, reducer, AuthContext } from "./store";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Home from "./pages/home/home";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (Date.now() <= jwtDecode(token).exp * 1000) {
        dispatch({ type: "intial", payload: { token } });
      }
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <Router>
          {/* {state.isAuth ? <Redirect to="/" /> : <Redirect to="/login" />} */}
          {state.isAuth && (
            <Route path="/">
              <Home />
            </Route>
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
