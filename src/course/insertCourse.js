import AWS from "aws-sdk"
import * as uuid from "uuid";

const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export async function insertCourse(event) {
    var bodyData = JSON.parse(event.body)

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            courseId:uuid.v1(),
            userId:event.requestContext.authorizer.iam.cognitoIdentity.identityId,
            courseName:bodyData.courseName,
            courseDescription:bodyData.courseDescription
        }
    }
    console.log(params,"jskdhkjsdhkjsdh")
    try {
        await dynamoDBClient.put(params).promise()
        return {
            statusCode: 200,
            body: {success:true,message:"Successfully Inserted"}
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: {success:false,message:"Unable to insert. Please try again"}
        }
    }
}