import AWS from "aws-sdk"

const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export async function insertCourse(event) {
    var bodyData = JSON.parse(event.body)
    bodyData.userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: bodyData
    }

    try {
        await dynamoDBClient.put(params).promise()
        return {
            statusCode: 200,
            body: "Successfully Inserted"
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: "Unable to insert. Please try again"
        }
    }
}