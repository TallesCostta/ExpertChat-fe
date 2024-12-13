import React from 'react';
import { PasswordInput } from './PasswordInput';

interface CredentialsFieldsProps {
  formData: {
    login: string;
    password: string;
    confirmPassword?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordStrength: boolean;
}

export function CredentialsFields({
  formData,
  onChange,
  showPasswordStrength,
}: CredentialsFieldsProps) {
  return (
    <>
      <div>
        <input
          type="text"
          id="login"
          name="login"
          value={formData.login}
          onChange={onChange}
          required
          className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Usuário"
        />
      </div>

      <PasswordInput
        id="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        required
        showStrength={showPasswordStrength}
      />

      {showPasswordStrength && (
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword || ''}
          onChange={onChange}
          placeholder="Confirmar senha"
          required
          showStrength={false}
          confirmPassword={formData.password}
          isConfirmation={true}
        />
      )}
    </>
  );
}