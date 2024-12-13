import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { Dashboard } from './pages/Dashboard';
import { Chat } from './pages/Chat';
import { Privacy } from './pages/Privacy';
import { Login } from './pages/Login';
import { PrivacyConsent } from './components/PrivacyConsent';
import { PrivateRoute } from './components/PrivateRoute';
import { setupLocale } from './utils/locale';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Setup PrimeReact locale
setupLocale();

export function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Toast position="top-right" />
        <PrivacyConsent />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
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
    </PrimeReactProvider>
  );
}