import React from "react";

import { verifyEmail } from "../util/Api";

const EmailVerify = () => {

    function handleVerify(){
        
        verifyEmail(state)
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
                    <h2 className="text-center mb-4">Click on verify to verify your email</h2>
                    <Button className="w-100" type ="submit" onClick={() => handleVerify()}>Verify</Button>
                        
                </Card.Body>
            </Card>
        </>
    )
};

export default EmailVerify;