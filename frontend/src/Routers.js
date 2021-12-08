import React from "react";
import { Route,Routes  } from "react-router-dom";
import Home from "./containers/Home";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import NewCourse from "./containers/NewCourse";
import CourseList from "./containers/CourseList";

export default function Routers(){
    return(
        <Routes >
            <Route path='/' element={<Home/>} />
                
            <Route path='/signup' element={<SignUp/>} />
                
            <Route path="/login" element={<LogIn/>}/>

            <Route path="/addCourse" element={<NewCourse/>}/>

            <Route path="/list" element={<CourseList/>}/>
        </Routes >
        
    )
}