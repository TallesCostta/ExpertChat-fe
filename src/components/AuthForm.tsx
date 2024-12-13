import React from 'react';
import { Bot } from 'lucide-react';
import { PasswordInput } from './PasswordInput';
import { LoadingScreen } from './LoadingScreen';
import { RegisterFields } from './RegisterFields';
import { CredentialsFields } from './CredentialsFields';
import { useAuth } from '../hooks/useAuth';

export function AuthForm() {
  const {
    isLogin,
    isLoading,
    error,
    formData,
    handleInputChange,
    handleSubmit,
    toggleAuthMode,
  } = useAuth();

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`w-full ${isLogin ? 'max-w-sm' : 'max-w-4xl'} bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md`}>
        <div className="text-center mb-8">
          <Bot className="h-20 w-20 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Entrar no ExpertChat' : 'Cadastro no ExpertChat'}
          </h2>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          {isLogin ? (
            <div className="space-y-4">
              <CredentialsFields
                formData={formData}
                onChange={handleInputChange}
                showPasswordStrength={false}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Dados Pessoais
                </h3>
                <RegisterFields formData={formData} onChange={handleInputChange} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Credenciais de Acesso
                </h3>
                <CredentialsFields
                  formData={formData}
                  onChange={handleInputChange}
                  showPasswordStrength={true}
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isLogin
              ? 'Não tem uma conta? Cadastre-se'
              : 'Já tem uma conta? Entre'}
          </button>
        </div>
      </div>
    </>
  );
}