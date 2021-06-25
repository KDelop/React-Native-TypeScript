import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {firebase} from '@react-native-firebase/firestore';

const httpLink = createHttpLink({
  uri:
    process.env?.NODE_ENV === 'development'
      ? 'http://192.168.4.21:5001/athleticus-d1300/us-central1/graphql'
      : 'https://us-central1-athleticus-d1300.cloudfunctions.net/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await firebase.auth().currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
