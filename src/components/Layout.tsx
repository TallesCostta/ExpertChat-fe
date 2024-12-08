import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useThemeStore } from '../store/useThemeStore';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showMobileMenu?: boolean;
  onToggleMobileMenu?: () => void;
}

export function Layout({ children, title, showMobileMenu, onToggleMobileMenu }: LayoutProps) {
  const { isDark } = useThemeStore();

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={showMobileMenu ? 'Hide conversation list' : 'Show conversation list'}
              >
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                ExpertChat {title && `/ ${title}`}
              </span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex-1">{children}</main>

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