import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import NewCourse from "./containers/NewCourse";
import CourseList from "./containers/CourseList";
import AuthenticatedRoutes from "./components/authenticatedRoutes";

export default function Routers() {
    return (
        <Routes >
            <Route path='/' element={<AuthenticatedRoutes />}>
                <Route exact path="/" element={<Home />} />
            </Route>

            <Route path='/signup' element={<SignUp />} />

            <Route path="/login" element={<LogIn />} />

            <Route path='/addCourse' element={<AuthenticatedRoutes />}>
                <Route path="/addCourse" element={<NewCourse />} />
            </Route>

            <Route path='/addCourse/:id' element={<AuthenticatedRoutes />}>
                <Route path="/addCourse/:id" element={<NewCourse />} />
            </Route>

            <Route path='/list' element={<AuthenticatedRoutes />}>
                <Route path="/list" element={<CourseList />} />
            </Route>
        </Routes >

    )
}