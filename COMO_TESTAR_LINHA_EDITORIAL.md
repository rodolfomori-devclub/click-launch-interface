# 🧪 Como Testar a Nova Linha Editorial

## 📋 Dados de Teste Criados

Criei um script completo com dados realistas de um coach empresarial que quer migrar para o digital. Os dados incluem:

- **Nicho**: Marketing digital para coaches
- **Produto**: Mentoria "Autoridade Digital" (R$ 5.997)
- **Persona**: Coach 30-50 anos, R$ 10-30k/mês atual
- **Cases reais**: 5 histórias de transformação detalhadas
- **Método**: "ADS - Autoridade Digital Sustentável" com 5 pilares
- **História pessoal**: Jornada completa de transformação

## 🚀 Como Usar o Script de Teste

### Opção 1: Preencher Tudo Automaticamente

1. **Abra o navegador** na página da Linha Editorial
2. **Abra o Console** (F12 → Console)
3. **Cole e execute este código**:

```javascript
// Cole todo o conteúdo do arquivo fillEditorialTestData.js aqui
// Depois execute:
const filler = fillEditorialTestData();
filler.fill();
```

### Opção 2: Preencher Pergunta por Pergunta

1. **Na página de perguntas**, abra o Console
2. **Execute**:

```javascript
const filler = fillEditorialTestData();
filler.fillActiveForm(); // Preenche só a pergunta atual
```

3. **Navegue** para próxima pergunta e repita

### Opção 3: Usar Diretamente no LocalStorage

```javascript
const testData = {
  1: "Marketing digital para coaches e consultores",
  2: "Mentoria em grupo 'Autoridade Digital'...",
  // ... todos os outros dados
};

localStorage.setItem('editorial-answers', JSON.stringify(testData));
location.reload();
```

## 📊 Dados de Teste Completos

### Informações do Negócio
- **Nicho**: Marketing digital para coaches e consultores  
- **Produto**: Mentoria "Autoridade Digital" (12 semanas)
- **Preço**: R$ 5.997
- **Timeline**: 70 dias antes do lançamento

### Persona Target
- Coach empresarial, 30-50 anos
- Faturamento atual: R$ 10-30k/mês  
- Quer escalar digitalmente
- Problema: dependência de indicações presenciais

### Método/Framework
- **Nome**: "Método ADS - Autoridade Digital Sustentável"
- **5 Pilares**: Posicionamento, Autoridade, Captura, Conversão, Escalabilidade
- **Resultados**: 30 dias para primeiros resultados

### Cases de Sucesso
1. **Maria Silva**: R$ 8k → R$ 45k/mês (6 meses)
2. **João Santos**: R$ 15k → R$ 80k/mês (10 meses)  
3. **Ana Costa**: Criou infoproduto de R$ 30k/mês passivos
4. **Carlos Ferreira**: R$ 0 → R$ 60k/mês (8 meses)
5. **Luciana Oliveira**: R$ 20k → R$ 120k/mês

### Principais Objeções
1. Não tenho tempo para criar conteúdo
2. É muito caro para meu momento atual  
3. Já tentei outros cursos que não funcionaram
4. Meu nicho é muito específico
5. Não domino tecnologia suficiente

## ✅ O Que Esperar na Geração

Com esses dados, a IA deve gerar:

### 1. **Cronograma de 10 Semanas**
- Semanas 10-8: Alcance (educação sobre coaching digital)
- Semanas 7-5: Relacionamento (cases e metodologia)  
- Semanas 4-2: Consideração (diferenciação e objeções)
- Semana 1: Vendas (contagem regressiva)

### 2. **Conteúdos Específicos**
- Reels sobre "coach presencial vs digital"
- Carrosséis com cases de transformação
- Stories com perguntas sobre desafios de coaches
- Lives quebrando objeções específicas do nicho

### 3. **Roteiros Personalizados**
- Linguagem específica para coaches
- Exemplos do mercado de coaching
- Referencias aos cases fornecidos
- Tom consultivo e de autoridade

## 🎯 Validação dos Resultados

Verifique se a linha editorial gerada:

- [ ] **Usa o nicho específico** (coaching) em todos os conteúdos
- [ ] **Menciona o Método ADS** e seus 5 pilares
- [ ] **Inclui os cases reais** (Maria, João, Ana, Carlos, Luciana)
- [ ] **Aborda as objeções** listadas nas Lives
- [ ] **Segue a timeline** de 70 dias/10 semanas
- [ ] **Adapta para ambos canais** (Instagram + YouTube)
- [ ] **Usa a história pessoal** como fio condutor
- [ ] **Mantém tom de autoridade** adequado ao preço (R$ 5.997)

## 🐛 Troubleshooting

### Se o script não funcionar:
1. Verifique se está na página correta
2. Confirme se o localStorage aceita os dados
3. Recarregue a página após preencher

### Se a geração falhar:
1. Verifique se o assistente OpenAI está configurado
2. Confirme a variável `OPENAI_ASSISTANT_ID_EDITORIAL`
3. Teste a conexão da API

### Se o conteúdo estiver genérico:
1. Verifique se todos os 20 campos foram preenchidos
2. Confirme se o prompt do assistente está atualizado
3. Teste com dados mais específicos

## 📝 Exemplo de Uso Rápido

```javascript
// Cole no console e execute:
localStorage.setItem('editorial-answers', JSON.stringify({
  1: "Marketing digital para coaches e consultores",
  2: "Mentoria em grupo 'Autoridade Digital' - programa completo de 12 semanas",
  3: "R$ 5.997",
  4: "70",
  5: "Coach empresarial, 30-50 anos, R$ 10-30k/mês atual, quer escalar digitalmente",
  // ... continue com todos os 20 campos
}));
location.reload();
```

Agora você pode testar completamente o novo sistema de linha editorial! 🚀