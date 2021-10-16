import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";
import * as sns from "@aws-cdk/aws-sns";
import * as cloudwatch from "@aws-cdk/aws-cloudwatch";
import * as action from "@aws-cdk/aws-cloudwatch-actions";
import * as chatbot from "@aws-cdk/aws-chatbot";

export class CdkDlqStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // SQS
    const testQueueDlq = new sqs.Queue(this, "TestQueue-DLQ", {
      queueName: "TestQueue-DLQ",
    });

    const testQueue = new sqs.Queue(this, "TestQueue", {
      queueName: "TestQueue",
      deadLetterQueue: {
        maxReceiveCount: 1,
        queue: testQueueDlq,
      },
    });

    // SNS (Topic名が重複するとエラーになるので注意)
    const chatbotNotificationTopic = new sns.Topic(
      this,
      "ChatbotNotificationTopicForDlqTest",
      {
        topicName: "ChatbotNotificationTopicForDlqTest",
      }
    );

    // CloudWatch
    const alarm = new cloudwatch.Alarm(this, `TestQueue-DLQ-Alarm`, {
      metric: testQueueDlq.metricApproximateNumberOfMessagesVisible(),
      evaluationPeriods: 1,
      threshold: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });

    alarm.addAlarmAction(new action.SnsAction(chatbotNotificationTopic));
    alarm.addOkAction(new action.SnsAction(chatbotNotificationTopic));

    // Chatbot (すでに設定済みの場合はエラーになるので注意)
    new chatbot.SlackChannelConfiguration(this, "SlackChannel", {
      slackChannelConfigurationName: "sandbox",
      slackWorkspaceId: "T5YLN5A6S",
      slackChannelId: "C9MPMQMFZ",
      notificationTopics: [chatbotNotificationTopic],
    });
  }
}
