import { v4 as uuidv4 } from "uuid";

console.log("cold start : " + uuidv4()); // コールドスタートが起きた時に呼ばれて、CloudWatch Logsに書き込まれる

exports.handler = async () => {
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda! : version=3"),
  };
  return response;
};
