import React from 'react';
import { Link } from 'react-router-dom';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ExpertChat © {new Date().getFullYear()} - Todos os direitos reservados • <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white">
                Política de Privacidade
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <a
                href="https://www.linkedin.com/in/donatti12/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                Desenvolvido por Donatti
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}