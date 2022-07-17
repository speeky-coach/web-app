import React, { ComponentType, FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import SessionContext from '../../../app/store/SessionContext';

function withoutSessionRequired<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  return function WithoutSessionRequired(props: P): JSX.Element {
    const { isAuthenticated } = useContext(SessionContext);

    return isAuthenticated ? (
      <Navigate to="/" replace={true} />
    ) : (
      <Component {...props} />
    );
  };
}

export default withoutSessionRequired;
