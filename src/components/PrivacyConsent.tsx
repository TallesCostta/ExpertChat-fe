import React from 'react';
import { Link } from 'react-router-dom';
import { usePrivacyStore } from '../store/usePrivacyStore';

export function PrivacyConsent() {
  const { hasConsent, setConsent } = usePrivacyStore();

  if (hasConsent !== null) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Política de Privacidade
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Para utilizar o ExpertChat, precisamos que você leia e aceite nossa{' '}
          <Link
            to="/privacy"
            target="_blank"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Política de Privacidade
          </Link>
          . Ela explica como coletamos, usamos e protegemos seus dados.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => setConsent(true)}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Aceitar e Continuar
          </button>
          <button
            onClick={() => setConsent(false)}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Recusar
          </button>
        </div>
      </div>
    </div>
  );
}