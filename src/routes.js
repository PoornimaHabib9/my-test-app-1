export default function routes() {
    return {
        "GET /getCourses": "src/getCourses.getCourses",
        "POST /course": "src/addCourse.addCourse",
        "GET /course/{id}": "src/getCourse.getCourse",
        "PUT /course/{id}": "src/updateCourse.updateCourse",
        "DELETE /course/{id}": "src/deleteCourse.deleteCourse",
    }
}