// 📱 Definição das 12 Fases do Calendário de Mensagens
// Baseado no Framework Completo de Lançamento

// ==============================================
// 🎯 FASES DO CALENDÁRIO DE MENSAGENS
// ==============================================

export const MESSAGE_PHASES = {
  fase_antecipacao: {
    id: 'fase_antecipacao',
    name: 'Fase de Antecipação',
    emoji: '🔄',
    description: 'Mensagens enviadas antes do evento começar',
    messageCount: 4,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    icon: '🔄',
    timing: 'Antes do evento',
    messages: [
      { id: 1, title: 'Boas-vindas', timing: 'Imediatamente após inscrição' },
      { id: 2, title: 'Alerta de segurança', timing: '2 dias após inscrição' },
      { id: 3, title: 'Segundo alerta', timing: '4 dias após inscrição' },
      { id: 4, title: 'Contagem regressiva', timing: '4 dias antes da Aula 1' }
    ]
  },
  
  fase_preparacao: {
    id: 'fase_preparacao',
    name: 'Fase de Preparação',
    emoji: '📚',
    description: 'Mensagens para criar expectativa imediata antes da primeira aula',
    messageCount: 3,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    icon: '📚',
    timing: 'Véspera da Aula 1',
    messages: [
      { id: 5, title: 'Véspera do evento', timing: '1 dia antes da Aula 1' },
      { id: 6, title: 'Dia da primeira aula', timing: 'Manhã da Aula 1' },
      { id: 7, title: 'Último lembrete', timing: '2-3 horas antes da Aula 1' }
    ]
  },
  
  fase_aula_1: {
    id: 'fase_aula_1',
    name: 'Fase da Aula 1',
    emoji: '📅',
    description: 'Mensagens antes, durante e depois da primeira aula',
    messageCount: 5,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    icon: '📅',
    timing: 'Dia da Aula 1',
    messages: [
      { id: 8, title: 'Uma hora antes', timing: '1 hora antes da Aula 1' },
      { id: 9, title: 'Aula ao vivo', timing: 'Início da Aula 1' },
      { id: 10, title: 'Conteúdo principal', timing: '10 min após início' },
      { id: 11, title: 'Lembrete durante aula', timing: '30 min após início' },
      { id: 12, title: 'Sorteio/incentivo', timing: '45 min após início' }
    ]
  },
  
  fase_preparacao_aula_2: {
    id: 'fase_preparacao_aula_2',
    name: 'Fase Intermediária - Preparação para Aula 2',
    emoji: '🔄',
    description: 'Recapitulação e antecipação da segunda aula',
    messageCount: 3,
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-600',
    icon: '🔄',
    timing: 'Dia da Aula 2',
    messages: [
      { id: 13, title: 'Resumo da Aula 1', timing: 'Manhã da Aula 2' },
      { id: 14, title: 'Lembrete Aula 2', timing: 'Tarde da Aula 2' },
      { id: 15, title: 'Uma hora antes', timing: '1 hora antes da Aula 2' }
    ]
  },
  
  fase_aula_2: {
    id: 'fase_aula_2',
    name: 'Fase da Aula 2',
    emoji: '📅',
    description: 'Mensagens antes, durante e depois da segunda aula',
    messageCount: 3,
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600',
    icon: '📅',
    timing: 'Dia da Aula 2',
    messages: [
      { id: 16, title: 'Aula prática ao vivo', timing: 'Início da Aula 2' },
      { id: 17, title: 'Desafio participação', timing: '30 min após início' },
      { id: 18, title: 'Última chance', timing: '1 hora após início' }
    ]
  },
  
  fase_preparacao_aula_3: {
    id: 'fase_preparacao_aula_3',
    name: 'Fase Intermediária - Preparação para Aula 3',
    emoji: '🔄',
    description: 'Antecipação da aula final e oferta',
    messageCount: 3,
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    icon: '🔄',
    timing: 'Dia da Aula 3',
    messages: [
      { id: 19, title: 'Convite Aula 3', timing: 'Manhã da Aula 3' },
      { id: 20, title: 'Importância da aula', timing: 'Tarde da Aula 3' },
      { id: 21, title: 'Uma hora antes', timing: '1 hora antes da Aula 3' }
    ]
  },
  
  fase_aula_3: {
    id: 'fase_aula_3',
    name: 'Fase da Aula 3',
    emoji: '📅',
    description: 'Mensagens antes, durante e depois da terceira aula',
    messageCount: 4,
    color: 'red',
    gradient: 'from-red-500 to-red-600',
    icon: '📅',
    timing: 'Dia da Aula 3',
    messages: [
      { id: 22, title: 'Aula mais importante', timing: 'Início da Aula 3' },
      { id: 23, title: 'Reflexão oportunidade', timing: '30 min após início' },
      { id: 24, title: 'Última chamada', timing: '45 min após início' },
      { id: 25, title: 'Condição especial', timing: '1h15 após início' }
    ]
  },
  
  fase_lista_vip: {
    id: 'fase_lista_vip',
    name: 'Fase de Oferta - Lista VIP',
    emoji: '🛒',
    description: 'Mensagens para acesso antecipado à oferta',
    messageCount: 6,
    color: 'yellow',
    gradient: 'from-yellow-500 to-yellow-600',
    icon: '🛒',
    timing: 'Após Aula 3',
    messages: [
      { id: 26, title: 'Anúncio inscrições', timing: 'Após término da Aula 3' },
      { id: 27, title: 'Lembrete Aula 3', timing: 'Manhã seguinte' },
      { id: 28, title: 'Bônus exclusivos', timing: 'Meio da manhã' },
      { id: 29, title: 'Aviso acesso VIP', timing: '3-4h antes abertura VIP' },
      { id: 30, title: 'Menos de 2 horas', timing: '2h antes abertura VIP' },
      { id: 31, title: 'Menos de 30 minutos', timing: '30 min antes abertura VIP' }
    ]
  },
  
  fase_vendas_dia_1: {
    id: 'fase_vendas_dia_1',
    name: 'Fase de Vendas - Dia 1',
    emoji: '🛒',
    description: 'Primeiro dia de vendas com urgência',
    messageCount: 5,
    color: 'pink',
    gradient: 'from-pink-500 to-pink-600',
    icon: '🛒',
    timing: 'Primeiro dia vendas',
    messages: [
      { id: 32, title: 'Inscrições abertas', timing: 'Abertura para VIP' },
      { id: 33, title: 'Lista de bônus', timing: 'Abertura público geral' },
      { id: 34, title: 'Tempo acabando', timing: 'Manhã do dia seguinte' },
      { id: 35, title: 'Sua história', timing: 'Tarde do dia seguinte' },
      { id: 36, title: 'Futuro começa agora', timing: 'Noite do dia seguinte' }
    ]
  },
  
  fase_vendas_dia_2: {
    id: 'fase_vendas_dia_2',
    name: 'Fase de Vendas - Dia 2',
    emoji: '🛒',
    description: 'Segundo dia com contagem regressiva intensa',
    messageCount: 12,
    color: 'rose',
    gradient: 'from-rose-500 to-rose-600',
    icon: '🛒',
    timing: 'Segundo dia vendas',
    messages: [
      { id: 37, title: '15 horas para encerrar', timing: 'Manhã do 2º dia' },
      { id: 38, title: '14 horas para encerrar', timing: '14h antes do fim' },
      { id: 39, title: '12 horas - Caso sucesso', timing: '12h antes do fim' },
      { id: 40, title: '10 horas - ROI', timing: '10h antes do fim' },
      { id: 41, title: '8 horas - Transformação', timing: '8h antes do fim' },
      { id: 42, title: '6 horas - Prova social', timing: '6h antes do fim' },
      { id: 43, title: '5 horas - Urgência', timing: '5h antes do fim' },
      { id: 44, title: '4 horas', timing: '4h antes do fim' },
      { id: 45, title: '3 horas', timing: '3h antes do fim' },
      { id: 46, title: '2 horas', timing: '2h antes do fim' },
      { id: 47, title: '1 hora', timing: '1h antes do fim' },
      { id: 48, title: '30 minutos', timing: '30 min antes do fim' }
    ]
  },
  
  fase_vendas_extensao: {
    id: 'fase_vendas_extensao',
    name: 'Fase de Vendas - Extensão',
    emoji: '🛒',
    description: 'Extensão da oferta com novas estratégias',
    messageCount: 15,
    color: 'cyan',
    gradient: 'from-cyan-500 to-cyan-600',
    icon: '🛒',
    timing: 'Dias 3-7',
    messages: [
      { id: 49, title: 'Bônus ainda válidos', timing: 'Manhã após 1º prazo' },
      { id: 50, title: 'Aulas saindo do ar', timing: 'Final da manhã dia 3' },
      { id: 51, title: 'Programa é para você?', timing: 'Manhã do dia 4' },
      { id: 52, title: 'Bônus ainda válidos', timing: 'Tarde do dia 4' },
      { id: 53, title: 'Aulas liberadas', timing: 'Final da tarde dia 4' },
      { id: 54, title: 'Bônus específico', timing: 'Manhã do dia 5' },
      { id: 55, title: 'O que você vai aprender', timing: 'Meio da manhã dia 5' },
      { id: 56, title: 'Suporte para decisão', timing: 'Tarde do dia 5' },
      { id: 57, title: 'Investimento por dia', timing: 'Final da tarde dia 5' },
      { id: 58, title: 'Nova forma pagamento', timing: 'Manhã do dia 6' },
      { id: 59, title: 'Comece do zero', timing: 'Meio da manhã dia 6' },
      { id: 60, title: 'Confronto de medos', timing: 'Tarde do dia 6' },
      { id: 61, title: 'Quais suas desculpas?', timing: 'Manhã do dia 7' },
      { id: 62, title: 'Divisor de águas', timing: 'Meio da manhã dia 7' },
      { id: 63, title: 'Bônus não garantidos', timing: 'Tarde do dia 7' }
    ]
  },
  
  fase_ultimo_prazo: {
    id: 'fase_ultimo_prazo',
    name: 'Fase de Vendas - Último Prazo',
    emoji: '🛒',
    description: 'Prazo final com máxima urgência',
    messageCount: 7,
    color: 'slate',
    gradient: 'from-slate-500 to-slate-600',
    icon: '🛒',
    timing: 'Dias 8-9',
    messages: [
      { id: 64, title: 'Tempo acabando novamente', timing: 'Manhã do dia 8' },
      { id: 65, title: 'Menos de 29 horas', timing: 'Meio da manhã dia 8' },
      { id: 66, title: 'Bônus específico A', timing: 'Ao longo do dia 8' },
      { id: 67, title: 'Bônus específico B', timing: 'Ao longo do dia 8' },
      { id: 68, title: 'Bônus específico C', timing: 'Último dia' },
      { id: 69, title: 'Bônus específico D', timing: 'Último dia' },
      { id: 70, title: 'Bônus específico E', timing: 'Último dia' }
    ]
  }
};

// ==============================================
// 🎯 OPÇÕES DE GERAÇÃO
// ==============================================

export const GENERATION_OPTIONS = {
  all: {
    id: 'all',
    name: 'GERAR TODAS',
    subtitle: 'Calendário Completo',
    description: 'Gera todas as 70 mensagens de uma vez',
    emoji: '🚀',
    color: 'primary',
    gradient: 'from-primary to-primary-dark',
    totalMessages: 70,
    estimatedTime: '5-10 min',
    icon: '🚀',
    benefits: [
      'Calendário completo pronto',
      'Todas as 12 fases incluídas',
      'Sequência otimizada',
      'Economia de tempo'
    ]
  },
  
  batches: {
    id: 'batches',
    name: 'GERAR POR LOTES',
    subtitle: 'Fase por Fase',
    description: 'Gera mensagens por fases específicas',
    emoji: '📋',
    color: 'secondary',
    gradient: 'from-secondary to-secondary-dark',
    totalMessages: 'Variável',
    estimatedTime: '1-2 min por fase',
    icon: '📋',
    benefits: [
      'Controle total do processo',
      'Foco em fases específicas',
      'Revisão por etapas',
      'Flexibilidade máxima'
    ]
  }
};

// ==============================================
// 🔧 FUNÇÕES UTILITÁRIAS
// ==============================================

export const getAllPhases = () => {
  return Object.values(MESSAGE_PHASES);
};

export const getPhaseById = (phaseId) => {
  return MESSAGE_PHASES[phaseId];
};

export const getTotalMessages = () => {
  return Object.values(MESSAGE_PHASES).reduce((total, phase) => total + phase.messageCount, 0);
};

export const getGenerationOptions = () => {
  return Object.values(GENERATION_OPTIONS);
};

export const getPhasesByGroup = () => {
  const phases = getAllPhases();
  const groups = {
    preparation: phases.slice(0, 3), // Antecipação, Preparação, Aula 1
    classes: phases.slice(3, 7), // Prep Aula 2, Aula 2, Prep Aula 3, Aula 3
    sales: phases.slice(7) // Lista VIP, Vendas Dia 1, Vendas Dia 2, Extensão, Último Prazo
  };
  return groups;
};