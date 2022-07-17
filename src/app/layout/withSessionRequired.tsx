import React, { ComponentType, FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SessionContext from '../store/SessionContext';

function withSessionRequired<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  return function WithSessionRequired(props: P): JSX.Element {
    const { isLoading, isAuthenticated } = useContext(SessionContext);

    return isLoading || isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };
}

export default withSessionRequired;
