import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
        </Switch>
      </main>
    </Router>
  )
};

export default App;

