import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { logout } from '../../setup/firebase/authentication';
import SessionContext from '../store/SessionContext';
import withSessionRequired from './withSessionRequired';

function Layout() {
  const { isLoading, user } = useContext(SessionContext);

  const loading = isLoading ? <>loading...</> : null;

  if (!user) {
    return <div>skeleton</div>;
  }

  return (
    <>
      {loading}
      <header className="App-header">Speeky, Hello {user.name}</header>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/conversations">Conversations</Link>
        {' | '}
        <Link to="/profile">Profile</Link>
        {' | '}
        <Link to="/plans-and-pricing">Plans and pricing</Link>
        {' | '}
        <Link to="/login">Login</Link>
      </nav>
      <div>Private area</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <Outlet />
    </>
  );
}

export default withSessionRequired(Layout);
