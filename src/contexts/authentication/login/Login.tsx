import React, { useContext } from 'react';
import SessionContext from '../../../app/store/SessionContext';
import withoutSessionRequired from './withoutSessionRequired';

function Login() {
  const { startLoginGooglePopup, isLoading } = useContext(SessionContext);

  const loading = isLoading ? <>loading...</> : null;

  return (
    <>
      {loading}
      <div>login</div>
      <div>
        <button onClick={startLoginGooglePopup}>Login</button>
      </div>
    </>
  );
}

export default withoutSessionRequired(Login);
