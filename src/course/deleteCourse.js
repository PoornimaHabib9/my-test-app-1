import AWS from "aws-sdk"

let dynamoDBClient=new AWS.DynamoDB.DocumentClient()

export async function deleteCourse(event){
    let params={
        TableName:process.env.TABLE_NAME,
        Key:{
            courseId:event.pathParameters.id,
            userId:event.requestContext.authorizer.iam.cognitoIdentity.identityId
        }
    }

    try{
        await dynamoDBClient.delete(params).promise()
        return {
            statusCode:200,
            body:"delete course success"
        }

    }catch(e){
        return {
            statusCode:500,
            body:"delete course fail"
        }
    }
}