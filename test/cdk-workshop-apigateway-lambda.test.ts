import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as CdkWorkshop from "../lib/cdk-workshop-stack-apigateway-lambda";

test("Lambda Function Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStackApiGatewayAndLambda(
    app,
    "MyTestStack"
  );
  // THEN
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
});

test("ApiGateway RestApi Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkWorkshop.CdkWorkshopStackApiGatewayAndLambda(
    app,
    "MyTestStack"
  );
  // THEN
  expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
});
