import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="App-header">Speeky</header>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/profile">Profile</Link>
        {' | '}
        <Link to="/login">Login</Link>
      </nav>
      <div>Private area 2</div>
      <Outlet />
    </>
  );
}

export default Layout;
