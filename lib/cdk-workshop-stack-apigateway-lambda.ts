import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

export class CdkWorkshopStackApiGatewayAndLambda extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ////////////////////////////
    // api gatewayとlambda
    ////////////////////////////

    const hello = new lambda.Function(this, "helloHander", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: hello,
    });

    // new NodejsFunction(this, "MyFunction", {
    //   entry: "hello.file", // accepts .js, .jsx, .ts and .tsx files
    //   handler: "file.myExportedFunc",
    // });
  }
}
