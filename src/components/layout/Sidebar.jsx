import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  MegaphoneIcon,
  FlagIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  { id: 'home', name: 'Dashboard', icon: HomeIcon, path: '/', active: true },
  { id: 'central-emails', name: 'Central de Emails', icon: EnvelopeIcon, path: '/central-emails', active: true },
  { id: 'analises-salvas', name: 'Análises Salvas', icon: ArchiveBoxIcon, path: '/analises-salvas', active: true },
  { id: 'linha-editorial', name: 'Linha Editorial', icon: DocumentTextIcon, path: '/linha-editorial', active: false },
  { id: 'central-mensagens', name: 'Central de Mensagens', icon: ChatBubbleLeftRightIcon, path: '/central-mensagens', active: false },
  { id: 'planejar-lancamento', name: 'Planejar um Lançamento Completo', icon: RocketLaunchIcon, path: '/planejar-lancamento', active: false },
  { id: 'guia-oferta', name: 'Guia de Oferta', icon: BookOpenIcon, path: '/guia-oferta', active: false },
  { id: 'central-cpls', name: 'Central de CPL\'s', icon: MegaphoneIcon, path: '/central-cpls', active: false },
  { id: 'movimento-manifesto', name: 'Movimento e Manifesto', icon: FlagIcon, path: '/movimento-manifesto', active: false },
  { id: 'central-anuncios', name: 'Central de Anúncios', icon: BeakerIcon, path: '/central-anuncios', active: false },
  { id: 'manual-execucao', name: 'Manual de Execução por fases', icon: ClipboardDocumentListIcon, path: '/manual-execucao', active: false },
  { id: 'checklist-tarefas', name: 'Checklist de Tarefas', icon: ClipboardDocumentListIcon, path: '/checklist-tarefas', active: false },
  { id: 'checklist-monitoramento', name: 'Checklist de Monitoramento', icon: ChartBarIcon, path: '/checklist-monitoramento', active: false },
  { id: 'checklist-especialista', name: 'Checklist Especialista', icon: UserGroupIcon, path: '/checklist-especialista', active: false },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Count saved analyses
  const getSavedAnalysesCount = () => {
    try {
      const emailAnalyses = JSON.parse(localStorage.getItem('savedEmailAnalysis') || '[]');
      const editorialAnalyses = JSON.parse(localStorage.getItem('savedEditorialAnalysis') || '[]');
      const messageAnalyses = JSON.parse(localStorage.getItem('savedMessageAnalysis') || '[]');
      return emailAnalyses.length + editorialAnalyses.length + messageAnalyses.length;
    } catch {
      return 0;
    }
  };

  const savedCount = getSavedAnalysesCount();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-secondary shadow-md"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-secondary dark:text-white" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-secondary dark:text-white" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-secondary border-r border-gray-200 dark:border-secondary-light transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 dark:border-secondary-light">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center animate-pulse-slow">
                <span className="text-xl font-bold text-white">CL</span>
              </div>
              <h1 className="text-2xl font-bold text-secondary dark:text-white">
                ClickLaunch
              </h1>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                const isDisabled = !item.active;

                return (
                  <li key={item.id}>
                    {isDisabled ? (
                      <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 dark:text-gray-500 cursor-not-allowed">
                        <Icon className="w-5 h-5" />
                        <span className="flex-1">{item.name}</span>
                        <span className="text-xs bg-gray-100 dark:bg-secondary-light px-2 py-1 rounded">
                          em breve
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary text-white shadow-md'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-light'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1">{item.name}</span>
                        {item.id === 'analises-salvas' && savedCount > 0 && (
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-primary text-white'
                          }`}>
                            {savedCount}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-secondary-light">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Powered by ClickLaunch
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;