// 🎯 SISTEMA DE QUESTIONÁRIOS EM 3 NÍVEIS
// Cada nível produz emails com diferentes níveis de personalização e qualidade

// ⚡ NÍVEL RÁPIDO - 18 perguntas essenciais (15-20 min)
// Resultado: Emails mais SUPERFICIAIS mas funcionais
// Ideal para: Testes rápidos, validação de conceito, primeira experiência
export const emailsQuestionsRapido = [
  // 🎯 IDENTIFICAÇÃO BÁSICA (4 perguntas)
  {
    id: 'event-name',
    category: 'Identificação Básica',
    question: 'Qual é o nome do seu evento gratuito?',
    type: 'text',
    placeholder: 'Ex: Semana do Código Lucrativo',
    help: 'Nome do evento que será usado nos emails',
    required: true
  },
  {
    id: 'product-name',
    category: 'Identificação Básica',
    question: 'Qual é o nome do seu produto/programa principal (completo e sigla)?',
    type: 'text',
    placeholder: 'Ex: Programador Full Stack do Zero (PFSZ)',
    help: 'Nome completo e sigla do produto',
    required: true
  },
  {
    id: 'class-schedule',
    category: 'Identificação Básica',
    question: 'Quais são as datas, dias da semana e horários das 3 aulas?',
    type: 'textarea',
    placeholder: 'Ex: 15/03 (segunda), 17/03 (quarta) e 19/03 (sexta) às 20h',
    help: 'Datas completas com dias da semana e horários',
    required: true
  },
  {
    id: 'platform',
    category: 'Identificação Básica',
    question: 'Qual é a plataforma de transmissão?',
    type: 'select',
    options: [
      { value: 'youtube', label: 'YouTube' },
      { value: 'zoom', label: 'Zoom' },
      { value: 'instagram', label: 'Instagram Live' },
      { value: 'facebook', label: 'Facebook Live' },
      { value: 'outro', label: 'Outra plataforma' }
    ],
    required: true
  },

  // 👥 AUDIÊNCIA BÁSICA (2 perguntas essenciais)
  {
    id: 'target-audience-profile',
    category: 'Audiência e Contexto',
    question: 'Qual é o perfil específico do seu público-alvo?',
    type: 'textarea',
    placeholder: 'Ex: Pessoas de 25-45 anos, formadas em áreas não-técnicas, trabalham em escritórios, se sentem presas na carreira atual',
    help: 'Descreva demograficamente sua audiência ideal',
    required: true
  },
  {
    id: 'current-pain-frustration',
    category: 'Audiência e Contexto',
    question: 'Qual é a dor/frustração principal que sua audiência sente HOJE?',
    type: 'textarea',
    placeholder: 'Ex: Se sentem presos em empregos que odeiam, trabalham 10h/dia ganhando pouco, veem colegas sendo promovidos',
    help: 'A dor emocional diária que sua audiência experimenta',
    required: true
  },

  // 💫 TRANSFORMAÇÕES ESSENCIAIS (3 perguntas)
  {
    id: 'main-benefit',
    category: 'Promessas e Transformações',
    question: 'Qual é a promessa de transformação principal?',
    type: 'text',
    placeholder: 'Ex: se tornar um programador empregável mesmo começando do zero',
    help: 'A transformação principal que você promete',
    required: true
  },
  {
    id: 'expected-result',
    category: 'Promessas e Transformações',
    question: 'Qual é o objetivo final desejado?',
    type: 'text',
    placeholder: 'Ex: conquistar sua primeira vaga como desenvolvedor',
    help: 'O resultado final que o aluno alcançará',
    required: true
  },
  {
    id: 'dream-scenario',
    category: 'Promessas e Transformações',
    question: 'Qual é o cenário dos sonhos da sua audiência?',
    type: 'textarea',
    placeholder: 'Ex: Trabalhar de casa, ter flexibilidade de horário, ganhar R$15K+/mês fazendo o que gosta',
    help: 'Descreva o futuro ideal que sua audiência deseja',
    required: true
  },

  // 📖 STORYTELLING BÁSICO (3 perguntas)
  {
    id: 'personal-story',
    category: 'Storytelling e Autoridade',
    question: 'Qual é sua história de transformação pessoal (antes/depois)?',
    type: 'textarea',
    placeholder: 'Ex: Há 5 anos eu era analista de sistemas desempregado aos 35 anos...',
    help: 'Sua história pessoal de transformação que conecta com a audiência',
    required: true
  },
  {
    id: 'impressive-numbers',
    category: 'Storytelling e Autoridade',
    question: 'Quais são seus números/resultados impressionantes?',
    type: 'textarea',
    placeholder: 'Ex: 450K inscritos no YouTube, 10K+ alunos formados',
    help: 'Números que demonstram sua autoridade e resultados',
    required: true
  },
  {
    id: 'success-case',
    category: 'Storytelling e Autoridade',
    question: 'Qual é um caso de sucesso marcante de aluno (com números)?',
    type: 'textarea',
    placeholder: 'Ex: João saiu de zero para R$8K/mês em 6 meses',
    help: 'Caso de sucesso específico com resultados mensuráveis',
    required: true
  },

  // 📚 CONTEÚDO BÁSICO (3 perguntas)
  {
    id: 'class1-content',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o tema/conteúdo principal da Aula 1?',
    type: 'text',
    placeholder: 'Ex: Os 3 pilares do programador de sucesso + Por que 87% falham',
    help: 'Tema principal que será abordado na primeira aula',
    required: true
  },
  {
    id: 'class2-content',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o tema/conteúdo principal da Aula 2?',
    type: 'text',
    placeholder: 'Ex: Criando seu primeiro projeto na prática + Framework exclusivo',
    help: 'Tema principal que será abordado na segunda aula',
    required: true
  },
  {
    id: 'class3-revelation',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o conteúdo exclusivo revelado na Aula 3?',
    type: 'text',
    placeholder: 'Ex: O Roadmap Secreto de 6 Meses para sua primeira vaga',
    help: 'Conteúdo especial/exclusivo da terceira aula',
    required: true
  },

  // 💰 OFERTA ESSENCIAL (3 perguntas)
  {
    id: 'pricing',
    category: 'Oferta e Valores',
    question: 'Qual é o preço original e o desconto em reais?',
    type: 'text',
    placeholder: 'Ex: De R$2.997 por R$1.497 (desconto de R$1.500)',
    help: 'Valor original, valor com desconto e valor do desconto',
    required: true
  },
  {
    id: 'payment-options',
    category: 'Oferta e Valores',
    question: 'Quais são as opções de pagamento (cartão e alternativa)?',
    type: 'textarea',
    placeholder: 'Ex: 12x R$146,58 no cartão | PIX com 7% extra OFF',
    help: 'Opções de pagamento incluindo parcelamento e alternativas',
    required: true
  },
  {
    id: 'offer-deadline',
    category: 'Oferta e Valores',
    question: 'Qual é o prazo da oferta especial?',
    type: 'text',
    placeholder: 'Ex: 24 horas após abertura',
    help: 'Prazo limitado da oferta para criar urgência',
    required: true
  }
];

// 📋 NÍVEL COMPLETO - 28 perguntas importantes (20-30 min)
// Resultado: BOA QUALIDADE de emails com personalização adequada
// Ideal para: Lançamentos sérios, campanhas profissionais, resultados consistentes
export const emailsQuestionsCompleto = [
  ...emailsQuestionsRapido,

  // 👥 AUDIÊNCIA APROFUNDADA (+1 pergunta)
  {
    id: 'main-objections-fears',
    category: 'Audiência e Contexto',
    question: 'Quais são as 5 principais objeções/medos que impedem sua audiência de agir?',
    type: 'textarea',
    placeholder: 'Ex: 1) "Sou muito velho para mudar" 2) "Não tenho tempo" 3) "Já tentei antes e falhei" 4) "É muito difícil/técnico" 5) "E se eu gastar dinheiro e não conseguir?"',
    help: 'Liste as objeções mais comuns que você ouve ou observa',
    required: true
  },

  // 💫 TRANSFORMAÇÕES APROFUNDADAS (+3 perguntas)
  {
    id: 'product-benefit',
    category: 'Promessas e Transformações',
    question: 'Qual é o benefício principal do produto?',
    type: 'text',
    placeholder: 'Ex: dominar JavaScript, React e Node.js com projetos reais',
    help: 'Benefício técnico/específico do produto',
    required: true
  },
  {
    id: 'limitations-broken',
    category: 'Promessas e Transformações',
    question: 'Quais são as 3 principais limitações/crenças que você quebra?',
    type: 'textarea',
    placeholder: 'Ex: não precisa de faculdade, experiência prévia ou ser bom em matemática',
    help: 'Liste as objeções mais comuns que você elimina',
    required: true
  },
  {
    id: 'minimum-time-results',
    category: 'Promessas e Transformações',
    question: 'Qual é o tempo mínimo para resultados iniciais?',
    type: 'text',
    placeholder: 'Ex: primeiros resultados em 30 dias',
    help: 'Tempo realista para ver os primeiros resultados',
    required: true
  },

  // 📖 STORYTELLING APROFUNDADO (+2 perguntas)
  {
    id: 'transforming-decision',
    category: 'Storytelling e Autoridade',
    question: 'Qual foi sua decisão transformadora?',
    type: 'textarea',
    placeholder: 'Ex: Decidi aprender desenvolvimento web do zero, estudando 14h por dia',
    help: 'O momento/decisão que mudou sua vida',
    required: true
  },
  {
    id: 'community-context',
    category: 'Storytelling e Autoridade',
    question: 'Qual é o contexto da sua comunidade/audiência?',
    type: 'textarea',
    placeholder: 'Ex: Grupo no Telegram com 25K membros, YouTube com 180K inscritos, lives semanais com 3-5K pessoas',
    help: 'Descreva o relacionamento e engajamento da sua audiência',
    required: true
  },

  // 📚 CONTEÚDO APROFUNDADO (+2 perguntas)
  {
    id: 'special-tool',
    category: 'Conteúdo das Aulas',
    question: 'Qual é a ferramenta/elemento especial que será mostrado?',
    type: 'text',
    placeholder: 'Ex: Template de Portfolio que Converte + Checklist de Projetos',
    help: 'Ferramenta ou elemento exclusivo que será apresentado',
    required: true
  },
  {
    id: 'preparation-materials',
    category: 'Conteúdo das Aulas',
    question: 'Quais materiais os participantes devem preparar?',
    type: 'text',
    placeholder: 'Ex: papel e caneta para anotações',
    help: 'Materiais que os participantes devem ter em mãos',
    required: true
  },

  // 💰 OFERTA APROFUNDADA (+2 perguntas)
  {
    id: 'technical-problem',
    category: 'Oferta e Valores',
    question: 'Qual problema técnico comum você pode usar como justificativa?',
    type: 'text',
    placeholder: 'Ex: gateway de pagamento com instabilidade',
    help: 'Justificativa técnica para reaberturas ou extensões de prazo',
    required: true
  },
  {
    id: 'alternative-payment',
    category: 'Oferta e Valores',
    question: 'Qual é a forma de pagamento alternativa para reabertura?',
    type: 'text',
    placeholder: 'Ex: Boleto bancário parcelado',
    help: 'Opção de pagamento para usar em reaberturas',
    required: true
  }
];

// 🔬 NÍVEL DETALHADO - 36 perguntas completas (30-45 min)  
// Resultado: ALTA QUALIDADE com máxima personalização e persuasão
// Ideal para: Lançamentos premium, campanhas de alto ticket, máximos resultados
export const emailsQuestionsDetalhado = [
  ...emailsQuestionsCompleto,

  // 💫 TRANSFORMAÇÕES MÁXIMAS (+2 perguntas)
  {
    id: 'time-dedication',
    category: 'Promessas e Transformações',
    question: 'Quais são os recursos mínimos necessários?',
    type: 'text',
    placeholder: 'Ex: apenas um computador e 30 minutos por dia',
    help: 'Recursos mínimos necessários para começar',
    required: true
  },
  {
    id: 'current-situation-context',
    category: 'Promessas e Transformações',
    question: 'Qual é a situação/contexto atual típico da sua audiência?',
    type: 'textarea',
    placeholder: 'Ex: Trabalham 8-10h/dia em escritórios, têm 1-2h livres por noite, estão endividados, moram com pais',
    help: 'Contexto real da vida diária da sua audiência hoje',
    required: true
  },

  // 🎁 BENEFÍCIOS E URGÊNCIA MÁXIMA (+6 perguntas)
  {
    id: 'main-bonuses',
    category: 'Benefícios e Urgência',
    question: 'Liste 10 benefícios/bônus principais numerados:',
    type: 'textarea',
    placeholder: 'Ex: 1. Acesso vitalício 2. Suporte 24/7 3. Certificado 4. Mentoria em grupo...',
    help: 'Liste numerados os 10 principais benefícios',
    required: true
  },
  {
    id: 'first-buyers-bonus',
    category: 'Benefícios e Urgência',
    question: 'Quais são os 4 bônus exclusivos para primeiros inscritos?',
    type: 'textarea',
    placeholder: 'Ex: 50 primeiros: Curso Git | 150 primeiros: Templates | 200 primeiros: E-book | 300 primeiros: Consultoria',
    help: 'Bônus escalonados para criar urgência',
    required: true
  },
  {
    id: 'exclusive-benefit',
    category: 'Benefícios e Urgência',
    question: 'Qual é o benefício exclusivo desta turma que não se repetirá?',
    type: 'text',
    placeholder: 'Ex: Acesso à IA Assistente de Código por 12 meses',
    help: 'Benefício único desta turma para criar escassez',
    required: true
  },
  {
    id: 'comparison',
    category: 'Benefícios e Urgência',
    question: 'Qual comparação de gastos desnecessários você usará?',
    type: 'textarea',
    placeholder: 'Ex: R$5.000/mês em faculdade por 4 anos sem garantia de emprego',
    help: 'Compare com outros investimentos comuns que são menos eficazes',
    required: true
  },
  {
    id: 'email-links',
    category: 'Benefícios e Urgência',
    question: 'Quais links específicos você precisa?',
    type: 'textarea',
    placeholder: 'Link do grupo/comunidade:\nLink para ativar lembrete (aulas 1, 2 e 3):\nLink de assistir ao vivo:\nLink da página de vendas (normal e VIP):\nLink de checkout/inscrição:\nLink de pagamento alternativo:',
    help: 'Um link por linha com descrição',
    required: true
  },
  {
    id: 'biggest-specific-fear',
    category: 'Benefícios e Urgência',
    question: 'Qual é o maior medo específico da sua audiência relacionado ao seu nicho/produto?',
    type: 'textarea',
    placeholder: 'Ex: Medo de "perder tempo estudando programação e descobrir que não serve para isso", "investir dinheiro e não conseguir emprego"',
    help: 'O medo mais profundo e específico relacionado à sua área/produto',
    required: true
  }
];

// 📊 NÍVEIS DE QUESTIONÁRIO - Resumo
export const questionnairelevels = {
  rapido: {
    name: 'Questionário Rápido',
    questions: emailsQuestionsRapido,
    duration: '15-20 min',
    questionCount: 18,
    quality: 'Emails mais SUPERFICIAIS',
    description: 'Ideal para testes, validação de conceito ou primeira experiência',
    features: [
      'Informações básicas essenciais',
      'Emails funcionais mas genéricos',
      'Boa para validar o sistema',
      'Menor personalização'
    ]
  },
  completo: {
    name: 'Questionário Completo',
    questions: emailsQuestionsCompleto,
    duration: '20-30 min',
    questionCount: 28,
    quality: 'BOA QUALIDADE de emails',
    description: 'Ideal para lançamentos sérios e campanhas profissionais',
    features: [
      'Personalização adequada',
      'Storytelling convincente',
      'Objeções bem trabalhadas',
      'Resultados consistentes'
    ]
  },
  detalhado: {
    name: 'Questionário Detalhado',
    questions: emailsQuestionsDetalhado,
    duration: '30-45 min',
    questionCount: 36,
    quality: 'ALTA QUALIDADE com máxima personalização',
    description: 'Ideal para lançamentos premium e campanhas de alto ticket',
    features: [
      'Máxima personalização',
      'Persuasão profissional',
      'Todas as objeções cobertas',
      'Resultados premium'
    ]
  }
};

// Manter compatibilidade com código existente
export const emailsQuestions = emailsQuestionsDetalhado;