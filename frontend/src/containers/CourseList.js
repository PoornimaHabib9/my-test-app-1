import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useAppContext } from "../lib/contextLib";
import { API } from 'aws-amplify'

export default function CourseList() {
    const [courses, setCourses] = useState([])
    const { isAuthenticated } = useAppContext()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            return
        }

        async function getCourses() {
            setIsLoading(true)
            try {
                let list = await getList()
                setCourses(list)
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
            }
        }

        getCourses()
    }, [isAuthenticated])
    return (
        <div>
            {isLoading || (courses && courses.length === 0) ? <h3>Welcome to Course List</h3> : <>
                <ListGroup>
                    {courses.map(({ courseId, courseName, courseDescription }) => (
                        <ListGroup.Item action key={courseId} href={`/addCourse/${courseId}`}>
                            <h3>{courseName}</h3>
                            <p>{courseDescription}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </>}

        </div>
    )


    function getList() {
        return API.get('course', '/course')
    }
}