import React, { useState, useEffect } from 'react';

import { collegeList } from "../util/Api";
import { semesterSection } from "../util/Api";
import { createStudentProfile } from "../util/Api";
import { createTeacherProfile } from "../util/Api";
import { createClassTeacherProfile } from "../util/Api";
import { current_user } from "../util/Api";

import  CustomNavbar  from '../common/Navbar';
import "./Profile.css";
import { Card, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';


const Profile = () => {
    let user_info = JSON.parse(localStorage.getItem('user_name'))

    const [isTeacher, setTeacher] = useState(false);
    const [isStudent, setStudent] = useState(true);

    const [newCollege, setCollege] = useState("")
    const [newSemester, setSemester] = useState("")

    const [newList, setList] = useState([]);
    
    const[totalSections, setSection] = useState([]);

    const[selectSections, setSelectSection] = useState([]);

    const[branch, setBranch] = useState([]);
    
    const [isClassTeacher, setClassTeacher] = useState(false);

    const [isProfileRole, setProfileRole] = useState(false);

    function handleRegisterTeacher(){
        setTeacher(true);
        setStudent(false);
    }

    function handleRegisterStudent(){
        setStudent(true);
        setTeacher(false);
    }
    
    function handleClassTeacher(){
        setClassTeacher(!isClassTeacher)
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

        current_user()
            .then(response => {
                console.log(response)
                if (response.roles.length > 1){
                    setProfileRole(!isProfileRole)
                }
              
              
          }).catch(error => {
              console.log(error)
              alert(error.detail)
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
        console.log(newSemester)
        var totalSemesterSections = response[newSemester-1].sections
        var i
        for(i=0;i<totalSemesterSections;i++){
                
            sections.push(<option value={i} key={i}>{String.fromCharCode(i+65)}</option>);
        }
        setSection(sections);
        
    }


    const handleStudentSubmit = (evt) => {
        console.log("hi")
        evt.preventDefault();
        var user = user_info.id
        var college = parseInt(newCollege) + 1
        var semester = parseInt(newSemester)
        var section = String.fromCharCode(parseInt(selectSections)+65)
        let state = {branch, semester, section, college, user}
        console.log(state)
        
        // setLoading(true);
        

        
        createStudentProfile(state)
            .then(response => {
                alert(response.msg)
                //localStorage.setItem("ACCESS_TOKEN", response.access);
                // history.push('/login')
                
            }).catch(error => {
                console.log(error)
                alert(error.msg)
                //setLoading(false);
            });       
    }


    const handleTeacherSubmit = (evt) => {
        evt.preventDefault();
        var user = user_info.id
        var college = parseInt(newCollege) + 1
        let state = {branch, college, user}
        console.log(state)
        
        // setLoading(true);
        
        createTeacherProfile(state)
            .then(response => {
                alert(response.user)
                //localStorage.setItem("ACCESS_TOKEN", response.access);
                // history.push('/login')
                
            }).catch(error => {
                console.log(error)
                alert(error.msg)
                //setLoading(false); 
            });

            if (isClassTeacher){
                var semester = parseInt(newSemester)
                var section = String.fromCharCode(parseInt(selectSections)+65)
                let state = {semester, section, branch, college, user}
                console.log(state)
                createClassTeacherProfile(state)
                    .then(response => {
                        alert(response.user)
                        //localStorage.setItem("ACCESS_TOKEN", response.access);
                        // history.push('/login')
                        
                    }).catch(error => {
                        console.log(error)
                        alert(error.msg)
                        //setLoading(false); 
                    });
            }
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
            {isProfileRole ?
                <>
                 Name: {user_info.first_name} {user_info.last_name}<br />
                 Email: {user_info.email}
                </>    
        :
            
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
                
                <Form onSubmit = {handleTeacherSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user_info.first_name} {user_info.last_name}</span>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user_info.email}</span>
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
                            <Form.Control as="select" onChange={(e)=>{setBranch(e.target.value)}}>
                                <option>Select Branch</option>
                                <option>CSE</option>
                                <option>ISE</option>
                                <option>ECE</option>
                                <option>EEE</option>
                                <option>ME</option>
                            </Form.Control>
                    </Form.Group>
                        {/* <Form.Check type="checkbox" label="Are you a class teacher?" onClick={() => handleClassTeacher()}/> */}
                    
                    {isClassTeacher ?
                    <form>
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
                    </form>
                    :null
                    }
                    <Button className="w-100" type ="submit">Submit</Button>
                    </Form>
                    
                    
                
                    
                </Card.Body>
                </>
               
            :null}
            
            {isStudent?
            
            <>
            

                <Card.Header>Register as a Student.    <span class="register-teacher">Are you a teacher? Click Here </span>  </Card.Header>
                <Card.Body>
                
                <Form onSubmit = {handleStudentSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user_info.first_name} {user_info.last_name}</span>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <span class="input-group-text" id="basic-addon2">{user_info.email}</span>
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
                            <Form.Control as="select" onChange={(e)=>{setBranch(e.target.value)}}>
                                <option>Select branch</option>
                                <option>CSE</option>
                                <option>ISE</option>
                                <option>ECE</option>
                                <option>EEE</option>
                                <option>ME</option>
                            </Form.Control>
                    </Form.Group>
                    <Button className="w-100" type ="submit">Submit</Button>
                </Form>
                    
                    
                    
                    
                </Card.Body>
            </>
            :null}
        </Card> 
    }
        </>
    )
};

export default Profile;