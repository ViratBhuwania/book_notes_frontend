import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { password_reset } from "../util/Api";
import { Form, Button, Card } from 'react-bootstrap';

const Forgot_password = () => {
    const [email, setEmail] = useState("")
    const history = useHistory();
    
    function handlereset(){
        let state = {email}

        

        password_reset(state)
            .then(response => {
                console.log(response)
                //localStorage.setItem("ACCESS_TOKEN", response.access);
                
                
            }).catch(error => {
                console.log(error.detail)
            });
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value = {email} onChange={(e)=>setEmail(e.target.value)} required />
                    </Form.Group>

                    <Button className="w-100" type ="submit" onClick={() =>handlereset()}>Reset</Button>
                </Card.Body>
            </Card>
        </>
    )
};

export default Forgot_password;