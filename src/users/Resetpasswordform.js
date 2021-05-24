import React, { useState } from "react";
import { Form, Button, Card } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import { newPassword } from "../util/Api";
import ButtonLoading from "../common/ButtonLoading";

const ResetPassword = props => {
    const [password, setNewPass] = useState("")
    const [confirm_password, setConfirmNewPass] = useState("")
    const [isLoading, setLoading] = useState(false);

    const history = useHistory();

    let path = window.location.pathname
    let url = path.split("/")
    let l = url.length;
    let uidb64 = url[l-2]
    let token = url[l-1]

    const handlenNewPassword = () =>{
        evt.preventDefault();
        let state = {password, confirm_password, uidb64, token}
        
        newPassword(state)
            .then(response => {
                setLoading(true);
                //localStorage.setItem("ACCESS_TOKEN", response.access);
                history.push('/login')
                
            }).catch(error => {
                setLoading(false);
                if (error.password){
                    alert("Ensure password has atleast 6 characters")
                }
                else if(error.msg){
                    alert("Password and confirm password does not match.")
                }
                else{
                    alert("Something went wrong!!!")
                }
                console.log(error.detail)
            });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Form onSubmit={handlenNewPassword}>
                        <Form.Group id="password-confirm">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value = {password} onChange={(e)=>setNewPass(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" value = {confirm_password} onChange={(e)=>setConfirmNewPass(e.target.value)} required />
                        </Form.Group>

                        <div className="text-center">
                            {isLoading ?
                                <ButtonLoading />
                            :<Button className="w-100" type ="submit">Confirm</Button>
                            }
                        </div>
                    </Form>
                </Card.Body>
                
            </Card>
        </>
    )
};

export default ResetPassword;