import * as sst from "@serverless-stack/resources";
import { TableFieldType } from "@serverless-stack/resources";

export default class StorageStack extends sst.Stack{
    table;bucket;

    constructor(scope,id,props){
        super(scope,id,props)

        this.table=new sst.Table(this,"course",{
            fields:{
                courseId:sst.TableFieldType.NUMBER,
                userId:TableFieldType.STRING,
                courseName:sst.TableFieldType.STRING,
                courseDescription:sst.TableFieldType.STRING
            },
            primaryIndex:{partitionKey:"courseId"}
        })

        this.bucket = new sst.Bucket(this,"uploads")
    }
}