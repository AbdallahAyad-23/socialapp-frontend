import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
