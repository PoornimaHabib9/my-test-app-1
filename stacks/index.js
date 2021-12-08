// import MyStack from "./MyStack";
import StorageStack from './StorageStack'
import ApiStack from "./ApiStack";
import AuthStack from './AuthStack';
import FrontEndStack from './FrontEndStack'

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  // new MyStack(app, "my-stack");

  var storageStack = new StorageStack(app, "storage-stack")

  var apiStack = new ApiStack(app, "api-stack", { table: storageStack.table })

  var authStack = new AuthStack(app, "auth-stack", {
    api: apiStack.api,
    bucket: storageStack.bucket
  })

  new FrontEndStack(app, "frontend-stack", { 
    api: apiStack.api, 
    auth: authStack.auth, 
    bucket: storageStack.bucket 
  })


  // Add more stacks
}
