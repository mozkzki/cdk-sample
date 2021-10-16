import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as cloudwatch from "@aws-cdk/aws-cloudwatch";
import * as cwactions from "@aws-cdk/aws-cloudwatch-actions";
import * as sns from "@aws-cdk/aws-sns";
import * as iam from "@aws-cdk/aws-iam";
import * as chatbot from "@aws-cdk/aws-chatbot";

export class CdkSendSlackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /////////////////////////////////////////////////
    // 流れ
    /////////////////////////////////////////////////

    // sample lambda -> cloudwatch(cw) logs -> metrics filter ->
    //     cw alarm -> cw action -> sns topic -> chatbot -> slack

    // 通知先トピック作成
    const topic = new sns.Topic(this, "notification-topic", {
      displayName: "ChatbotNotificationTopic",
      topicName: "ChatbotNotificationTopic",
    });

    // サンプルのLambda Function
    const helloworldFn = new lambda.Function(this, "HelloWorldSample", {
      code: new lambda.AssetCode("./lambda"),
      handler: "hello-world.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    // Lambdaログを引っ掛けるメトリクスフィルター
    const metricFilter = helloworldFn.logGroup.addMetricFilter(
      "Keyword Filter",
      {
        metricNamespace: "chatbot-sample",
        metricName: "filter-by-keyword",
        filterPattern: { logPatternString: '"HELLO, Slack!"' },
      }
    );

    // CloudWatch Alarm
    const alarm = new cloudwatch.Alarm(this, "Alarm", {
      metric: metricFilter.metric(),
      actionsEnabled: true,
      threshold: 0,
      evaluationPeriods: 5,
      datapointsToAlarm: 1,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    });

    // CloudWatch Alarmが発火したら実行されるActionとしてSNS通知 (通知先トピック) を指定
    const action = new cwactions.SnsAction(topic);

    // ChatbotがCloudWatch Logsを読み取るためのRoleを作成
    const chatbotRole = new iam.Role(this, "chatbot-role", {
      roleName: "chatbot-sample-role",
      assumedBy: new iam.ServicePrincipal("sns.amazonaws.com"),
    });
    // RoleにPolicyを追加
    chatbotRole.addToPolicy(
      new iam.PolicyStatement({
        resources: ["*"],
        actions: [
          "cloudwatch:Describe*",
          "cloudwatch:Get*",
          "cloudwatch:List*",
        ],
      })
    );

    // アラームのアクションを設定
    alarm.addAlarmAction(action);

    // Chatbot作成 (Slack連携)
    const bot = new chatbot.CfnSlackChannelConfiguration(
      this,
      "sample-slack-notification",
      {
        configurationName: "sample-slack-notification",
        iamRoleArn: chatbotRole.roleArn,
        slackChannelId: "<dummy>",
        slackWorkspaceId: "<dummy>",
        snsTopicArns: [topic.topicArn],
      }
    );
  }
}
