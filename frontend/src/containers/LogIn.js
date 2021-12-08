import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Auth } from 'aws-amplify'
import { useAppContext } from '../lib/contextLib'
import { useNavigate } from "react-router";

export default function LogIn() {
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const { userHasAuthenticated } = useAppContext()
    const [isLoading,setIsLoading]=useState(false)
    const navigate = useNavigate()

    return (
        <Form className="w-50 m-auto">
            <Form.Group className="mb-3" controlId="Email">
                <Form.Label className="text-left d-block">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
                <Form.Label className="text-left d-block">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={LogIn}>
                {isLoading ? "Loading" : "Log In"}
            </Button>
        </Form>
    )

    async function LogIn(event) {
        event.preventDefault()
        setIsLoading(true)
        if (Email.length > 0 && Password.length > 0) {

            try {
                await Auth.signIn(Email, Password);
                // window.alert("success logged in")
                navigate("/")
                userHasAuthenticated(true)
                setIsLoading(false)
            } catch (e) {
                window.alert("err")
                setIsLoading(false)
            }

        } else {
            window.alert("Enter UserName or Password")
            setIsLoading(false)
        }
    }
}