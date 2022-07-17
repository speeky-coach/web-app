import User from '../domain/User';

export interface SessionState {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: User;
}

export const initialSessionState: SessionState = {
  isAuthenticated: false,
  isLoading: true,
};

export enum SessionActionType {
  LOGIN_POPUP_STARTED = 'LOGIN_POPUP_STARTED',
  INITIALIZED = 'INITIALIZED',
  LOGOUT = 'LOGOUT',
  ERROR = 'ERROR',
}

export type SessionAction =
  | { type: SessionActionType.LOGIN_POPUP_STARTED }
  | {
      type: SessionActionType.INITIALIZED;
      user?: User;
    }
  | { type: SessionActionType.LOGOUT }
  | { type: SessionActionType.ERROR; error: Error };

function sessionReducer(
  state: SessionState,
  action: SessionAction
): SessionState {
  switch (action.type) {
    case SessionActionType.LOGIN_POPUP_STARTED:
      return {
        ...state,
        isLoading: true,
      };

    case SessionActionType.INITIALIZED:
      return {
        ...state,
        isAuthenticated: !!action.user,
        user: action.user,
        isLoading: false,
        error: undefined,
      };

    case SessionActionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };

    case SessionActionType.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
  }
}

export default sessionReducer;
