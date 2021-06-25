import {
  CustomAuthorizerHandler,
  APIGatewayAuthorizerResult
} from 'aws-lambda';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

let pemCache = null;

const verifyToken = async (
  token: string,
  options: { region: string; userPoolId: string; maxAge: number }
): Promise<object> => {
  let pem;
  const iss = `https://cognito-idp.${options.region}.amazonaws.com/${options.userPoolId}/.well-known/jwks.json`;

  console.log(iss);

  if (!pemCache) {
    console.log('HERE');
    const jwkRes = await fetch(iss);
    const jwk = await jwkRes.json();
    console.log('FETCHING JWK', jwk, jwkRes);
    pem = jwkToPem(jwk);
    pemCache = pem;
  } else {
    pem = pemCache;
  }

  return jwt.verify(token, pem, {
    algorithms: ['RS256'],
    maxAge: String(options.maxAge),
    issuer: iss
  }) as object;
};

const authorizer = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { Auth } = event.queryStringParameters;

  console.log('AUTHORIZING');
  try {
    console.log(Auth);
    const decoded = await verifyToken(Auth, {
      region: process.env.REGION,
      maxAge: 60 * 60 * 1000,
      userPoolId: process.env.COGNITO_USER_POOL_ID
    });
    console.log(decoded);
    callback(null, generatePolicy('', 'Allow', event.methodArn));
  } catch (e) {
    console.error(e);
    callback(e, null);
  }
};

const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }
    ]
  }
});

export default authorizer;
