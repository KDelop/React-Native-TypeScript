import { Auth } from 'aws-amplify';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

const link = new HttpLink({
  uri:
    'https://tgb5wqylingkhjetdi5ul4gx6u.appsync-api.us-east-1.amazonaws.com/graphql'
});

const authLink = setContext(async (_, { headers }) => {
  const token = await Auth.currentSession().then(session =>
    session.getIdToken().getJwtToken()
  );

  return {
    headers: {
      ...headers,
      Authorization: token || ''
    }
  };
});

const cache = new InMemoryCache();

export default new ApolloClient({
  link: authLink.concat(link),
  cache
});
