import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Layout = React.lazy(() => import('../layout/Layout'));
const Home = React.lazy(() => import('../../contexts/home/Home'));
const Conversations = React.lazy(
  () => import('../../contexts/coaching/conversations/Conversations')
);
const Profile = React.lazy(
  () => import('../../contexts/account/profile/Profile')
);
const Login = React.lazy(
  () => import('../../contexts/authentication/login/Login')
);

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
