import React, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';

import { newPassword } from "../util/Api";

const ResetPassword = props => {
    const [password, setNewPass] = useState("")
    const [confirm_password, setConfirmNewPass] = useState("")

    let path = window.location.pathname
    let url = path.split("/")
    let l = url.length;
    let uidb64 = url[l-2]
    let token = url[l-1]

    function handlenNewPassword(){
        let state = {password, confirm_password, uidb64, token}
        
        newPassword(state)
            .then(response => {
                console.log(response)
                //localStorage.setItem("ACCESS_TOKEN", response.access);
                history.push('/login')
                
            }).catch(error => {
                console.log(error.detail)
            });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form.Group id="password-confirm">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" value = {password} onChange={(e)=>setNewPass(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group id="password-confirm">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" value = {confirm_password} onChange={(e)=>setConfirmNewPass(e.target.value)} required />
                    </Form.Group>

                    <Button className="w-100" type ="submit" onClick={() =>handlenNewPassword()}>Confirm</Button>
                </Card.Body>
                
            </Card>
        </>
    )
};

export default ResetPassword;