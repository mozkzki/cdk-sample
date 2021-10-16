#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { CdkWorkshopStackApiGatewayAndLambda } from "../lib/cdk-workshop-stack-apigateway-lambda";
import { CdkWorkshopStackSnsAndSqs } from "../lib/cdk-workshop-stack-sns-sqs";
import { CdkWorkshopStackTypescriptLambda } from "../lib/cdk-workshop-stack-ts-lambda";

const app = new cdk.App();

new CdkWorkshopStackApiGatewayAndLambda(
  app,
  "CdkWorkshopStackApiGatewayLambda"
);
new CdkWorkshopStackTypescriptLambda(app, "CdkWorkshopStackTypescriptLambda");
new CdkWorkshopStackSnsAndSqs(app, "CdkWorkshopStackSnsSqs");
