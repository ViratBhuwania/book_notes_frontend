import React, { useState } from "react";

import { Redirect, useHistory } from 'react-router-dom';
import  CustomNavbar  from '../common/Navbar'
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';

const Dashboard = props => {
  if (!localStorage.getItem("ACCESS_TOKEN")){
    return (<Redirect to = {{pathname: "/login" }} />)
  }
    return (
      
      <>
      
        <CustomNavbar />
        
      </>
    )
}


export default Dashboard;