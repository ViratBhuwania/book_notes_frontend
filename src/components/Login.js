import React, { Component } from "react";

class Auth extends Component {
    login() {
        console.warn("state", this.state)
        fetch('http://localhost:8000/accounts/api/token/',{
            mode: 'no-cors',
            method: "POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
            })
        })
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
                <div>
                    <div>
                        Email: <input type="text" onChange={(e)=>{ this.setState({email: e.target.value})}} />
                        <br />
                        Password: <input type="text" onChange={(e)=>{ this.setState({password: e.target.value})}} />
                        <br />
                        <button onClick={() => this.login()}>Login</button>
                    </div>
                </div>
            );
        
    
        }
    }


export default Auth;