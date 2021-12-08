import React from "react";
import { useAppContext } from "../lib/contextLib";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthenticatedRoutes() {
    const { isAuthenticated } = useAppContext()
    console.log(isAuthenticated)
    return (
        // <Route {...rest}>
        isAuthenticated ? <Outlet /> : (<Navigate to={`/login`}></Navigate>)
        // </Route>
    )
}