import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      "GET /getCourses": "src/getCourses.getCourses",
      "POST /course": "src/addCourse.addCourse",
      "GET /course/{id}": "src/getCourse.getCourse",
      "PUT /course/{id}": "src/updateCourse.updateCourse",
      "DELETE /course/{id}": "src/deleteCourse.deleteCourse",
    });

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
    });
  }
}
