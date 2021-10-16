import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { RetentionDays, LogRetention } from "@aws-cdk/aws-logs";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, "SimpleLambda", {
      entry: "lambda/test.ts",
      currentVersionOptions: {
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      },
      memorySize: 256,
      timeout: cdk.Duration.seconds(180),
      environment: {
        TZ: "Asia/Tokyo",
      },
    });

    // CloudWatch Logs の保持期間を指定（デフォルトだと無期限）
    new LogRetention(this, "SaveSessionLogRetention", {
      logGroupName: `/aws/lambda/${fn.functionName}`,
      retention: RetentionDays.ONE_WEEK,
    });

    // prod エイリアスはバージョン1を指定
    // バージョンを切り替えたい場合はここを修正してデプロイする
    const prodVersion = lambda.Version.fromVersionArn(
      this,
      "ProductionVersion",
      `${fn.functionArn}:1` // 固定
    );
    const production = prodVersion.addAlias("prod");

    // 最新バージョンを取得
    const currentVersion = fn.currentVersion;
    // development エイリアスは最新バージョンを指定
    const development = new lambda.Alias(this, "DevelopmentAlias", {
      aliasName: "dev",
      version: currentVersion,
    });

    // lambdaのdevエイリアスを、apiGateway "dev" ステージに紐付け
    const api = new LambdaRestApi(this, "Endpoint", {
      handler: development,
      deployOptions: {
        stageName: "dev",
      },
    });

    // 同じ名前"Endpoint"だと作成できない
    // 不明: 1つのエンドポイントに複数のステージを作る方法

    // なのでコメントアウト

    // lambdaのprodエイリアスを、apiGateway "prod" ステージに紐付け
    // new LambdaRestApi(this, "Endpoint", {
    //   handler: production,
    //   deployOptions: {
    //     stageName: "prod",
    //   },
    // });
  }
}
