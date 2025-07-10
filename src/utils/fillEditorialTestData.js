// Script para preencher dados de teste na Linha Editorial
// Execute este script no console do navegador na página da Linha Editorial

export const fillEditorialTestData = () => {
  const testData = {
    1: "Marketing digital para coaches e consultores", // Nicho
    2: "Mentoria em grupo 'Autoridade Digital' - programa completo de 12 semanas para coaches construírem sua presença online e escalarem seus negócios digitalmente", // Produto
    3: "R$ 5.997", // Preço
    4: "70", // Dias antes do lançamento
    5: "Coach empresarial ou de vida, entre 30-50 anos, já atende alguns clientes presencialmente, faturamento atual entre R$ 10-30k/mês, quer escalar digitalmente mas não sabe por onde começar. Tem conhecimento técnico na área mas pouca experiência com marketing digital.", // Persona
    6: "Não consegue se posicionar como autoridade digital, tem dificuldade para atrair clientes de forma consistente online, depende muito de indicações e networking presencial, não sabe como precificar seus serviços digitais.", // Problema principal
    7: "Ter um negócio digital escalável que gere pelo menos R$ 50k/mês de forma consistente, ser reconhecido como autoridade no seu nicho, ter uma base sólida de leads qualificados chegando automaticamente, conseguir cobrar valores premium pelos seus serviços.", // Objetivo
    8: "Método ADS - Autoridade Digital Sustentável", // Nome do método
    9: "Único método que combina posicionamento estratégico + sistema de conteúdo + automação de vendas em uma abordagem integrada. Diferente de outros cursos que focam só em uma área, nosso método trabalha os 3 pilares simultaneamente. Suporte 1:1 por 90 dias e comunidade ativa com networking real.", // Diferenciais
    10: "15 anos como coach empresarial, formei mais de 2.000 coaches presenciais, ajudei 300+ profissionais a migrarem para o digital com faturamento médio de R$ 80k no primeiro ano, autor do livro 'Coaching Digital', palestrante em 50+ eventos do setor.", // Autoridade
    11: "Sim, tenho mais de 100 casos documentados de alunos que tiveram resultados expressivos. Posso compartilhar 10 casos principais com autorização dos clientes.", // Tem casos
    12: `Maria Silva - era coach de carreira presencial, faturava R$ 8k/mês, após 6 meses fatura R$ 45k/mês com mentorias online
João Santos - consultor organizacional, de R$ 15k passou para R$ 80k/mês em 10 meses
Ana Costa - coach de relacionamentos, criou infoproduto que gera R$ 30k/mês passivos
Carlos Ferreira - de coach iniciante para R$ 60k/mês em 8 meses com programa de grupo
Luciana Oliveira - especialista em liderança, escalou de R$ 20k para R$ 120k/mês`, // Cases específicos
    13: "both", // Canais (Instagram + YouTube)
    14: "alta", // Disponibilidade (5+h por dia)
    15: `1. Não tenho tempo para criar conteúdo toda semana
2. É muito caro para meu momento atual
3. Já tentei outros cursos de marketing digital e não funcionou
4. Meu nicho é muito específico, essas estratégias não vão funcionar para mim
5. Não domino tecnologia suficiente para implementar
6. Tenho medo de me expor nas redes sociais
7. Não sei se consigo manter a constância necessária
8. Meus clientes são mais tradicionais, não estão no digital
9. Já tenho uma boa carteira de clientes, não preciso de mais
10. Vou esperar ter mais experiência antes de investir nisso`, // Objeções principais
    16: "Não é o momento certo para investir, preciso focar primeiro em estabilizar meu negócio atual", // Principal desculpa
    17: "5 pilares", // Quantidade de etapas
    18: `Pilar 1: Posicionamento Estratégico - definir nicho, avatar e proposta de valor única
Pilar 2: Autoridade de Conteúdo - sistema de criação de conteúdo que educa e vende
Pilar 3: Captura e Nutrição - funis automatizados para converter audiência em leads
Pilar 4: Conversão Premium - estratégias para vender serviços de alto valor
Pilar 5: Escalabilidade - sistemas e processos para crescer sem depender só do seu tempo`, // Descrição dos pilares
    19: "Primeiros resultados em 30 dias (posicionamento e primeiros conteúdos), implementação dos funis em 60 dias, primeiros clientes digitais em 90 dias, negócio escalado e sistematizado em 6 meses", // Tempo de resultados
    20: `Comecei como coach há 15 anos, atendia apenas presencialmente em São Paulo. Durante muito tempo, meu maior desafio era a limitação geográfica - só conseguia impactar pessoas da minha cidade e dependia totalmente de indicações.

Em 2018, uma crise pessoal (divórcio + pandemia depois) me forçou a repensar o negócio. Perdi 70% dos clientes da noite para o dia. Foi aí que decidi migrar para o digital, mas sem conhecimento nenhum.

Passei 2 anos errando muito, gastei mais de R$ 50k em cursos que não funcionaram para coaches, tentei copiar estratégias de outros nichos. Quase desisti.

O ponto de virada foi quando entendi que coach precisa de uma abordagem diferente - não pode vender como quem vende curso, nem se posicionar como influencer. Desenvolvi então meu próprio método.

Hoje faturo consistentemente R$ 200k+/mês, tenho uma comunidade de 15k coaches, meu negócio roda sem depender da minha presença física e impacto profissionais do Brasil inteiro. Quero ensinar outros coaches a fazer essa mesma transição de forma mais rápida e assertiva.` // História de transformação
  };

  // Função para preencher no localStorage
  const fillLocalStorage = () => {
    localStorage.setItem('editorial-answers', JSON.stringify(testData));
    console.log('✅ Dados de teste salvos no localStorage!');
    console.log('📝 Dados salvos:', testData);
    
    // Recarrega a página para aplicar os dados
    if (confirm('Dados preenchidos! Deseja recarregar a página para aplicar as mudanças?')) {
      window.location.reload();
    }
  };

  // Função para preencher formulário ativo (se estiver na página de perguntas)
  const fillActiveForm = () => {
    // Tenta encontrar campos de input ativos
    const textarea = document.querySelector('textarea');
    const input = document.querySelector('input[type="text"], input[type="number"]');
    const select = document.querySelector('select');
    
    if (textarea || input || select) {
      // Descobre qual pergunta está ativa baseada no texto da pergunta
      const questionText = document.querySelector('h2')?.textContent;
      
      if (questionText) {
        let questionId = null;
        
        // Mapear perguntas por texto para descobrir o ID
        if (questionText.includes('nicho') || questionText.includes('mercado de atuação')) questionId = 1;
        else if (questionText.includes('produto') || questionText.includes('serviço você vai lançar')) questionId = 2;
        else if (questionText.includes('preço')) questionId = 3;
        else if (questionText.includes('dias antes')) questionId = 4;
        else if (questionText.includes('persona principal')) questionId = 5;
        else if (questionText.includes('problema que seu produto resolve')) questionId = 6;
        else if (questionText.includes('objetivo') && questionText.includes('resultado')) questionId = 7;
        else if (questionText.includes('nome do seu método')) questionId = 8;
        else if (questionText.includes('diferenciais')) questionId = 9;
        else if (questionText.includes('autoridade') || questionText.includes('experiência')) questionId = 10;
        else if (questionText.includes('alunos') && questionText.includes('resultados comprovados')) questionId = 11;
        else if (questionText.includes('casos de sucesso')) questionId = 12;
        else if (questionText.includes('canais')) questionId = 13;
        else if (questionText.includes('disponibilidade')) questionId = 14;
        else if (questionText.includes('objeções')) questionId = 15;
        else if (questionText.includes('desculpa')) questionId = 16;
        else if (questionText.includes('etapas') || questionText.includes('pilares')) questionId = 17;
        else if (questionText.includes('descrever brevemente')) questionId = 18;
        else if (questionText.includes('tempo médio')) questionId = 19;
        else if (questionText.includes('história de transformação')) questionId = 20;
        
        if (questionId && testData[questionId]) {
          if (textarea) {
            textarea.value = testData[questionId];
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
          } else if (input) {
            input.value = testData[questionId];
            input.dispatchEvent(new Event('input', { bubbles: true }));
          } else if (select) {
            select.value = testData[questionId];
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }
          
          console.log(`✅ Pergunta ${questionId} preenchida:`, testData[questionId]);
        }
      }
    }
  };

  return {
    fillLocalStorage,
    fillActiveForm,
    testData,
    // Função completa que tenta ambas as abordagens
    fill: () => {
      console.log('🚀 Iniciando preenchimento de dados de teste...');
      
      // Tenta preencher formulário ativo primeiro
      fillActiveForm();
      
      // Depois salva no localStorage
      fillLocalStorage();
      
      console.log('📋 Use fillEditorialTestData.fillActiveForm() para preencher apenas a pergunta atual');
      console.log('💾 Use fillEditorialTestData.fillLocalStorage() para salvar todos os dados');
    }
  };
};

// Para usar no console:
// 1. Cole este código no console
// 2. Execute: const filler = fillEditorialTestData()
// 3. Execute: filler.fill() para preencher tudo
// 4. Ou execute: filler.fillActiveForm() para preencher só a pergunta atual

// Auto-execução se estiver importando como módulo
if (typeof window !== 'undefined') {
  window.fillEditorialTestData = fillEditorialTestData;
  console.log('✅ Script carregado! Use fillEditorialTestData().fill() para preencher os dados de teste');
}