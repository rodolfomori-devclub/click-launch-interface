import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="bg-white dark:bg-secondary border-b border-gray-200 dark:border-secondary-light px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div className="ml-12 lg:ml-0">
          <h2 className="text-xl font-semibold text-secondary dark:text-white">
            Bem-vindo ao ClickLaunch
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sua central de apoio para lançamentos
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {isDark ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Profile */}
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            <UserCircleIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;