import * as cdk from "@aws-cdk/core";
import * as apigw from "@aws-cdk/aws-apigateway";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";

export class CdkWorkshopStackTypescriptLambda extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ////////////////////////////
    // api gatewayとlambda(Typescript)
    ////////////////////////////

    const hello = new NodejsFunction(this, "NodejsFunction", {
      entry: "lambda/hello.ts",
      handler: "handler",
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: hello,
    });
  }
}
