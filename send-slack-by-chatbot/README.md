# ChatbotからSlack通知

- 試した
  - [CloudWatch AlarmをAWS ChatbotからSlack通知する仕組みをCDKで作ってみた | DevelopersIO](https://dev.classmethod.jp/articles/aws-chatbot-slack-notification-cdk/#toc-5)
- slackの通知先チャンネルとChatBotのworkspaceId指定は下記参照
  - [CodePipelineの実行結果をAWS ChatBotでSlackに通知するCloudformation - Qiita](https://qiita.com/kazuhiro1982/items/562509199a97d3035fc9)

```Typescript
        slackChannelId: "<slack channel id>",
        slackWorkspaceId: "<slack workspace id>",
```

## Useful commands

- `npm run build`   compile typescript to js
- `npm run watch`   watch for changes and compile
- `npm run test`    perform the jest unit tests
- `cdk deploy`      deploy this stack to your default AWS account/region
- `cdk diff`        compare deployed stack with current state
- `cdk synth`       emits the synthesized CloudFormation template