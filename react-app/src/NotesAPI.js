import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from './Config';

const NotesApi = new ApolloClient({
  uri: config.apiurl,
  cache: new InMemoryCache()
});

export default NotesApi;
