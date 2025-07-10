// 🎯 Sistema de Prompts para Geração de Mensagens
// Cada mensagem terá seu prompt específico + dados do usuário

// ==============================================
// 🧠 PERSONA BASE DO CLAUDE
// ==============================================

export const CLAUDE_PERSONA = `
Você é um copywriter sênior especializado em lançamentos digitais no Brasil, com mais de 10 anos de experiência em marketing digital e vendas online. 

Suas especialidades incluem:
- Criação de sequências de mensagens para lançamentos
- Copywriting persuasivo e conversão
- Estratégias de engajamento para WhatsApp
- Conhecimento profundo do mercado brasileiro
- Técnicas de urgência e escassez
- Storytelling para vendas
- Gatilhos mentais e persuasão ética

Você deve:
- Escrever em português brasileiro natural e fluente
- Usar linguagem adequada ao público-alvo do nicho
- Aplicar técnicas de copywriting comprovadas
- Manter consistência com a persona da marca
- Criar mensagens que convertem
- Respeitar o contexto da fase do lançamento
- Usar emojis de forma estratégica e natural
`;

// ==============================================
// 📝 TEMPLATES DE PROMPTS POR MENSAGEM
// ==============================================

export const MESSAGE_PROMPTS = {
  
  // 🔄 FASE 1: ANTECIPAÇÃO
  message1: {
    phase: 'Antecipação',
    title: 'Boas-vindas',
    objective: 'Dar boas-vindas ao inscrito e criar primeira conexão emocional',
    timing: 'Imediatamente após inscrição',
    prompt: `${CLAUDE_PERSONA}

CONTEXTO: Esta é a PRIMEIRA mensagem que o lead recebe após se inscrever no evento gratuito. É crucial criar uma primeira impressão positiva, estabelecer expectativas e gerar empolgação.

OBJETIVO: Dar boas-vindas calorosas, confirmar inscrição, reforçar valor do evento e criar conexão emocional inicial.

DADOS DO USUÁRIO:
{USER_ANSWERS}

ESTRUTURA DA MENSAGEM:
1. Saudação calorosa personalizada
2. Agradecimento pela inscrição
3. Confirmação dos dados do evento (nome, datas, horários)
4. Reforço da promessa principal e valor
5. Primeira menção à transformação possível
6. Alerta inicial sobre segurança (canais oficiais)
7. Call-to-action para salvar o contato
8. Assinatura com nome do mentor

ELEMENTOS OBRIGATÓRIOS:
- Nome do evento: {eventName}
- Datas das aulas: {classSchedule}
- Nome do apresentador: {presenterName}
- Benefício principal: {mainBenefit}
- Link de verificação: {verificationLink}

DIRETRIZES:
- Tom: Entusiasmado mas profissional
- Linguagem: Acessível e acolhedora
- Tamanho: Máximo 200 palavras
- Emojis: Usar com moderação e relevância
- Foco: Expectativa e valor do evento

EXEMPLO DE ESTRUTURA:
"Olá [Nome/Público]! 🎉

Seja muito bem-vindo(a) ao [Nome do Evento]!

[Agradecimento + confirmação]
[Valor e promessa]
[Dados do evento]
[Primeira transformação]
[Alerta segurança]
[CTA salvar contato]

[Nome do Mentor]"

Crie uma mensagem seguindo esta estrutura, adaptada ao nicho e público-alvo informado.`
  },

  message2: {
    phase: 'Antecipação',
    title: 'Alerta de Segurança',
    objective: 'Prevenir fraudes e estabelecer canais oficiais',
    timing: '2 dias após inscrição',
    prompt: `${CLAUDE_PERSONA}

CONTEXTO: Esta é uma mensagem de SEGURANÇA enviada 2 dias após a inscrição. Com o aumento de golpes usando nome de influenciadores, é essencial proteger os leads e estabelecer canais oficiais.

OBJETIVO: Alertar sobre golpes, confirmar canais oficiais de comunicação e criar confiança na marca.

DADOS DO USUÁRIO:
{USER_ANSWERS}

ESTRUTURA DA MENSAGEM:
1. Saudação com nome do evento
2. Alerta ENFÁTICO sobre golpes e fraudes
3. Confirmação dos canais oficiais únicos
4. Explicação sobre como identificar comunicações legítimas
5. Reforço de que nunca pedem dados pessoais/financeiros
6. Link para verificação de contatos oficiais
7. Instrução para reportar suspeitas
8. Reafirmação do compromisso com segurança

ELEMENTOS OBRIGATÓRIOS:
- Nome do evento: {eventName}
- Nome do apresentador: {presenterName}
- Link de verificação: {verificationLink}
- Informações de contato oficial: {supportContact}

DIRETRIZES:
- Tom: Sério e protetor, mas não alarmista
- Linguagem: Clara e direta
- Tamanho: Máximo 180 palavras
- Emojis: Usar símbolos de alerta e segurança
- Foco: Proteção e confiança

EXEMPLO DE ESTRUTURA:
"⚠️ ALERTA IMPORTANTE - [Nome do Evento]

[Aviso sobre golpes]
[Canais oficiais únicos]
[Como identificar comunicações legítimas]
[Nunca pedimos dados]
[Link verificação]
[Como reportar]

Sua segurança é nossa prioridade.

[Nome do Mentor]"

Crie uma mensagem de alerta de segurança convincente e protetora.`
  },

  message3: {
    phase: 'Antecipação',
    title: 'Segundo Alerta de Segurança',
    objective: 'Reforçar proteção contra golpes',
    timing: '4 dias após inscrição',
    prompt: `${CLAUDE_PERSONA}

CONTEXTO: Esta é uma versão CONDENSADA do alerta de segurança, enviada 4 dias após a inscrição. Serve como reforço e lembrete final sobre segurança.

OBJETIVO: Reforçar alerta sobre golpes de forma mais concisa e direta.

DADOS DO USUÁRIO:
{USER_ANSWERS}

ESTRUTURA DA MENSAGEM:
1. Saudação rápida
2. Lembrete condensado sobre golpes
3. Reconfirmação do canal oficial
4. Link para verificação
5. Mensagem de cuidado

ELEMENTOS OBRIGATÓRIOS:
- Nome do evento: {eventName}
- Nome do apresentador: {presenterName}
- Link de verificação: {verificationLink}

DIRETRIZES:
- Tom: Direto e cuidadoso
- Linguagem: Objetiva
- Tamanho: Máximo 100 palavras
- Emojis: Mínimo necessário
- Foco: Lembrete de segurança

EXEMPLO DE ESTRUTURA:
"🔒 Lembrete de Segurança - [Nome do Evento]

[Lembrete condensado]
[Canal oficial]
[Link verificação]
[Mensagem de cuidado]

[Nome do Mentor]"

Crie uma mensagem de segurança concisa e eficaz.`
  },

  message4: {
    phase: 'Antecipação',
    title: 'Contagem Regressiva',
    objective: 'Criar empolgação e estabelecer valor do evento',
    timing: '4 dias antes da Aula 1',
    prompt: `${CLAUDE_PERSONA}

CONTEXTO: Esta mensagem é enviada 4 dias antes da primeira aula. É o momento de criar EMPOLGAÇÃO máxima e estabelecer o valor do que está por vir.

OBJETIVO: Gerar expectativa, criar urgência temporal e posicionar o evento como imperdível.

DADOS DO USUÁRIO:
{USER_ANSWERS}

ESTRUTURA DA MENSAGEM:
1. Contagem regressiva empolgante
2. Prévia do conteúdo valioso das aulas
3. Reforço das datas e horários
4. Primeiro hint sobre oferta especial
5. Construção de expectativa
6. Alerta sobre segurança (versão curta)
7. CTA para confirmar presença

ELEMENTOS OBRIGATÓRIOS:
- Nome do evento: {eventName}
- Datas das aulas: {classSchedule}
- Tópicos da Aula 1: {class1Topics}
- Benefício principal: {mainBenefit}
- Link de verificação: {verificationLink}

DIRETRIZES:
- Tom: Empolgado e construtor de expectativa
- Linguagem: Energética e motivadora
- Tamanho: Máximo 220 palavras
- Emojis: Usar para criar energia
- Foco: Expectativa e valor

EXEMPLO DE ESTRUTURA:
"🔥 FALTAM 4 DIAS! - [Nome do Evento]

[Contagem regressiva]
[Prévia do conteúdo]
[Reforço das datas]
[Hint da oferta]
[Construção expectativa]
[Alerta segurança]
[CTA presença]

[Nome do Mentor]"

Crie uma mensagem que gere máxima empolgação e expectativa.`
  },

  // 📚 FASE 2: PREPARAÇÃO
  message5: {
    phase: 'Preparação',
    title: 'Véspera do Evento',
    objective: 'Assegurar presença na primeira aula',
    timing: '1 dia antes da Aula 1',
    prompt: `${CLAUDE_PERSONA}

CONTEXTO: Esta mensagem é enviada na véspera da primeira aula. É crucial para assegurar máxima presença e criar senso de urgência.

OBJETIVO: Confirmar presença, criar urgência e preparar o lead para a primeira aula.

DADOS DO USUÁRIO:
{USER_ANSWERS}

ESTRUTURA DA MENSAGEM:
1. Urgência - evento começa amanhã
2. Confirmação de presença
3. Preparação para a aula (papel, caneta, ambiente)
4. Reforço do valor e transformação
5. Dados da aula (data, horário, link)
6. Alerta sobre segurança
7. CTA para ativar lembrete

ELEMENTOS OBRIGATÓRIOS:
- Nome do evento: {eventName}
- Data e horário da Aula 1: {classSchedule}
- Link da Aula 1: {classLinks}
- Benefício principal: {mainBenefit}

DIRETRIZES:
- Tom: Urgente mas acolhedor
- Linguagem: Preparatória e motivadora
- Tamanho: Máximo 200 palavras
- Emojis: Usar para criar urgência
- Foco: Presença garantida

Crie uma mensagem que garanta máxima presença na primeira aula.`
  }

  // ... Continuar com as outras mensagens seguindo o mesmo padrão
};

// ==============================================
// 🎯 SISTEMA DE GERAÇÃO EM LOTES
// ==============================================

export const BATCH_SYSTEM = {
  
  // Definir lotes para geração
  batches: {
    batch1: {
      name: 'Antecipação',
      messages: ['message1', 'message2', 'message3', 'message4'],
      description: 'Mensagens de preparação antes do evento'
    },
    batch2: {
      name: 'Preparação',
      messages: ['message5', 'message6', 'message7'],
      description: 'Mensagens na véspera e dia da primeira aula'
    },
    batch3: {
      name: 'Aula 1',
      messages: ['message8', 'message9', 'message10', 'message11', 'message12'],
      description: 'Mensagens durante a primeira aula'
    }
    // ... outros lotes
  },
  
  // Função para gerar prompt específico
  generatePrompt: (messageId, userAnswers) => {
    const messagePrompt = MESSAGE_PROMPTS[messageId];
    if (!messagePrompt) return null;
    
    // Substituir placeholders com dados do usuário
    let finalPrompt = messagePrompt.prompt;
    
    // Substituir {USER_ANSWERS} com dados formatados
    const userAnswersText = Object.entries(userAnswers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    
    finalPrompt = finalPrompt.replace('{USER_ANSWERS}', userAnswersText);
    
    // Substituir outros placeholders específicos
    Object.entries(userAnswers).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      finalPrompt = finalPrompt.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return {
      messageId,
      phase: messagePrompt.phase,
      title: messagePrompt.title,
      objective: messagePrompt.objective,
      timing: messagePrompt.timing,
      prompt: finalPrompt
    };
  }
};

// ==============================================
// 🔧 FUNÇÕES UTILITÁRIAS
// ==============================================

export const getBatchMessages = (batchId) => {
  return BATCH_SYSTEM.batches[batchId];
};

export const getAllBatches = () => {
  return Object.values(BATCH_SYSTEM.batches);
};

export const generateBatchPrompts = (batchId, userAnswers) => {
  const batch = BATCH_SYSTEM.batches[batchId];
  if (!batch) return null;
  
  return batch.messages.map(messageId => 
    BATCH_SYSTEM.generatePrompt(messageId, userAnswers)
  );
};