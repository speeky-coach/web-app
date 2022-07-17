import React, { useEffect, useReducer } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  loginWithGoogle,
  onFirebaseAuthStateChanged,
} from '../../setup/firebase/authentication';
import User from '../domain/User';
import SessionContext, { SessionContextState } from './SessionContext';
import sessionReducer, {
  initialSessionState,
  SessionActionType,
} from './sessionReducer';

interface SessionContextProviderProps {
  children: React.ReactNode;
}

function SessionContextProvider({ children }: SessionContextProviderProps) {
  const [state, dispatch] = useReducer(sessionReducer, initialSessionState);

  function startLoginGooglePopup(): void {
    dispatch({ type: SessionActionType.LOGIN_POPUP_STARTED });

    loginWithGoogle();
  }

  function initialize(user: User): void {
    dispatch({ type: SessionActionType.INITIALIZED, user });
  }

  function logout(): void {
    dispatch({ type: SessionActionType.LOGOUT });
  }

  function showError(error: Error): void {
    dispatch({ type: SessionActionType.ERROR, error });
  }

  useEffect(() => {
    onFirebaseAuthStateChanged((firebaseUser: FirebaseUser | null) => {
      console.log({ firebaseUser });

      if (!firebaseUser) {
        return logout();
      }

      const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email || '',
      };

      initialize(user);
    });
  }, []);

  const contextValue: SessionContextState = {
    ...state,
    startLoginGooglePopup,
    initialize,
    logout,
    showError,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContextProvider;
