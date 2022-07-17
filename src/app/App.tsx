import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import SessionContextProvider from './store/SessionContextProvider';
import { ApolloProvider } from '@apollo/client';

import apolloClient from '../setup/apollo';

function App() {
  return (
    <SessionContextProvider>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </SessionContextProvider>
  );
}

export default App;
