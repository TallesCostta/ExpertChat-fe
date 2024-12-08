import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Privacy } from './pages/Privacy';
import { PrivacyConsent } from './components/PrivacyConsent';
import { usePrivacyStore } from './store/usePrivacyStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { hasConsent } = usePrivacyStore();
  
  if (hasConsent === false) {
    return <Navigate to="/privacy" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <PrivacyConsent />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:botId"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;