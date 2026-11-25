import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import Discover from './screens/customer/Discover';
import Club from './screens/customer/Club';
import Offer from './screens/customer/Offer';
import Requests from './screens/customer/Requests';
import Profile from './screens/customer/Profile';
import Chat from './screens/customer/Chat';
import Checkout from './screens/customer/Checkout';
import Booked from './screens/customer/Booked';
import Split from './screens/customer/Split';
import Pass from './screens/customer/Pass';
import Rate from './screens/customer/Rate';
import Waitlist from './screens/customer/Waitlist';
import Tonight from './screens/customer/Tonight';
import Notifications from './screens/customer/Notifications';
import NightOf from './screens/customer/NightOf';
import Settings from './screens/customer/Settings';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-frame">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/club" element={<Club />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booked" element={<Booked />} />
          <Route path="/split" element={<Split />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/tonight" element={<Tonight />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/night-of" element={<NightOf />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Discover />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
