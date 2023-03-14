import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Layout = React.lazy(() => import('../layout/Layout'));
const Home = React.lazy(() => import('../../contexts/home/Home'));
const NewConversation = React.lazy(
  () => import('../../contexts/coaching/new-conversation/NewConversation')
);
const Conversations = React.lazy(
  () => import('../../contexts/coaching/conversations/Conversations')
);
const Profile = React.lazy(
  () => import('../../contexts/account/profile/Profile')
);
const PlansAndPricing = React.lazy(
  () => import('../../contexts/payment-management/plans-and-pricing')
);
const Checkout = React.lazy(
  () => import('../../contexts/payment-management/checkout')
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
          <Route path="conversations">
            <Route index element={<Conversations />} />
            <Route path="new" element={<NewConversation />} />
          </Route>
          <Route path="profile" element={<Profile />} />

          {/* CONTEXT: Payment-management */}
          <Route path="plans-and-pricing" element={<PlansAndPricing />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
