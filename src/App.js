import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./users/Login";
import Signup from "./users/Signup";
import Forgot_password from "./users/Forgotpassword";
import Resetpasswordform from "./users/Resetpasswordform";
import EmailVerify from "./users/Emailverify"


const App = () => {
  
  return (

    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
              <Dashboard />
          </Route>

          <Route path="/profile" exact>
            <Profile />
          </Route>

          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>

              <Route path="/login" exact>
                <Login />
              </Route>

              <Route path="/signup" exact>
                <Signup />    
              </Route>

              <Route path="/forgotpassword" exact>
                <Forgot_password />
              </Route>

              <Route path="/reset-password-confirm/:uid/:token">
                <Resetpasswordform />
              </Route>

              <Route path="/activate/:token">
                <EmailVerify />
              </Route>

            </div>
          </Container>

        </Switch>
      </main>
    </Router>
    
  )
};

export default App;

