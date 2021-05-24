import React, { useState } from "react";

import { useHistory } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

const CustomNavbar = props => {
  
    const history = useHistory();
    
    function handlelogout(){
      localStorage.clear();
      
      history.push('/login')
      
    }

    function handlelogin(){
        history.push('/login')       
      }
        
    let user1 = JSON.parse(localStorage.getItem('user_name'))
    if (user1 == undefined){
      history.push('/login')
    }
      
    return (
      
    <>  
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            
        {props.authenticated ? (
            <>

            <Button className="w-100" type ="submit" onClick={() => handlelogin()}>Login</Button>
            
            </>
        ):(
            <>
            
            <Nav.Link href="/profile">Profile</Nav.Link>
            
            <NavDropdown className="justify-content-end" title={user1.first_name} id="nav-dropdown" >
                <NavDropdown.Item onClick={() =>handlelogout()}>Logout</NavDropdown.Item>
            </NavDropdown>
             
            </>
        )}
            </Nav>
        </Navbar>
    </>
    )
}


export default CustomNavbar;