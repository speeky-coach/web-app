import React, { createContext } from 'react';
import User from '../domain/User';
import { SessionState, initialSessionState } from './sessionReducer';

export interface SessionContextState extends SessionState {
  startLoginGooglePopup(): void;
  initialize(user: User): void;
  logout(): void;
  showError(error: Error): void;
}

function stub(): never {
  throw new Error(
    'You forgot to wrap your component in <SessionContextProvider>.'
  );
}

const SessionContextDefaultValue: SessionContextState = {
  ...initialSessionState,
  startLoginGooglePopup: stub,
  initialize: stub,
  logout: stub,
  showError: stub,
};

const SessionContext = createContext<SessionContextState>(
  SessionContextDefaultValue
);

export default SessionContext;
