import React, { useState } from "react";

import { Redirect, useHistory } from 'react-router-dom';
import CustomNavbar from '../common/Navbar'
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Card, Row, Col} from 'react-bootstrap';

const Dashboard = props => {
  if (!localStorage.getItem("ACCESS_TOKEN")) {
    return (<Redirect to={{ pathname: "/login" }} />)
  }
  var arr = [1, 2, 3, 4]
  return (

    <>

      <CustomNavbar />
      <Row>
      {arr.map(  () =>{
        return(<Col>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://picsum.photos/400" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
      </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        </Col>)
      })}
      

    </Row>
    </>
  )
}


export default Dashboard;