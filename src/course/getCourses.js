import AWS from "aws-sdk"

let dynamoDBClient = new AWS.DynamoDB.DocumentClient()
export async function getCourses(event) {
    // console.log(process.env.TABLE_NAME)
    let params={
        TableName:process.env.TABLE_NAME,
        Key:{
            userId:event.requestContext.authorizer.iam.cognitoIdentity.identityId
        }
    }

    try {
        var result = await dynamoDBClient.scan(params).promise()
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: `All Courses ${JSON.stringify(result)}`,
        };
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            headers: { "Content-Type": "text/plain" },
            body: `Error ${err}`,
        };
    }


}