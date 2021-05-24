import React, { useState, useEffect } from 'react';

import { collegeList } from "../util/Api";
import { semesterSection } from "../util/Api";

import  CustomNavbar  from '../common/Navbar';
import "./Profile.css";
import { Card, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';


const Profile = () => {
    let user = JSON.parse(localStorage.getItem('user_name'))

    const [isTeacher, setTeacher] = useState(false);
    const [isStudent, setStudent] = useState(true);

    const [newCollege, setCollege] = useState("")
    const [newSemester, setSemester] = useState("")

    const [newList, setList] = useState([]);
    
    const[totalSections, setSection] = useState([]);

    const[selectSections, setSelectSection] = useState([]);
    

    function handleRegisterTeacher(){
        setTeacher(true);
        setStudent(false);
    }

    function handleRegisterStudent(){
        setStudent(true);
        setTeacher(false);
    }
    
    


    var arr
    function handleCollegeList(){
        collegeList()
        .then(response => {
            
            localStorage.setItem("College_list", JSON.stringify(response));  
            
            var list = localStorage.getItem('College_list')
            list = JSON.parse(list)
            
            arr = []
            var i
            if(list != null){
            for(i=0;i<list.length;i++){
                
                arr.push(<option value={i} key={i}>{list[i].name}</option>);
            }
        }    
            setList(arr);
            
        }).catch(error => {
            alert("Something went wrong !!")
        });
    }

    useEffect(() => {
        handleCollegeList();
        
        
      }, [])

    
    

    function handleSection(){
        semesterSection(newCollege)
            .then(response => {
                localStorage.setItem("Section_Array", JSON.stringify(response));
                
            }).catch(error => {
                alert("Something went wrong !!")
            });
    }

    var sections = []
    function handleTotalSections(){
        var response = localStorage.getItem("Section_Array")
        
        response = JSON.parse(response)
        
        var totalSemesterSections = response[newSemester-1].sections
        var i
        for(i=0;i<totalSemesterSections;i++){
                
            sections.push(<option value={i} key={i}>{String.fromCharCode(i+65)}</option>);
        }
        setSection(sections);
        
    }

    
        
        const [radioValue, setRadioValue] = useState('1');
      
        const radios = [
          { name: 'Register as a Teacher', value: '2' },
        ];

        const radios1 = [
            { name: 'Register as a Student', value: '1' },
          ];
    
          

    return(
        
        <>
            <CustomNavbar />
                       
            
            <Card class="text-primary" border="primary" style={{ width: '46rem' }}>

      
        <ButtonGroup toggle>
            {radios1.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    onClick = {() => handleRegisterStudent()}
                >
                    {radio.name}
                </ToggleButton>
                ))}



                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    onClick = {() => handleRegisterTeacher()}
                >
                    {radio.name}
                </ToggleButton>
                ))}
      
        
      </ButtonGroup>
    



                

      {isTeacher ?
            <>
                <Card.Header>Register as a Teacher.    <span class="register-teacher">Are you a student?  </span>  </Card.Header>
                <Card.Body>
                
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user.first_name} {user.last_name}</span>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user.email}</span>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>College</Form.Label>
                            <Form.Control as="select" onChange={(e)=>setCollege(e.target.value)}>
                            <option>Select college</option>
                                {newList} 
                                {console.log(newCollege)}
                            </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Branch</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                    </Form.Group>
                    </Form>
                    
                    
                
                    
                </Card.Body>
                </>
               
            :null}
            
            {isStudent?
            
            <>
            

                <Card.Header>Register as a Student.    <span class="register-teacher">Are you a teacher? Click Here </span>  </Card.Header>
                <Card.Body>
                
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user.first_name} {user.last_name}</span>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user.email}</span>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>College</Form.Label>
                            <Form.Control as="select" onChange={(e)=>setCollege(e.target.value)}>
                            <option>Select college</option>
                                {newList} 
                                
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Semester</Form.Label>
                            <Form.Control as="select"  onChange={(e)=>{setSemester(e.target.value);handleSection()}}>
                                <option>Select Semester</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Section</Form.Label>
                            <Form.Control as="select" onClick={() => handleTotalSections()} onChange={(e)=>setSelectSection(e.target.value)}>
                                <option>Select section</option>
                                {totalSections}
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Branch</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                    </Form.Group>
                    </Form>
                    
                    
                    
                    
                </Card.Body>
            </>
            :null}
        </Card> 
        
        </>
    )
};

export default Profile;