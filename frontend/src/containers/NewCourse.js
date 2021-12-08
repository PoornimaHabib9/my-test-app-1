import React, { useEffect, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useFormFields } from "../lib/hooksLib";
import { API } from 'aws-amplify'

export default function NewCourse() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [course, setCourse] = useState()
    const [fields, handleFieldsChange] = useFormFields({
        CourseName: (course && course.courseName) ? course.courseName : "",
        CourseDescription: (course && course.courseDescription) ? course.courseDescription : "",
    })

    useEffect(() => {
        function getCourse(id) {
            return API.get("course", `/course/${id}`)
        }

        async function onLoad() {
            setIsLoading(true)
            try {
                let result = await getCourse(id)
                setCourse(result)
                setIsLoading(false)
            }catch(e){
                setIsLoading(false)
            }
        }

        onLoad()
    }, [id])

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
            try {
                await createCourse()
                setIsLoading(false)
                window.alert("success")
                navigate('/')
            } catch (e) {
                setIsLoading(false)
                window.alert("Unable to insert")
            }
        } else {
            setIsLoading(false)
            window.alert("Enter input")
        }
    }

    function createCourse() {
        // console.log(API.post)
        return API.post("course", "/course", {
            body: {
                courseName: fields.CourseName,
                courseDescription: fields.CourseDescription,
            }
        })
    }
}