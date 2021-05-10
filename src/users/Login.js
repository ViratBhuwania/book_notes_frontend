import React, { Component } from "react";

import { login } from "../util/Api";
import { Link, withRouter } from 'react-router-dom';
import { current_user } from "../util/Api";

import { Form, Button, Card } from 'react-bootstrap';

class Auth extends Component {
    
    handle_current_user(){
        current_user()
            .then(response => {
              localStorage.setItem("user_name", JSON.stringify(response));
              const { history } = this.props;
                if(history) history.push('/');
              
          }).catch(error => {
              console.log(error.detail)
          });
    }

    handleSubmit() {
        login(this.state)
            .then(response => {
                console.log(response.access)
                localStorage.setItem("ACCESS_TOKEN", response.access);
                this.handle_current_user();
                
                
            }).catch(error => {
                console.log(error.detail)
            });
            
    }
    

    // .then(response =>
    //         response.json().then(json => {
    //             console.log(json)
    //             if (!response.ok) {
    //                 return Promise.reject(json);
    //             }
    //             return json;
    //         })
    //     )
        render(){
            return(
                <>
                    
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">LogIn</h2>
                    
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={(e)=>{ this.setState({email: e.target.value})}} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e)=>{ this.setState({password: e.target.value})}} required />
                        </Form.Group>
                        
                        <Button className="w-100" type ="submit" onClick={() => this.handleSubmit()}>Login</Button>
                        
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Forgot your password? <Link to="/forgotpassword">Reset</Link>
                </div>
                <div className="w-100 text-center mt-2">
                    Create an account? <Link to="/signup">Sign up</Link>
                </div>
                        
                    
                </>
            );
        
    
        }
    }


export default withRouter(Auth);