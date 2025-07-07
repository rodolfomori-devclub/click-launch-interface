export const emailsQuestions = [
  // 🎯 1. IDENTIFICAÇÃO BÁSICA (4 perguntas)
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

  // 💫 2. PROMESSAS E TRANSFORMAÇÕES (6 perguntas)
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
    id: 'product-benefit',
    category: 'Promessas e Transformações',
    question: 'Qual é o benefício principal do produto?',
    type: 'text',
    placeholder: 'Ex: dominar JavaScript, React e Node.js com projetos reais',
    help: 'Benefício técnico/específico do produto',
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
    id: 'time-dedication',
    category: 'Promessas e Transformações',
    question: 'Quais são os recursos mínimos necessários?',
    type: 'text',
    placeholder: 'Ex: apenas um computador e 30 minutos por dia',
    help: 'Recursos mínimos necessários para começar',
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

  // 📖 3. STORYTELLING E AUTORIDADE (4 perguntas)
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
    id: 'transforming-decision',
    category: 'Storytelling e Autoridade',
    question: 'Qual foi sua decisão transformadora?',
    type: 'textarea',
    placeholder: 'Ex: Decidi aprender desenvolvimento web do zero, estudando 14h por dia',
    help: 'O momento/decisão que mudou sua vida',
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

  // 📚 4. CONTEÚDO DAS AULAS (5 perguntas)
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

  // 💰 5. OFERTA E VALORES (5 perguntas)
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
  },
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
  },

  // 🎁 6. BENEFÍCIOS E URGÊNCIA (5 perguntas)
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
  }
];

// Total de 29 perguntas organizadas nas 6 categorias principais