import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getFirebaseToken } from '../firebase/authentication';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SPEEKY_COACHING_SERVICE_GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getFirebaseToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
