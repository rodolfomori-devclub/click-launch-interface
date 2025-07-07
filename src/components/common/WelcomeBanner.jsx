import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenBanner = localStorage.getItem('hasSeenWelcomeBanner');
    if (!hasSeenBanner) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcomeBanner', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-2xl mx-4 bg-white dark:bg-secondary rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary-light to-primary"></div>
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-dark transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="p-8 animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse-slow">
              <span className="text-3xl font-bold text-white">CL</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-4 text-secondary dark:text-white">
            Bem-vindo ao ClickLaunch!
          </h2>

          <div className="space-y-4 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              O ClickLaunch é sua central de apoio para lançamentos!
            </p>
            
            <p className="text-base text-gray-600 dark:text-gray-400">
              Conte com a gente em todas as fases: desde a concepção da ideia, 
              passando por mensagens, scripts de aulas, até criativos e muito mais.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleClose}
              className="btn-primary px-8 py-3 text-lg font-semibold animate-glow"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;