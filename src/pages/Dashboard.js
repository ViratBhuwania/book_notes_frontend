import React, { useState } from "react";

import { useHistory } from 'react-router-dom';

import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

const Dashboard = props => {
  
    const history = useHistory();
    
    function handlelogout(){
      localStorage.clear();
      history.push('/login')
      
    }
        
        let user1 = JSON.parse(localStorage.getItem('user_name'))
        if (user1 == undefined){
          history.push('/login')
        }
      console.log(typeof(user1))
      console.log(user1.first_name)
    return (
      
      <>
      
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
        <Form>
            <NavDropdown title="{user1.first_name}" id="nav-dropdown" className="justify-content-end" >
                <NavDropdown.Item onClick={() =>handlelogout()}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Form>
        
      </Navbar>
    </>
    )
}


export default Dashboard;