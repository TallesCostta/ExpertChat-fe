import React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  confirmPassword?: string;
  required?: boolean;
  className?: string;
  showStrength?: boolean;
  isConfirmation?: boolean;
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = 'Senha',
  confirmPassword,
  required = false,
  className = '',
  showStrength = false,
  isConfirmation = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordsMatch = !confirmPassword || value === confirmPassword;
  const shouldShowMismatchError = isConfirmation && !passwordsMatch && value && confirmPassword;

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          required={required}
          value={value}
          onChange={onChange}
          className={`block w-full pl-10 pr-10 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            shouldShowMismatchError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-700'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>

      {showStrength && value && <PasswordStrengthIndicator password={value} />}

      {shouldShowMismatchError && (
        <p className="text-xs text-red-500">As senhas não coincidem</p>
      )}
    </div>
  );
}