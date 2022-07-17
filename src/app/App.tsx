import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import SessionContextProvider from './store/SessionContextProvider';

function App() {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
