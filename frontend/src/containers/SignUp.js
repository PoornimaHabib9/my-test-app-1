import React, { useState } from "react";
import { Form, Button } from "react-bootstrap"
import { useAppContext } from "../lib/contextLib";
import { useFormFields } from "../lib/hooksLib";
import { Auth } from 'aws-amplify'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {
    const [fields, handleFieldsChange] = useFormFields({
        Email: "",
        Password: "",
        ConfirmPassword: "",
        ConfirmationCode: ""
    })

    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(null)
    const { userHasAuthenticated } = useAppContext()
    const [isLoading, setIsLoading] = useState(false)


    function renderSignUpForm() {
        return (
            <Form className="w-50 m-auto">
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label className="text-left d-block">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={fields.Email} onChange={handleFieldsChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label className="text-left d-block">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={fields.Password} onChange={handleFieldsChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ConfirmPassword">
                    <Form.Label className="text-left d-block">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={fields.ConfirmPassword} onChange={handleFieldsChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={VerifySignUp}>
                {isLoading?"Loading":"Sign Up"}
                </Button>
            </Form>
        )
    }

    function renderConfirmationForm() {
        return (
            <Form className="w-50 m-auto">
                <Form.Group className="mb-3" controlId="ConfirmationCode">
                    <Form.Label className="text-left d-block">Confirmation code</Form.Label>
                    <Form.Control type="text" placeholder="Enter confirmation code" value={fields.ConfirmationCode} onChange={handleFieldsChange} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={VerifyConfirmationCode}>
                    {isLoading?"Loading":"Submit"}
                </Button>
            </Form>
        )
    }

    return (
        <div>
            {newUser!==null ? renderConfirmationForm() : renderSignUpForm()}
        </div>
    )


    async function VerifySignUp(event) {
        event.preventDefault()
        setIsLoading(true)
        if (fields.Email.length > 0 && fields.Password.length > 0 && fields.ConfirmPassword === fields.Password) {
            let user = await Auth.signUp({ username: fields.Email, password: fields.Password })
            setIsLoading(false)
            setNewUser(user)
        } else {
            window.alert("Input values")
            setIsLoading(false)
        }
    }

    async function VerifyConfirmationCode(event) {
        event.preventDefault()
        setIsLoading(true)
        if (fields.ConfirmPassword.length > 0) {
            await Auth.confirmSignUp(fields.Email,fields.ConfirmationCode)
            await Auth.signIn(fields.Email,fields.Password)
            userHasAuthenticated(true)
            navigate("/")
            setIsLoading(false)
        } else {
            window.alert("Input values")
            setIsLoading(false)
        }
    }
}