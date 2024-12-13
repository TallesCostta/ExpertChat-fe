import React from 'react';
import { calculatePasswordStrength } from '../utils/password';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);

  return (
    <>
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: `${(strength.score + 1) * 20}%` }}
        />
      </div>
      <p className={`text-xs ${strength.color.replace('bg-', 'text-')}`}>
        Força da senha: {strength.label}
      </p>
    </>
  );
}