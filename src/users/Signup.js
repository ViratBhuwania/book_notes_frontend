import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signup } from "../util/Api";
import ButtonLoading from "../common/ButtonLoading";

import { Form, Button, Card } from 'react-bootstrap';

function Register(){
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    

    const history = useHistory();
    var loading = false;
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let state = {first_name, last_name, email, password, confirm_password}
        
        var loading = true
        
        signup(state)
            .then(response => {
                console.log(response)
                //localStorage.setItem("ACCESS_TOKEN", response.access);
                history.push('/login')
                
            }).catch(error => {
                alert("Something went wrong!!")
                
                loading = false
                
            });
            console.log(loading)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id="text">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value = {first_name} onChange={(e)=>setFirstName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group id="text">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="text" value = {last_name} onChange={(e)=>setLastName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value = {email} onChange={(e)=>setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value = {password} onChange={(e)=>setPassword(e.target.value)} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" value = {confirm_password} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                        </Form.Group>
                        <div className="text-center">
                            
                        {loading ?
                            <ButtonLoading />
                        :<Button className="w-100" type ="submit">Sign Up</Button>
                        }
                        </div>
                        </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
    }



export default Register;
