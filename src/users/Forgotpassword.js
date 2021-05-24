import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { password_reset } from "../util/Api";
import { Form, Button, Card } from 'react-bootstrap';
import ButtonLoading from "../common/ButtonLoading";

const Forgot_password = () => {
    const [email, setEmail] = useState("")
    const history = useHistory();
    const [isLoading, setLoading] = useState(false);
    
    const handlereset = (evt) =>{
        evt.preventDefault();
        let state = {email}
        setLoading(true);
        password_reset(state)
            .then(response => {
                // setLoading(false);
                alert("Password reset mail is sent to your registered mail id.")
                history.push('/login')
                
            }).catch(error => {
                setLoading(false);
                alert("No user found with this mail id.")
            });
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    <Form onSubmit={handlereset}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value = {email} onChange={(e)=>setEmail(e.target.value)} required />
                        </Form.Group>
                        <div className="text-center">
                            {isLoading ?
                                <ButtonLoading />
                            :<Button className="w-100" type ="submit">Reset</Button>
                            }
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
};

export default Forgot_password;