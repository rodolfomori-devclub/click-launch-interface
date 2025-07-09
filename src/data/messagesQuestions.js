// 📱 Sistema de Questionário de Mensagens de Lançamento
// Baseado no Framework de Calendário Completo (70+ mensagens)

// ==============================================
// 📊 DEFINIÇÃO DOS NÍVEIS DE QUESTIONÁRIO
// ==============================================

export const MESSAGES_LEVELS = {
  'rapid': {
    id: 'rapid',
    name: 'RÁPIDO',
    subtitle: 'Mensagens mais DIRETAS',
    description: 'Para quem quer criar mensagens funcionais rapidamente',
    questionCount: 15,
    estimatedTime: '10-15 min',
    color: 'yellow',
    icon: '⚡',
    quality: 'Mensagens diretas e eficazes para seu lançamento'
  },
  'complete': {
    id: 'complete',
    name: 'COMPLETO', 
    subtitle: 'BOA QUALIDADE de mensagens',
    description: 'Recomendado para lançamentos sérios',
    questionCount: 25,
    estimatedTime: '15-25 min',
    color: 'green',
    icon: '📋',
    quality: 'Sequência completa com todas as fases do lançamento'
  },
  'detailed': {
    id: 'detailed',
    name: 'DETALHADO',
    subtitle: 'MÁXIMA PERSONALIZAÇÃO',
    description: 'Para resultados premium com alta conversão',
    questionCount: 35,
    estimatedTime: '25-35 min', 
    color: 'purple',
    icon: '🔬',
    quality: 'Calendário completo com 70+ mensagens ultra-personalizadas'
  }
};

// ==============================================
// 🎯 PERGUNTAS NÍVEL RÁPIDO (15 perguntas)
// ==============================================

const rapidQuestions = [
  // 🎯 IDENTIFICAÇÃO BÁSICA (4 perguntas)
  {
    id: 'event-name',
    category: 'Identificação Básica',
    question: 'Qual é o nome do seu evento gratuito?',
    type: 'text',
    placeholder: 'Ex: Semana do Código Lucrativo',
    help: 'Use um nome que transmita valor e resultado',
    required: true,
    level: 'rapid'
  },
  {
    id: 'product-name',
    category: 'Identificação Básica',
    question: 'Qual é o nome do seu produto/programa principal?',
    type: 'text',
    placeholder: 'Ex: Programador Full Stack do Zero',
    help: 'O nome do produto que será vendido após o evento',
    required: true,
    level: 'rapid'
  },
  {
    id: 'class-schedule',
    category: 'Identificação Básica',
    question: 'Quais são as datas e horários das 3 aulas?',
    type: 'textarea',
    placeholder: 'Ex: Aula 1: 15/03 às 20h | Aula 2: 17/03 às 20h | Aula 3: 19/03 às 20h',
    help: 'Informe data e horário de cada aula',
    required: true,
    level: 'rapid'
  },
  {
    id: 'presenter-name',
    category: 'Identificação Básica',
    question: 'Qual é o seu nome (apresentador/mentor)?',
    type: 'text',
    placeholder: 'Ex: João Silva',
    help: 'Nome que aparecerá nas mensagens',
    required: true,
    level: 'rapid'
  },

  // 💡 PROMESSAS ESSENCIAIS (4 perguntas)
  {
    id: 'main-benefit',
    category: 'Promessas Essenciais',
    question: 'Qual é o benefício principal que você promete?',
    type: 'text',
    placeholder: 'Ex: se tornar um programador empregável em 6 meses',
    help: 'Seja específico e mensurável',
    required: true,
    level: 'rapid'
  },
  {
    id: 'expected-result',
    category: 'Promessas Essenciais',
    question: 'Qual é o resultado esperado específico?',
    type: 'text',
    placeholder: 'Ex: conquistar sua primeira vaga como desenvolvedor júnior',
    help: 'O resultado tangível que o aluno terá',
    required: true,
    level: 'rapid'
  },
  {
    id: 'time-dedication',
    category: 'Promessas Essenciais',
    question: 'Qual é o tempo necessário de dedicação?',
    type: 'text',
    placeholder: 'Ex: 30 minutos por dia',
    help: 'Seja realista para não criar falsas expectativas',
    required: true,
    level: 'rapid'
  },
  {
    id: 'unique-method',
    category: 'Promessas Essenciais',
    question: 'Qual é o grande diferencial do seu método?',
    type: 'text',
    placeholder: 'Ex: Método de Projetos Reais desde o Dia 1',
    help: 'O que torna seu método único no mercado',
    required: true,
    level: 'rapid'
  },

  // 💰 OFERTA BÁSICA (4 perguntas)
  {
    id: 'pricing',
    category: 'Oferta Básica',
    question: 'Qual é o preço original e o desconto especial?',
    type: 'text',
    placeholder: 'Ex: De R$ 2.997 por R$ 1.497 (50% OFF)',
    help: 'Mostre o valor cheio e o valor com desconto',
    required: true,
    level: 'rapid'
  },
  {
    id: 'payment-options',
    category: 'Oferta Básica',
    question: 'Quais são as opções de pagamento?',
    type: 'textarea',
    placeholder: 'Ex: 12x R$ 146,58 no cartão ou R$ 1.397 à vista',
    help: 'Liste todas as formas de pagamento disponíveis',
    required: true,
    level: 'rapid'
  },
  {
    id: 'offer-deadline',
    category: 'Oferta Básica',
    question: 'Qual é o prazo da oferta especial?',
    type: 'text',
    placeholder: 'Ex: 24 horas após abertura do carrinho',
    help: 'Crie urgência com prazo limitado',
    required: true,
    level: 'rapid'
  },
  {
    id: 'main-bonus',
    category: 'Oferta Básica',
    question: 'Qual é o principal bônus da oferta?',
    type: 'text',
    placeholder: 'Ex: Curso de JavaScript Avançado',
    help: 'O bônus mais atrativo da oferta',
    required: true,
    level: 'rapid'
  },

  // 🔗 LINKS ESSENCIAIS (3 perguntas)
  {
    id: 'class-links',
    category: 'Links Essenciais',
    question: 'Links das 3 aulas:',
    type: 'textarea',
    placeholder: 'Aula 1: https://youtube.com/...\nAula 2: https://youtube.com/...\nAula 3: https://youtube.com/...',
    help: 'Um link por linha',
    required: true,
    level: 'rapid'
  },
  {
    id: 'sales-page-link',
    category: 'Links Essenciais',
    question: 'Link da página de vendas:',
    type: 'text',
    placeholder: 'https://meusite.com/oferta',
    help: 'Link onde será feita a venda',
    required: true,
    level: 'rapid'
  },
  {
    id: 'verification-link',
    category: 'Links Essenciais',
    question: 'Link de verificação de contatos oficiais:',
    type: 'text',
    placeholder: 'https://meusite.com/contatos-oficiais',
    help: 'Para prevenir golpes e fraudes',
    required: true,
    level: 'rapid'
  }
];

// ==============================================
// 📋 PERGUNTAS NÍVEL COMPLETO (25 perguntas)
// ==============================================

const completeQuestions = [
  ...rapidQuestions,
  
  // 📚 CONTEÚDO DAS AULAS (5 perguntas adicionais)
  {
    id: 'class1-topics',
    category: 'Conteúdo das Aulas',
    question: 'Quais são os 3 tópicos principais da Aula 1?',
    type: 'textarea',
    placeholder: 'Ex: Os 3 pilares do programador de sucesso | Por que 87% falham | O caminho mais rápido',
    help: 'Separe os tópicos com | (barra vertical)',
    required: true,
    level: 'complete'
  },
  {
    id: 'class2-topics',
    category: 'Conteúdo das Aulas',
    question: 'Quais são os 3 tópicos principais da Aula 2?',
    type: 'textarea',
    placeholder: 'Ex: Como criar seu primeiro projeto | Ferramentas essenciais gratuitas | Passo a passo prático',
    help: 'Separe os tópicos com | (barra vertical)',
    required: true,
    level: 'complete'
  },
  {
    id: 'class3-revelation',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o conteúdo exclusivo/revelação da Aula 3?',
    type: 'text',
    placeholder: 'Ex: O Roadmap Secreto de 6 Meses + Estratégia de Portfolio Vencedor',
    help: 'A grande revelação ou conteúdo especial da última aula',
    required: true,
    level: 'complete'
  },
  {
    id: 'exclusive-material',
    category: 'Conteúdo das Aulas',
    question: 'Qual material/ferramenta exclusiva você entregará?',
    type: 'text',
    placeholder: 'Ex: Template de Portfolio que Converte + Checklist de Projetos',
    help: 'Material de valor que será entregue gratuitamente',
    required: true,
    level: 'complete'
  },
  {
    id: 'giveaway-prize',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o prêmio do sorteio durante as aulas?',
    type: 'text',
    placeholder: 'Ex: 1 mentoria individual de 1 hora',
    help: 'Prêmio para manter engajamento nas aulas ao vivo',
    required: true,
    level: 'complete'
  },

  // 🎁 BÔNUS E URGÊNCIA (5 perguntas adicionais)
  {
    id: 'all-bonuses',
    category: 'Bônus e Urgência',
    question: 'Liste TODOS os bônus da oferta:',
    type: 'textarea',
    placeholder: 'Ex: Curso de JavaScript Avançado | Mentoria em Grupo | Certificado | Acesso Vitalício | Comunidade VIP',
    help: 'Separe os bônus com | (barra vertical)',
    required: true,
    level: 'complete'
  },
  {
    id: 'first-buyers-bonus',
    category: 'Bônus e Urgência',
    question: 'Quais são os bônus para os primeiros inscritos?',
    type: 'textarea',
    placeholder: 'Ex: 50 primeiros: Curso de Git/GitHub | 150 primeiros: Pack de Templates | 200 primeiros: E-book LinkedIn',
    help: 'Crie escassez com bônus limitados',
    required: true,
    level: 'complete'
  },
  {
    id: 'vip-benefit',
    category: 'Bônus e Urgência',
    question: 'Qual benefício exclusivo da Lista VIP?',
    type: 'text',
    placeholder: 'Ex: Acesso 1 hora antes + Bônus extra de Setup Completo',
    help: 'Incentive a entrada na lista VIP',
    required: true,
    level: 'complete'
  },
  {
    id: 'daily-investment',
    category: 'Bônus e Urgência',
    question: 'Quanto fica o investimento por dia?',
    type: 'text',
    placeholder: 'Ex: Menos de R$ 4,00 por dia',
    help: 'Calcule o valor diário para facilitar a decisão',
    required: true,
    level: 'complete'
  },
  {
    id: 'guarantee',
    category: 'Bônus e Urgência',
    question: 'Existe garantia? Qual?',
    type: 'text',
    placeholder: 'Ex: Garantia incondicional de 30 dias',
    help: 'Especifique o tipo e prazo da garantia',
    required: true,
    level: 'complete'
  }
];

// ==============================================
// 🔬 PERGUNTAS NÍVEL DETALHADO (35 perguntas)
// ==============================================

const detailedQuestions = [
  ...completeQuestions,
  
  // 🎯 ESTRATÉGIAS AVANÇADAS (10 perguntas adicionais)
  {
    id: 'limitations-broken',
    category: 'Estratégias Avançadas',
    question: 'Quais são as 3 principais limitações que você quebra?',
    type: 'textarea',
    placeholder: 'Ex: não precisa de faculdade, não precisa ser bom em matemática, não precisa de experiência',
    help: 'Liste as objeções mais comuns que você elimina',
    required: true,
    level: 'detailed'
  },
  {
    id: 'comparison',
    category: 'Estratégias Avançadas',
    question: 'Qual comparação de gastos você usará?',
    type: 'textarea',
    placeholder: 'Ex: Pessoas gastam R$ 5.000 em faculdade por 4 anos sem garantia de emprego',
    help: 'Compare com outros investimentos comuns',
    required: true,
    level: 'detailed'
  },
  {
    id: 'success-story',
    category: 'Estratégias Avançadas',
    question: 'Conte uma história de sucesso de aluno (nome e resultado):',
    type: 'textarea',
    placeholder: 'Ex: Maria, de 35 anos, mãe solteira, conseguiu sua primeira vaga em 4 meses ganhando R$ 4.500',
    help: 'História real e específica para prova social',
    required: true,
    level: 'detailed'
  },
  {
    id: 'objection-handling',
    category: 'Estratégias Avançadas',
    question: 'Qual é a principal objeção que você vai abordar?',
    type: 'text',
    placeholder: 'Ex: "Não tenho tempo para estudar"',
    help: 'A objeção mais comum que impede a compra',
    required: true,
    level: 'detailed'
  },
  {
    id: 'fear-factor',
    category: 'Estratégias Avançadas',
    question: 'Qual medo comum você vai abordar nas mensagens?',
    type: 'text',
    placeholder: 'Ex: Medo de não conseguir aprender programação',
    help: 'Medos que você vai tranquilizar',
    required: true,
    level: 'detailed'
  },
  {
    id: 'extension-reason',
    category: 'Estratégias Avançadas',
    question: 'Qual justificativa você usará para extensão da oferta?',
    type: 'text',
    placeholder: 'Ex: Problemas técnicos no checkout | Muitos pedidos de segunda chance',
    help: 'Motivo crível para reabrir vendas',
    required: true,
    level: 'detailed'
  },
  {
    id: 'alternative-payment',
    category: 'Estratégias Avançadas',
    question: 'Qual nova forma de pagamento você oferecerá?',
    type: 'text',
    placeholder: 'Ex: PIX com desconto extra | Boleto parcelado',
    help: 'Opção adicional para remover objeções',
    required: true,
    level: 'detailed'
  },
  {
    id: 'platform',
    category: 'Estratégias Avançadas',
    question: 'Em qual plataforma será transmitido o evento?',
    type: 'select',
    options: [
      { value: 'youtube', label: 'YouTube' },
      { value: 'zoom', label: 'Zoom' },
      { value: 'instagram', label: 'Instagram Live' },
      { value: 'facebook', label: 'Facebook Live' },
      { value: 'outro', label: 'Outra plataforma' }
    ],
    required: true,
    level: 'detailed'
  },
  {
    id: 'scarcity-strategy',
    category: 'Estratégias Avançadas',
    question: 'Qual estratégia de escassez você usará?',
    type: 'text',
    placeholder: 'Ex: Apenas 500 vagas | Turma fecha em 72h | Última turma do ano',
    help: 'Elemento de escassez real da oferta',
    required: true,
    level: 'detailed'
  },
  {
    id: 'valuable-info',
    category: 'Estratégias Avançadas',
    question: 'Quais informações valiosas específicas você revelará?',
    type: 'textarea',
    placeholder: 'Ex: As 5 tecnologias mais procuradas em 2024 | Salários médios por região | Empresas que mais contratam',
    help: 'Informações exclusivas que agregarão valor',
    required: true,
    level: 'detailed'
  }
];

// ==============================================
// 📊 CONFIGURAÇÃO DOS NÍVEIS E EXPORTAÇÃO
// ==============================================

export const QUESTIONS_BY_LEVEL = {
  rapid: rapidQuestions,
  complete: completeQuestions,  
  detailed: detailedQuestions
};

export const LEVEL_METADATA = {
  rapid: {
    ...MESSAGES_LEVELS.rapid,
    questions: rapidQuestions,
    categories: [...new Set(rapidQuestions.map(q => q.category))]
  },
  complete: {
    ...MESSAGES_LEVELS.complete,
    questions: completeQuestions,
    categories: [...new Set(completeQuestions.map(q => q.category))]
  },
  detailed: {
    ...MESSAGES_LEVELS.detailed,
    questions: detailedQuestions,
    categories: [...new Set(detailedQuestions.map(q => q.category))]
  }
};

// ==============================================
// 🔄 COMPATIBILIDADE COM SISTEMA ANTERIOR
// ==============================================

// Para compatibilidade com o sistema anterior
export const messagesQuestions = completeQuestions;

// ==============================================
// 🚀 FUNÇÕES UTILITÁRIAS
// ==============================================

export const getQuestionsByLevel = (level) => {
  return QUESTIONS_BY_LEVEL[level] || QUESTIONS_BY_LEVEL.complete;
};

export const getLevelConfig = (level) => {
  return LEVEL_METADATA[level] || LEVEL_METADATA.complete;
};

export const getAllLevels = () => {
  return Object.values(MESSAGES_LEVELS);
};