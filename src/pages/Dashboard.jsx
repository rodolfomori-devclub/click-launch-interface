import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  MegaphoneIcon,
  FlagIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    id: 'linha-editorial',
    title: 'Linha Editorial',
    description: 'Crie e gerencie sua linha editorial completa',
    icon: DocumentTextIcon,
    active: true,
    color: 'bg-green-500',
    path: '/linha-editorial',
  },
  {
    id: 'central-mensagens',
    title: 'Central de Mensagens',
    description: 'Templates e mensagens para suas campanhas',
    icon: ChatBubbleLeftRightIcon,
    active: true,
    color: 'bg-blue-500',
    path: '/central-mensagens',
  },
  {
    id: 'central-emails',
    title: 'Central de Emails',
    description: 'Gerencie e crie templates de email',
    icon: EnvelopeIcon,
    active: true,
    color: 'bg-purple-500',
    path: '/central-emails',
  },
  {
    id: 'planejar-lancamento',
    title: 'Planejar um Lançamento Completo',
    description: 'Planeje todos os detalhes do seu lançamento',
    icon: RocketLaunchIcon,
    active: false,
    color: 'bg-red-500',
  },
  {
    id: 'guia-oferta',
    title: 'Guia de Oferta',
    description: 'Crie ofertas irresistíveis',
    icon: BookOpenIcon,
    active: false,
    color: 'bg-yellow-500',
  },
  {
    id: 'central-cpls',
    title: 'Central de CPL\'s',
    description: 'Gerencie suas campanhas de CPL',
    icon: MegaphoneIcon,
    active: false,
    color: 'bg-pink-500',
  },
  {
    id: 'movimento-manifesto',
    title: 'Movimento e Manifesto',
    description: 'Crie seu movimento e manifesto',
    icon: FlagIcon,
    active: false,
    color: 'bg-indigo-500',
  },
  {
    id: 'central-anuncios',
    title: 'Central de Anúncios',
    description: 'Crie e gerencie seus anúncios',
    icon: BeakerIcon,
    active: false,
    color: 'bg-orange-500',
  },
  {
    id: 'manual-execucao',
    title: 'Manual de Execução por fases',
    description: 'Guia completo de execução',
    icon: ClipboardDocumentListIcon,
    active: false,
    color: 'bg-teal-500',
  },
  {
    id: 'checklist-tarefas',
    title: 'Checklist de Tarefas',
    description: 'Acompanhe todas as tarefas',
    icon: ClipboardDocumentListIcon,
    active: false,
    color: 'bg-cyan-500',
  },
  {
    id: 'checklist-monitoramento',
    title: 'Checklist de Monitoramento',
    description: 'Monitore seus resultados',
    icon: ChartBarIcon,
    active: false,
    color: 'bg-lime-500',
  },
  {
    id: 'checklist-especialista',
    title: 'Checklist Especialista',
    description: 'Checklist avançado para especialistas',
    icon: UserGroupIcon,
    active: false,
    color: 'bg-emerald-500',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleFeatureClick = (feature) => {
    if (feature.active && feature.path) {
      navigate(feature.path);
    }
  };

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
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">
          Central de Lançamentos
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Escolha uma ferramenta para começar a criar seu lançamento de sucesso
        </p>
      </div>

      {/* Saved Analyses Highlight Section */}
      {savedCount > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 via-primary-light/10 to-primary/5 rounded-xl border-2 border-primary/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <ArchiveBoxIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-1">
                  📚 Suas Análises Salvas
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Você tem <span className="font-semibold text-primary">{savedCount} análise{savedCount !== 1 ? 's' : ''}</span> salva{savedCount !== 1 ? 's' : ''} para revisar
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/analises-salvas')}
              className="flex items-center space-x-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md"
            >
              <ArchiveBoxIcon className="w-5 h-5" />
              <span>Ver Todas</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span className="text-gray-600 dark:text-gray-400">
                {JSON.parse(localStorage.getItem('savedEmailAnalysis') || '[]').length} Email{JSON.parse(localStorage.getItem('savedEmailAnalysis') || '[]').length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-600 dark:text-gray-400">
                {JSON.parse(localStorage.getItem('savedEditorialAnalysis') || '[]').length} Editorial{JSON.parse(localStorage.getItem('savedEditorialAnalysis') || '[]').length !== 1 ? 'is' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600 dark:text-gray-400">
                {JSON.parse(localStorage.getItem('savedMessageAnalysis') || '[]').length} Mensagen{JSON.parse(localStorage.getItem('savedMessageAnalysis') || '[]').length !== 1 ? 's' : 's'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              className={`relative card group ${
                feature.active
                  ? 'cursor-pointer transform hover:scale-105 hover:shadow-xl'
                  : 'opacity-60 cursor-not-allowed'
              } transition-all duration-300`}
            >
              {!feature.active && (
                <div className="absolute top-4 right-4 bg-gray-200 dark:bg-secondary text-xs px-2 py-1 rounded">
                  Em breve
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div
                  className={`${feature.color} bg-opacity-10 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-8 h-8 ${feature.color.replace('bg-', 'text-')}`} />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>

              {feature.active && (
                <div className="mt-4 flex items-center text-primary font-medium">
                  <span className="text-sm">Acessar</span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;