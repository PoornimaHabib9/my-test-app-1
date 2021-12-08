import * as sst from '@serverless-stack/resources'

export default class ApiStack extends sst.Stack {
    api;

    constructor(scope, id, props) {
        super(scope, id, props)
        const {table} = props
        // console.log(table.tableName)
        this.api = new sst.Api(this, "Api", {
            defaultFunctionProps:{
                environment:{
                    TABLE_NAME:table.tableName
                }
            },
            cors:true,
            defaultAuthorizationType:"AWS_IAM",
            routes: {
                "GET /course": "src/course/getCourses.getCourses",
                "GET /course/{id}": "src/course/getCourse.getCourse",
                "POST /course": "src/course/insertCourse.insertCourse",
                "PUT /course/{id}": "src/course/updateCourse.updateCourse",
                "DELETE /course/{id}": "src/course/deleteCourse.deleteCourse"
            }
        })

        this.api.attachPermissions([table])

        this.addOutputs({
            "ApiEndpoint": this.api.url
        })
    }
}