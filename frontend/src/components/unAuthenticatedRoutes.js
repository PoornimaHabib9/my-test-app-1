import React, { cloneElement } from "react";
import { useAppContext } from "../lib/contextLib";
import { Route, Navigate } from "react-router-dom";

export default function UnAuthenticatedRoutes(props) {
    const { isAuthenticated } = useAppContext()
    const { children, ...rest } = props;

    return (
        <Route {...rest}>
            {!isAuthenticated ? cloneElement(children,...rest) : (<Navigate to={`/`}></Navigate>)}
        </Route>
    )
}