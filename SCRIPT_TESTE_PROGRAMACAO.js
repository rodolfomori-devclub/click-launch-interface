// SCRIPT DE TESTE - CURSO DE PROGRAMAÇÃO
// Cole este código completo no console do navegador

// Dados do curso de programação
const dadosProgramacao = {
  1: "Educação em tecnologia e programação para iniciantes completos",
  2: "Curso 'Dev do Zero ao Primeiro Emprego' - programa completo de 8 meses que ensina programação web (HTML, CSS, JavaScript, React, Node.js) com foco em empregabilidade, incluindo projetos reais, portfólio e preparação para entrevistas técnicas",
  3: "R$ 2.497",
  4: "70",
  5: "Pessoa entre 18-35 anos, sem conhecimento em programação, pode ser recém-formada em qualquer área, desempregada ou insatisfeita com carreira atual, tem ensino médio completo, quer uma transição de carreira para tech mas não sabe por onde começar. Busca estabilidade financeira e oportunidades no mercado de tecnologia.",
  6: "Não sabe por onde começar a estudar programação, se sente perdido com tantas linguagens e tecnologias diferentes, tem medo de não conseguir aprender (acha que programação é só para 'pessoas inteligentes'), não consegue manter consistência nos estudos, não sabe como montar um portfólio atrativo para empresas.",
  7: "Conseguir o primeiro emprego como desenvolvedor(a) web em até 12 meses, ter um salário inicial de pelo menos R$ 3.500, dominar as principais tecnologias do mercado web, ter um portfólio com 5+ projetos reais, estar preparado(a) para entrevistas técnicas e processos seletivos de empresas de tecnologia.",
  8: "Método ZER0 - Zero ao Emprego Rápido Otimizado",
  9: "Único curso que foca 100% na empregabilidade real, não apenas no ensino técnico. Metodologia de projetos práticos desde a primeira semana, simulações reais de entrevistas, mentoria individual para construção de portfólio, parceria com +50 empresas para indicação de vagas, suporte até conseguir o primeiro emprego (não tem prazo limite).",
  10: "8 anos como desenvolvedor sênior em startups e big techs (Google, Nubank), contratei +100 desenvolvedores júnior, formei mais de 1.500 pessoas que conseguiram emprego em tech, criador de conteúdo com 200k seguidores falando sobre carreira em programação, mentor em bootcamps reconhecidos do mercado.",
  11: "Sim, tenho mais de 300 casos documentados de alunos que conseguiram emprego após o curso. Posso compartilhar 15 casos principais com autorização e comprovação via LinkedIn.",
  12: "Pedro Silva - era segurança, 0 conhecimento em tech, hoje é desenvolvedor React na Stone com salário de R$ 6.500\nAna Rodrigues - pedagoga desempregada, conseguiu vaga de frontend na iFood por R$ 4.200 em 7 meses\nCarlos Santos - vendedor de loja, virou desenvolvedor full-stack na Pagar.me por R$ 5.800\nMariana Costa - recém-formada em direito, hoje desenvolvedora no Mercado Livre por R$ 7.200\nLucas Oliveira - estava no interior sem oportunidades, conseguiu vaga remota na Locaweb por R$ 4.500\nJuliana Ferreira - mãe solo, fez transição para desenvolvedora e trabalha home office por R$ 5.200\nRoberto Alves - tinha 42 anos, conseguiu primeiro emprego como dev na Zé Delivery por R$ 4.800\nCamila Souza - estagiária de marketing, virou desenvolvedora frontend no PicPay por R$ 6.000",
  13: "both",
  14: "alta",
  15: "1. Não tenho tempo para estudar todo dia (trabalho/faculdade)\n2. É muito caro e não tenho condições no momento\n3. Sou muito velho(a) para aprender programação agora\n4. Acho que não sou inteligente o suficiente para programar\n5. Já tentei aprender sozinho(a) e desisti, não vai ser diferente\n6. Tenho medo de investir e não conseguir emprego depois\n7. O mercado está saturado, é difícil conseguir vaga de júnior\n8. Não tenho computador bom o suficiente para programar\n9. Não sei inglês, isso vai me atrapalhar muito\n10. Preciso trabalhar enquanto estudo, não vai dar tempo",
  16: "Não é o momento certo, vou esperar ter mais tempo livre para me dedicar completamente",
  17: "4 fases progressivas",
  18: "Fase 1: Fundamentos (2 meses) - Lógica de programação, HTML, CSS, JavaScript básico, Git/GitHub, primeiro projeto\nFase 2: Frontend Avançado (2 meses) - React, APIs, responsividade, projetos mais complexos, trabalho em equipe\nFase 3: Backend e Full-stack (3 meses) - Node.js, bancos de dados, autenticação, deploy, projeto full-stack completo\nFase 4: Empregabilidade (1 mês) - Finalização do portfólio, LinkedIn otimizado, simulações de entrevista, aplicação para vagas",
  19: "Primeiro projeto funcional em 3 semanas, domínio do frontend em 4 meses, projeto full-stack completo em 7 meses, preparação para mercado de trabalho em 8 meses, expectativa de conseguir primeira entrevista entre 6-10 meses",
  20: "Comecei minha carreira em programação aos 28 anos, vindo de uma formação completamente diferente - era formado em administração e trabalhava no setor financeiro.\n\nEm 2015, estava insatisfeito com minha carreira, ganhava pouco e não via perspectiva de crescimento. Decidi aprender programação por conta própria, mas foi um caos total - estudei por quase 2 anos sem direção, pulando de linguagem em linguagem, sem conseguir fazer nada funcionar de verdade.\n\nQuase desisti várias vezes, achava que não tinha \"o dom\" para programação. O ponto de virada foi quando parei de estudar teoria e comecei a focar em projetos práticos. Em 6 meses fazendo projetos reais, aprendi mais do que em 2 anos só vendo vídeos.\n\nConsegui minha primeira vaga como desenvolvedor júnior aos 30 anos, ganhando R$ 3.200. Hoje, 8 anos depois, sou tech lead em uma startup, ganho R$ 25k/mês e trabalho 100% remoto.\n\nDurante esses anos contratando pessoas, percebi que a maioria dos cursos ensina tecnologia, mas não ensina como conseguir emprego. Por isso criei meu método focado 100% em empregabilidade - quero que outras pessoas façam essa transição de forma mais rápida e assertiva do que eu fiz."
};

// Função para preencher os dados
function preencherDadosProgramacao() {
  try {
    localStorage.setItem('editorial-answers', JSON.stringify(dadosProgramacao));
    console.log('✅ Dados de programação salvos com sucesso!');
    console.log('📦 Total de respostas:', Object.keys(dadosProgramacao).length);
    
    // Confirma se quer recarregar
    if (confirm('Dados preenchidos! Recarregar a página para aplicar?')) {
      window.location.reload();
    }
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar dados:', error);
    return false;
  }
}

// Função para verificar dados salvos
function verificarDados() {
  const dados = localStorage.getItem('editorial-answers');
  if (dados) {
    const parsed = JSON.parse(dados);
    console.log('📋 Dados atuais no localStorage:', parsed);
    console.log('🔢 Total de respostas salvas:', Object.keys(parsed).length);
  } else {
    console.log('❌ Nenhum dado encontrado no localStorage');
  }
}

// Função para limpar dados
function limparDados() {
  localStorage.removeItem('editorial-answers');
  console.log('🗑️ Dados limpos!');
}

// Executa automaticamente
console.log('🚀 Script de teste carregado!');
console.log('📝 Execute: preencherDadosProgramacao()');
console.log('🔍 Execute: verificarDados()');
console.log('🗑️ Execute: limparDados()');

// Preenche automaticamente se confirmado
if (confirm('Preencher automaticamente os dados do curso de programação?')) {
  preencherDadosProgramacao();
}