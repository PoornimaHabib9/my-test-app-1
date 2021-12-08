import AWS from "aws-sdk"

let dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export async function getCourse(event){
    let courseId=event.pathParameters.id

    let params={
        TableName:process.env.TABLE_NAME,
        Key:{
            courseId:parseInt(courseId),
            userId:event.requestContext.authorizer.iam.cognitoIdentity.identityId
        }
    }
    // console.log(params,courseId)
    try{
        var result =  await dynamoDBClient.get(params).promise()
        return{
            statusCode:200,
            body:`Result is ${JSON.stringify(result)}`
        }
    }catch(e){
        return{
            statusCode:500,
            body:`Error is ${e}`
        }
    }
    
}