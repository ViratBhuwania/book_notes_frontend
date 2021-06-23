import React, { useState } from 'react';

import { verifyEmail } from "../util/Api";
import { Form, Button, Card } from 'react-bootstrap';

const EmailVerify = () => {

    let path = window.location.pathname
    let url = path.split("/")
    let l = url.length;
    let token = url[l-1]

    function handleVerify(){
        
        verifyEmail(token)
            .then(response => {
                alert("Email verified successfully !!")
                //localStorage.setItem("ACCESS_TOKEN", response.access);

                
                
            }).catch(error => {
                alert("Something went wrong !!")
            });
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Click here to verify your email</h2>
                    <Button className="w-100" type ="submit" onClick={() => handleVerify()}>Verify</Button>
                        
                </Card.Body>
            </Card>
        </>
    )
};

export default EmailVerify;