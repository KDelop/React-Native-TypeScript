import { APIGatewayProxyHandler } from 'aws-lambda';

const websocketConnections: APIGatewayProxyHandler = (event, context) => {
  console.log('WEBSOCKET $CONNECT', event, context);
  return null;
};

export default websocketConnections;
