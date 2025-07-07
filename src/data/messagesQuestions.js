export const messagesQuestions = [
  // 🎯 IDENTIFICAÇÃO DO EVENTO E PRODUTO (4 perguntas)
  {
    id: 'event-name',
    category: 'Identificação do Evento',
    question: 'Qual é o nome do seu evento gratuito?',
    type: 'text',
    placeholder: 'Ex: Semana do Código Lucrativo',
    help: 'Use um nome que transmita valor e resultado',
    required: true
  },
  {
    id: 'product-name',
    category: 'Identificação do Evento',
    question: 'Qual é o nome do seu produto/programa principal?',
    type: 'text',
    placeholder: 'Ex: Programador Full Stack do Zero',
    help: 'O nome do produto que será vendido após o evento',
    required: true
  },
  {
    id: 'class-schedule',
    category: 'Identificação do Evento',
    question: 'Quais são as datas e horários específicos das 3 aulas?',
    type: 'textarea',
    placeholder: 'Ex: Aula 1: 15/03 às 20h | Aula 2: 17/03 às 20h | Aula 3: 19/03 às 20h',
    help: 'Informe data e horário de cada aula',
    required: true
  },
  {
    id: 'platform',
    category: 'Identificação do Evento',
    question: 'Em qual plataforma será transmitido o evento?',
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

  // 💡 PROMESSAS E BENEFÍCIOS (5 perguntas)
  {
    id: 'main-benefit',
    category: 'Promessas e Benefícios',
    question: 'Qual é o benefício principal que você promete?',
    type: 'text',
    placeholder: 'Ex: se tornar um programador empregável em 6 meses',
    help: 'Seja específico e mensurável',
    required: true
  },
  {
    id: 'expected-result',
    category: 'Promessas e Benefícios',
    question: 'Qual é o resultado esperado específico?',
    type: 'text',
    placeholder: 'Ex: conquistar sua primeira vaga como desenvolvedor júnior',
    help: 'O resultado tangível que o aluno terá',
    required: true
  },
  {
    id: 'time-dedication',
    category: 'Promessas e Benefícios',
    question: 'Qual é o tempo necessário de dedicação?',
    type: 'text',
    placeholder: 'Ex: 30 minutos por dia',
    help: 'Seja realista para não criar falsas expectativas',
    required: true
  },
  {
    id: 'limitations-broken',
    category: 'Promessas e Benefícios',
    question: 'Quais são as 3 principais limitações que você quebra?',
    type: 'textarea',
    placeholder: 'Ex: não precisa de faculdade, não precisa ser bom em matemática, não precisa de experiência',
    help: 'Liste as objeções mais comuns que você elimina',
    required: true
  },
  {
    id: 'unique-method',
    category: 'Promessas e Benefícios',
    question: 'Qual é o grande diferencial/elemento exclusivo do seu método?',
    type: 'text',
    placeholder: 'Ex: Método de Projetos Reais desde o Dia 1',
    help: 'O que torna seu método único no mercado',
    required: true
  },

  // 📚 CONTEÚDO DAS AULAS (6 perguntas)
  {
    id: 'class1-topics',
    category: 'Conteúdo das Aulas',
    question: 'Quais são os 3 tópicos principais da Aula 1?',
    type: 'textarea',
    placeholder: 'Ex: Os 3 pilares do programador de sucesso | Por que 87% falham | O caminho mais rápido',
    help: 'Separe os tópicos com | (barra vertical)',
    required: true
  },
  {
    id: 'class2-topics',
    category: 'Conteúdo das Aulas',
    question: 'Quais são os 3 tópicos principais da Aula 2?',
    type: 'textarea',
    placeholder: 'Ex: Como criar seu primeiro projeto | Ferramentas essenciais gratuitas | Passo a passo prático',
    help: 'Separe os tópicos com | (barra vertical)',
    required: true
  },
  {
    id: 'class3-revelation',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o conteúdo exclusivo/revelação da Aula 3?',
    type: 'text',
    placeholder: 'Ex: O Roadmap Secreto de 6 Meses + Estratégia de Portfolio Vencedor',
    help: 'A grande revelação ou conteúdo especial da última aula',
    required: true
  },
  {
    id: 'exclusive-material',
    category: 'Conteúdo das Aulas',
    question: 'Qual material/ferramenta exclusiva você entregará?',
    type: 'text',
    placeholder: 'Ex: Template de Portfolio que Converte + Checklist de Projetos',
    help: 'Material de valor que será entregue gratuitamente',
    required: true
  },
  {
    id: 'giveaway-prize',
    category: 'Conteúdo das Aulas',
    question: 'Qual é o prêmio do sorteio durante as aulas?',
    type: 'text',
    placeholder: 'Ex: 1 mentoria individual de 1 hora',
    help: 'Prêmio para manter engajamento nas aulas ao vivo',
    required: true
  },
  {
    id: 'valuable-info',
    category: 'Conteúdo das Aulas',
    question: 'Quais informações valiosas específicas você revelará?',
    type: 'textarea',
    placeholder: 'Ex: As 5 tecnologias mais procuradas em 2024',
    help: 'Informações exclusivas que agregarão valor',
    required: true
  },

  // 💰 OFERTA E VALORES (5 perguntas)
  {
    id: 'pricing',
    category: 'Oferta e Valores',
    question: 'Qual é o preço original e o desconto especial?',
    type: 'text',
    placeholder: 'Ex: De R$ 2.997 por R$ 1.497 (50% OFF)',
    help: 'Mostre o valor cheio e o valor com desconto',
    required: true
  },
  {
    id: 'payment-options',
    category: 'Oferta e Valores',
    question: 'Quais são as opções de pagamento?',
    type: 'textarea',
    placeholder: 'Ex: 12x R$ 146,58 no cartão ou R$ 1.397 à vista',
    help: 'Liste todas as formas de pagamento disponíveis',
    required: true
  },
  {
    id: 'daily-investment',
    category: 'Oferta e Valores',
    question: 'Quanto fica o investimento por dia?',
    type: 'text',
    placeholder: 'Ex: Menos de R$ 4,00 por dia',
    help: 'Calcule o valor diário para facilitar a decisão',
    required: true
  },
  {
    id: 'offer-deadline',
    category: 'Oferta e Valores',
    question: 'Qual é o prazo da oferta especial?',
    type: 'text',
    placeholder: 'Ex: 24 horas após abertura do carrinho',
    help: 'Crie urgência com prazo limitado',
    required: true
  },
  {
    id: 'guarantee',
    category: 'Oferta e Valores',
    question: 'Existe garantia? Qual?',
    type: 'text',
    placeholder: 'Ex: Garantia incondicional de 30 dias',
    help: 'Especifique o tipo e prazo da garantia',
    required: true
  },

  // 🎁 BÔNUS E URGÊNCIA (5 perguntas)
  {
    id: 'main-bonuses',
    category: 'Bônus e Urgência',
    question: 'Liste os 5 principais bônus da oferta:',
    type: 'textarea',
    placeholder: 'Ex: Curso de JavaScript Avançado | Mentoria em Grupo | Certificado | Acesso Vitalício | Comunidade VIP',
    help: 'Separe os bônus com | (barra vertical)',
    required: true
  },
  {
    id: 'first-buyers-bonus',
    category: 'Bônus e Urgência',
    question: 'Quais são os bônus para os primeiros inscritos?',
    type: 'textarea',
    placeholder: 'Ex: 50 primeiros: Curso de Git/GitHub | 150 primeiros: Pack de Templates | 200 primeiros: E-book LinkedIn',
    help: 'Crie escassez com bônus limitados',
    required: true
  },
  {
    id: 'vip-benefit',
    category: 'Bônus e Urgência',
    question: 'Qual benefício exclusivo da Lista VIP?',
    type: 'text',
    placeholder: 'Ex: Acesso 1 hora antes + Bônus extra de Setup Completo',
    help: 'Incentive a entrada na lista VIP',
    required: true
  },
  {
    id: 'comparison',
    category: 'Bônus e Urgência',
    question: 'Qual comparação de gastos você usará?',
    type: 'textarea',
    placeholder: 'Ex: Pessoas gastam R$ 5.000 em faculdade por 4 anos sem garantia de emprego',
    help: 'Compare com outros investimentos comuns',
    required: true
  },
  {
    id: 'links',
    category: 'Bônus e Urgência',
    question: 'Liste todos os links necessários para o lançamento:',
    type: 'textarea',
    placeholder: 'Link da pesquisa inicial: \nLinks das 3 aulas: \nLink de verificação: \nLink da página de vendas: \nLink da lista VIP: \nLink de checkout: \nLinks alternativos:',
    help: 'Um link por linha com descrição',
    required: true
  }
];