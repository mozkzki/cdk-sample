# CDK Sample

## CDKの始め方

このプロジェクトは、[CDKのTYPESCRIPT ワークショップ](https://summit-online-japan-cdk.workshop.aws/20-typescript.html)で作成した。

```bash
> npm install -g aws-cdk
> mkdir cdk-workshop && cd cdk-workshop
> cdk init sample-app --language typescript
```

### tscをwatchモードで起動

```bash
> cd cdk-workshop
> npm run watch
```

- TypeScriptコンパイラ（tsc）が"watch"モードで起動する
- .tsファイルを変更すると自動的に.jsへコンパイルされる

### テンプレート生成

`cdk.json`がある場所で以下を実行。

```bash
> cdk synth
```

- CDKアプリのコード(`lib/cdk-workshop-stack.ts`)からテンプレートが生成される(CDK用語で"synthesize")

### 環境の初期構築

初回だけ必要。

```bash
> cdk bootstrap
```

### デプロイ

```bash
> cdk deploy
```

### 差分の確認

```bash
> cdk diff
```

## API Reference

- [API Reference · AWS CDK](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)

## Useful commands

- `npm run build`   compile typescript to js
- `npm run watch`   watch for changes and compile
- `npm run test`    perform the jest unit tests
- `cdk deploy`      deploy this stack to your default AWS account/region
- `cdk diff`        compare deployed stack with current state
- `cdk synth`       emits the synthesized CloudFormation template
