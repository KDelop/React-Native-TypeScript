import Amplify, { Auth } from 'aws-amplify';

import AmplifyStorage from '../clients/amplifyStorage';

Amplify.configure({
  userPoolId: 'us-east-1_3eYkMlQpp',
  userPoolWebClientId: '11qk781l4j6bbg3sbe4kvkv1n4',
  region: 'us-east-1',
  storage: AmplifyStorage
});
