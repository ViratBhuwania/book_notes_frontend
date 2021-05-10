import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Dashboard from "./pages/Dashboard";
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
          <Route path="/login" exact>
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Login />
                  </div>
            </Container>
            
          </Route>
          <Route path="/signup" exact>
            <Container className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Signup />
                </div>
            </Container>
          </Route>

          

          <Route path="/forgotpassword" exact>
              <Container className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "100vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Forgot_password />
                  </div>
              </Container>
          </Route>

          <Route path="/reset-password-confirm/:uid/:token">
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Resetpasswordform />
                  </div>
            </Container>
          </Route>

          <Route path="/accounts/email-verify/:token">
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                  <EmailVerify />
                  </div>
            </Container>
          </Route>


        </Switch>
      </main>
    </Router>
    
  )
};

export default App;

