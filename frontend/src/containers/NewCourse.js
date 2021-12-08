import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useFormFields } from "../lib/hooksLib";
import { API } from 'aws-amplify'

export default function NewCourse() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [fields, handleFieldsChange] = useFormFields({
        CourseName: "",
        CourseDescription: ""
    })

    return (
        <div>
            <h1>Add or Update Course</h1>
            <Form>
                <Form.Group className="mb-3" controlId="CourseName">
                    <Form.Label className="text-left d-block">Course Name</Form.Label>
                    <Form.Control type="text" placeholder="Course Name" value={fields.CourseName} onChange={handleFieldsChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="CourseDescription">
                    <Form.Label className="text-left d-block">Course Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={fields.CourseDescription} onChange={handleFieldsChange} />
                </Form.Group>
                <Row className="mx-0">
                    <Button variant="primary" type="submit" onClick={addCourse}>
                        {isLoading ? "Loading.." : "Add/Update Course"}
                    </Button>
                    <Button variant="danger" className="ml-3" type="submit">
                        Cancel
                    </Button>
                </Row>
            </Form>
        </div>
    )

    async function addCourse(event) {
        event.preventDefault()
        setIsLoading(true)
        if (fields.CourseName.length > 0) {
            try{
                await createCourse()
                setIsLoading(false)
            }catch(e){
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
            window.alert("Enter input")
        }
    }

    function createCourse(){
        return API.post("course","/course",{
            body: {
                CourseName:fields.CourseName,
                CourseDescription:fields.CourseDescription,
                courseId:4
            }
        })
    }
}