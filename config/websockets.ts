import { Auth } from 'aws-amplify';

export const createWebsocketConnection = async () => {
  const jwt = await Auth.currentSession().then(x =>
    x.getIdToken().getJwtToken()
  );

  const ws = new WebSocket(
    `wss://4ifu50oeb0.execute-api.us-east-1.amazonaws.com/dev?Auth=${jwt}`
  );

  ws.addEventListener('open', () => {
    console.log('connection opened');
  });
  ws.addEventListener('error', e => console.log(e));
};
