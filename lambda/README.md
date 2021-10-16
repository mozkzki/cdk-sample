# CDK で Lambda

下記を試すのに使った。

- [[API Gateway + Lambda]ステージとエイリアスを使ってバージョン管理してみた | DevelopersIO](https://dev.classmethod.jp/articles/version-management-with-api-gateway-and-lambda/)
- [LambdaのProvisioned Concurrencyを使って、コールドスタート対策をしてみた #reinvent | DevelopersIO](https://dev.classmethod.jp/articles/lambda-provisioned-concurrency-coldstart/)

`aws-lambda-nodejs`を使うとTypeScriptのトランスパイル、依存解決、バンドルをやってくれるので楽。Docker上でesbuildが動いているということ。

- [AWS CDKのbundlingオプションを使ってLambdaへのデプロイ前処理もCDKで管理する方法 | DevelopersIO](https://dev.classmethod.jp/articles/lambda-bundling-via-aws-cdk/#toc-3)
- [CDKを使ったLambdaデプロイの最適解を考える](https://zenn.dev/fuku710/articles/8fabcb6ff2dcd8)
- [AWS CDK で TypeScript Lambda をいい感じに管理するサンプルコード集 | Basicinc Enjoy Hacking!](https://tech.basicinc.jp/articles/213)

CDKの使い方は[ここ](https://github.com/yukkun007/cdk-sample)参照。
