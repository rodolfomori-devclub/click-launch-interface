// Script para preencher dados de teste - Curso de Programação do Zero
// Execute este script no console do navegador na página da Linha Editorial

export const fillEditorialProgramacaoTestData = () => {
  const testData = {
    1: "Educação em tecnologia e programação para iniciantes completos", // Nicho
    
    2: "Curso 'Dev do Zero ao Primeiro Emprego' - programa completo de 8 meses que ensina programação web (HTML, CSS, JavaScript, React, Node.js) com foco em empregabilidade, incluindo projetos reais, portfólio e preparação para entrevistas técnicas", // Produto
    
    3: "R$ 2.497", // Preço
    
    4: "70", // Dias antes do lançamento
    
    5: "Pessoa entre 18-35 anos, sem conhecimento em programação, pode ser recém-formada em qualquer área, desempregada ou insatisfeita com carreira atual, tem ensino médio completo, quer uma transição de carreira para tech mas não sabe por onde começar. Busca estabilidade financeira e oportunidades no mercado de tecnologia.", // Persona
    
    6: "Não sabe por onde começar a estudar programação, se sente perdido com tantas linguagens e tecnologias diferentes, tem medo de não conseguir aprender (acha que programação é só para 'pessoas inteligentes'), não consegue manter consistência nos estudos, não sabe como montar um portfólio atrativo para empresas.", // Problema principal
    
    7: "Conseguir o primeiro emprego como desenvolvedor(a) web em até 12 meses, ter um salário inicial de pelo menos R$ 3.500, dominar as principais tecnologias do mercado web, ter um portfólio com 5+ projetos reais, estar preparado(a) para entrevistas técnicas e processos seletivos de empresas de tecnologia.", // Objetivo
    
    8: "Método ZER0 - Zero ao Emprego Rápido Otimizado", // Nome do método
    
    9: "Único curso que foca 100% na empregabilidade real, não apenas no ensino técnico. Metodologia de projetos práticos desde a primeira semana, simulações reais de entrevistas, mentoria individual para construção de portfólio, parceria com +50 empresas para indicação de vagas, suporte até conseguir o primeiro emprego (não tem prazo limite).", // Diferenciais
    
    10: "8 anos como desenvolvedor sênior em startups e big techs (Google, Nubank), contratei +100 desenvolvedores júnior, formei mais de 1.500 pessoas que conseguiram emprego em tech, criador de conteúdo com 200k seguidores falando sobre carreira em programação, mentor em bootcamps reconhecidos do mercado.", // Autoridade
    
    11: "Sim, tenho mais de 300 casos documentados de alunos que conseguiram emprego após o curso. Posso compartilhar 15 casos principais com autorização e comprovação via LinkedIn.", // Tem casos
    
    12: `Pedro Silva - era segurança, 0 conhecimento em tech, hoje é desenvolvedor React na Stone com salário de R$ 6.500
Ana Rodrigues - pedagoga desempregada, conseguiu vaga de frontend na iFood por R$ 4.200 em 7 meses
Carlos Santos - vendedor de loja, virou desenvolvedor full-stack na Pagar.me por R$ 5.800
Mariana Costa - recém-formada em direito, hoje desenvolvedora no Mercado Livre por R$ 7.200
Lucas Oliveira - estava no interior sem oportunidades, conseguiu vaga remota na Locaweb por R$ 4.500
Juliana Ferreira - mãe solo, fez transição para desenvolvedora e trabalha home office por R$ 5.200
Roberto Alves - tinha 42 anos, conseguiu primeiro emprego como dev na Zé Delivery por R$ 4.800
Camila Souza - estagiária de marketing, virou desenvolvedora frontend no PicPay por R$ 6.000`, // Cases específicos
    
    13: "both", // Canais (Instagram + YouTube)
    
    14: "alta", // Disponibilidade (5+h por dia)
    
    15: `1. Não tenho tempo para estudar todo dia (trabalho/faculdade)
2. É muito caro e não tenho condições no momento
3. Sou muito velho(a) para aprender programação agora
4. Acho que não sou inteligente o suficiente para programar
5. Já tentei aprender sozinho(a) e desisti, não vai ser diferente
6. Tenho medo de investir e não conseguir emprego depois
7. O mercado está saturado, é difícil conseguir vaga de júnior
8. Não tenho computador bom o suficiente para programar
9. Não sei inglês, isso vai me atrapalhar muito
10. Preciso trabalhar enquanto estudo, não vai dar tempo`, // Objeções principais
    
    16: "Não é o momento certo, vou esperar ter mais tempo livre para me dedicar completamente", // Principal desculpa
    
    17: "4 fases progressivas", // Quantidade de etapas
    
    18: `Fase 1: Fundamentos (2 meses) - Lógica de programação, HTML, CSS, JavaScript básico, Git/GitHub, primeiro projeto
Fase 2: Frontend Avançado (2 meses) - React, APIs, responsividade, projetos mais complexos, trabalho em equipe
Fase 3: Backend e Full-stack (3 meses) - Node.js, bancos de dados, autenticação, deploy, projeto full-stack completo
Fase 4: Empregabilidade (1 mês) - Finalização do portfólio, LinkedIn otimizado, simulações de entrevista, aplicação para vagas`, // Descrição das fases
    
    19: "Primeiro projeto funcional em 3 semanas, domínio do frontend em 4 meses, projeto full-stack completo em 7 meses, preparação para mercado de trabalho em 8 meses, expectativa de conseguir primeira entrevista entre 6-10 meses", // Tempo de resultados
    
    20: `Comecei minha carreira em programação aos 28 anos, vindo de uma formação completamente diferente - era formado em administração e trabalhava no setor financeiro.

Em 2015, estava insatisfeito com minha carreira, ganhava pouco e não via perspectiva de crescimento. Decidi aprender programação por conta própria, mas foi um caos total - estudei por quase 2 anos sem direção, pulando de linguagem em linguagem, sem conseguir fazer nada funcionar de verdade.

Quase desisti várias vezes, achava que não tinha "o dom" para programação. O ponto de virada foi quando parei de estudar teoria e comecei a focar em projetos práticos. Em 6 meses fazendo projetos reais, aprendi mais do que em 2 anos só vendo vídeos.

Consegui minha primeira vaga como desenvolvedor júnior aos 30 anos, ganhando R$ 3.200. Hoje, 8 anos depois, sou tech lead em uma startup, ganho R$ 25k/mês e trabalho 100% remoto.

Durante esses anos contratando pessoas, percebi que a maioria dos cursos ensina tecnologia, mas não ensina como conseguir emprego. Por isso criei meu método focado 100% em empregabilidade - quero que outras pessoas façam essa transição de forma mais rápida e assertiva do que eu fiz.` // História de transformação
  };

  // Função para preencher no localStorage
  const fillLocalStorage = () => {
    localStorage.setItem('editorial-answers', JSON.stringify(testData));
    console.log('✅ Dados de teste (Programação) salvos no localStorage!');
    console.log('📝 Dados salvos:', testData);
    
    // Recarrega a página para aplicar os dados
    if (confirm('Dados de programação preenchidos! Deseja recarregar a página para aplicar as mudanças?')) {
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
      console.log('🚀 Iniciando preenchimento de dados de teste (Curso de Programação)...');
      
      // Tenta preencher formulário ativo primeiro
      fillActiveForm();
      
      // Depois salva no localStorage
      fillLocalStorage();
      
      console.log('📋 Use fillEditorialProgramacaoTestData.fillActiveForm() para preencher apenas a pergunta atual');
      console.log('💾 Use fillEditorialProgramacaoTestData.fillLocalStorage() para salvar todos os dados');
    }
  };
};

// Para usar no console:
// 1. Cole este código no console
// 2. Execute: const filler = fillEditorialProgramacaoTestData()
// 3. Execute: filler.fill() para preencher tudo
// 4. Ou execute: filler.fillActiveForm() para preencher só a pergunta atual

// Auto-execução se estiver importando como módulo
if (typeof window !== 'undefined') {
  window.fillEditorialProgramacaoTestData = fillEditorialProgramacaoTestData;
  console.log('✅ Script de Programação carregado! Use fillEditorialProgramacaoTestData().fill() para preencher os dados');
}