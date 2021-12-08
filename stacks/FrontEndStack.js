import * as sst from '@serverless-stack/resources'

export default class FrontEndStack extends sst.Stack {
    frontend;

    constructor(scope, id, props) {
        super(scope, id, props)

        const { api,auth,bucket } = props

        this.frontend = new sst.ReactStaticSite(this, "react-test", {
            path: "frontend",
            environment: {
                REACT_APP_API_URL: api.url,
                REACT_APP_REGION: scope.region,
                REACT_APP_BUCKET: bucket.bucketName,
                REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
                REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
                REACT_APP_USER_POOL_CLIENT_ID:
                    auth.cognitoUserPoolClient.userPoolClientId,
            }
        })

        this.addOutputs({
            SiteUrl: this.frontend.url
        })
    }
}