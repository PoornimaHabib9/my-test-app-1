import AWS from 'aws-sdk'

let dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export async function updateCourse(event){
    let bodyData=JSON.parse(event.body)
    let params={
        TableName:process.env.TABLE_NAME,
        Key:{
            courseId:parseInt(event.pathParameters.id),
            userId:event.requestContext.authorizer.iam.cognitoIdentity.identityId
        },
        UpdateExpression:"SET courseName=:courseName,courseDescription=:courseDescription",
        ExpressionAttributeValues:{
            ":courseName":bodyData.courseName,
            ":courseDescription":bodyData.courseDescription
        },
        ReturnValues:null
    }
    try{
        await dynamoDBClient.update(params).promise()
        return {
            statusCode:200,
            body:"Update Success"
        }
    }catch(err){
        return {
            statusCode:500,
            body:"Update Error"
        }
    }
    
} 