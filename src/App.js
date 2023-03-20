import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Countdown from './pages/Countdown';
import Enroll from './pages/Enroll';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import FillSubscription from './pages/Dashboard/FillSubscription';
import Payment from './pages/Dashboard/Payment';
import Hotel from './pages/Dashboard/Hotel';
import Activities from './pages/Dashboard/Activities';
import Certificate from './pages/Dashboard/Certificate';

import { EventInfoProvider } from './contexts/EventInfoContext';
import { UserProvider } from './contexts/UserContext';
import { HotelContext } from './contexts/HotelContext';

import useToken from './hooks/useToken';
import { useState } from 'react';
import { OAuthProvider } from './contexts/OAuthContext';

export default function App() {
  const [chosenRoom, setChosenRoom] = useState({ id: 0, name: '' });

  return (
    <>
      <ToastContainer />
      <EventInfoProvider>
        <UserProvider>
          <HotelContext.Provider value={{ chosenRoom, setChosenRoom }}>
            <OAuthProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Countdown />} />
                  <Route path="/enroll" element={<Enroll />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/oAuth/sign-in" element={<SignIn />} />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRouteGuard>
                        <Dashboard />
                      </ProtectedRouteGuard>
                    }
                  >
                    <Route path="subscription" element={<FillSubscription />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="hotel" element={<Hotel />} />
                    <Route path="activities" element={<Activities />} />
                    <Route path="certificate" element={<Certificate />} />
                    <Route index path="*" element={<Navigate to="/dashboard/subscription" />} />
                  </Route>
                </Routes>
              </Router>
            </OAuthProvider>
          </HotelContext.Provider>
        </UserProvider>
      </EventInfoProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
