import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { LoginLayout } from '../components/LoginLayout';
import { useAuthStore } from '../store/useAuthStore';

export function Login() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <LoginLayout>
      <AuthForm />
    </LoginLayout>
  );
}