import { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { 
  messagesQuestions, 
  getAllLevels, 
  getQuestionsByLevel, 
  getLevelConfig 
} from '../data/messagesQuestions';
import QuestionCard from '../components/editorial/QuestionCard';
import ReviewAnswers from '../components/editorial/ReviewAnswers';
import MessagesResult from '../components/messages/MessagesResult';
import useLocalStorage from '../hooks/useLocalStorage';

const CentralMensagens = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'level-selection', 'questionnaire', 'options', 'generating', 'results'
  const [selectedLevel, setSelectedLevel] = useLocalStorage('messages-selected-level', 'complete');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage('messages-answers', {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messagesResult, setMessagesResult] = useState(null);
  const [canContinue, setCanContinue] = useState(false);

  // Sistema de lotes para mensagens
  const [currentLoteIndex, setCurrentLoteIndex] = useState(0);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const [allGeneratedContent, setAllGeneratedContent] = useState('');
  
  // Configurações de geração
  const [generationType, setGenerationType] = useState('full'); // 'full', 'lote'
  const [selectedLote, setSelectedLote] = useState('lote1');
  
  // Controle de geração sequencial
  const [completedLotes, setCompletedLotes] = useState([]);
  const [isSequentialGeneration, setIsSequentialGeneration] = useState(false);
  
  // Definir os 7 lotes disponíveis
  const lotes = [
    { key: 'lote1', name: 'Lote 1: Antecipação e Preparação', description: 'Mensagens de boas-vindas até véspera do evento (7 mensagens)', messages: [1, 2, 3, 4, 5, 6, 7] },
    { key: 'lote2', name: 'Lote 2: Aula 1 e Preparação Aula 2', description: 'Mensagens da primeira aula até preparação da segunda (8 mensagens)', messages: [8, 9, 10, 11, 12, 13, 14, 15] },
    { key: 'lote3', name: 'Lote 3: Aula 2 e Preparação Aula 3', description: 'Mensagens da segunda aula até preparação da terceira (6 mensagens)', messages: [16, 17, 18, 19, 20, 21] },
    { key: 'lote4', name: 'Lote 4: Aula 3 e Lista VIP', description: 'Mensagens da terceira aula até preparação Lista VIP (10 mensagens)', messages: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31] },
    { key: 'lote5', name: 'Lote 5: Vendas Dia 1', description: 'Abertura das vendas e primeiro dia de vendas (5 mensagens)', messages: [32, 33, 34, 35, 36] },
    { key: 'lote6', name: 'Lote 6: Vendas Dia 2 - Contagem Regressiva', description: 'Contagem regressiva intensiva do segundo dia (12 mensagens)', messages: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48] },
    { key: 'lote7', name: 'Lote 7: Extensão e Último Prazo', description: 'Reabertura, extensão e prazo final definitivo (22 mensagens)', messages: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70] }
  ];

  // Get questions based on selected level
  const questions = getQuestionsByLevel(selectedLevel);
  const levelConfig = getLevelConfig(selectedLevel);

  // Check if user has started the questionnaire
  useEffect(() => {
    const hasAnswers = Object.keys(answers).length > 0;
    if (hasAnswers && currentStep === 'welcome') {
      setCurrentStep('questionnaire');
      // Find the first unanswered question
      const firstUnanswered = questions.findIndex(q => !answers[q.id]);
      setCurrentQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
    }
  }, [answers, currentStep, questions]);

  const handleStartQuestionnaire = () => {
    setCurrentStep('level-selection');
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setCurrentStep('questionnaire');
    setCurrentQuestionIndex(0);
    // Clear answers that don't apply to the new level
    const newQuestions = getQuestionsByLevel(level);
    const validAnswers = {};
    Object.keys(answers).forEach(key => {
      if (newQuestions.find(q => q.id === key)) {
        validAnswers[key] = answers[key];
      }
    });
    setAnswers(validAnswers);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Go to options step
      setCurrentStep('options');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleEditQuestion = (questionId) => {
    const questionIndex = questions.findIndex(q => q.id === questionId);
    setCurrentQuestionIndex(questionIndex);
    setCurrentStep('questionnaire');
  };

  const handleGenerateMessages = async (specificLote = null, loteIndex = null) => {
    console.log('🔄 handleGenerateMessages called with:', {
      specificLote,
      generationType,
      currentLoteIndex,
      isSequentialGeneration,
      completedLotes
    });
    
    setIsSubmitting(true);
    setCanContinue(false);
    setCurrentStep('results');

    try {
      // Determinar qual lote gerar
      let loteToGenerate = null;
      
      if (specificLote) {
        // Lote específico (para geração individual)
        loteToGenerate = specificLote;
      } else if (generationType === 'lote') {
        // Geração de lote único selecionado
        loteToGenerate = selectedLote;
      } else if (generationType === 'full') {
        // Geração sequencial - começar ou continuar
        loteToGenerate = lotes[currentLoteIndex].key;
        // Garantir que está em modo sequencial
        setIsSequentialGeneration(true);
      }
      
      console.log('📱 Lote determined:', {
        loteToGenerate,
        isSequentialGeneration,
        currentLoteIndex,
        loteName: lotes[currentLoteIndex]?.name
      });
      
      // Preparar payload
      let requestBody = {
        answers: answers,
        questions: questions,
        level: selectedLevel
      };
      
      // Sempre enviar o parâmetro phase (que corresponde ao lote) para Claude
      if (loteToGenerate) {
        requestBody.phase = loteToGenerate;
        requestBody.isSequential = isSequentialGeneration;
        console.log('🔄 Generating lote:', loteToGenerate, 'Sequential:', isSequentialGeneration);
      }
      
      const response = await fetch('http://localhost:3001/api/messages/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let newLoteContent = '';
      let metadata = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'metadata') {
                metadata = data.data;
                console.log('📊 Metadata received:', metadata);
              } else if (data.type === 'content') {
                newLoteContent += data.data;
                
                // Update result in real-time
                const realTimeResult = {
                  ...metadata,
                  content: allGeneratedContent + newLoteContent,
                  id: Date.now().toString(),
                  status: 'generating',
                  level: selectedLevel,
                  levelConfig: levelConfig,
                  currentLote: loteToGenerate,
                  completedLotes: completedLotes,
                  isSequentialGeneration: isSequentialGeneration
                };
                
                setMessagesResult(realTimeResult);
                
              } else if (data.type === 'complete') {
                // Atualizar conteúdo total gerado
                const updatedAllContent = allGeneratedContent + newLoteContent;
                setAllGeneratedContent(updatedAllContent);
                
                // Marcar lote atual como completo
                const currentLote = loteToGenerate || lotes[currentLoteIndex].key;
                const newCompletedLotes = [...completedLotes, currentLote];
                setCompletedLotes(newCompletedLotes);
                
                // Verificar se é geração sequencial e se há mais lotes
                const effectiveLoteIndex = loteIndex !== null ? loteIndex : currentLoteIndex;
                const isSequentialComplete = isSequentialGeneration && 
                                           (effectiveLoteIndex >= lotes.length - 1);
                
                const isLoteComplete = metadata?.generationType === 'lote' || metadata?.generationType === 'single-phase';
                
                console.log('🔍 Completion check:', {
                  isSequentialGeneration,
                  currentLoteIndex,
                  effectiveLoteIndex,
                  lotesLength: lotes.length,
                  isSequentialComplete,
                  isLoteComplete,
                  shouldContinue: isSequentialGeneration && !isSequentialComplete,
                  metadataGenerationType: metadata?.generationType,
                  frontendGenerationType: generationType
                });
                
                // Criar resultado final
                const finalResult = {
                  ...metadata,
                  content: updatedAllContent,
                  id: Date.now().toString(),
                  status: 'generated',
                  level: selectedLevel,
                  levelConfig: levelConfig,
                  currentLote: currentLote,
                  completedLotes: newCompletedLotes,
                  canContinue: isSequentialGeneration && !isSequentialComplete,
                  isSequentialGeneration: isSequentialGeneration,
                  currentLoteIndex: effectiveLoteIndex,
                  isComplete: isSequentialComplete || isLoteComplete
                };
                
                setMessagesResult(finalResult);
                
                // Verificar se deve continuar
                const shouldContinue = isSequentialGeneration && !isSequentialComplete;
                
                console.log('🎯 Should continue logic:', {
                  isSequentialGeneration,
                  isSequentialComplete,
                  shouldContinue,
                  currentLoteIndex,
                  effectiveLoteIndex,
                  totalLotes: lotes.length,
                  metadataIsSequential: metadata?.isSequential,
                  frontendGenerationType: generationType,
                  finalIsSequential: isSequentialGeneration || metadata?.isSequential || (generationType === 'full')
                });
                
                if (shouldContinue) {
                  console.log('🟢 Setting canContinue to TRUE');
                  setCanContinue(true);
                  setIsSequenceComplete(false);
                } else {
                  console.log('🔴 Setting canContinue to FALSE', {
                    isSequentialGeneration,
                    isSequentialComplete
                  });
                  setCanContinue(false);
                  setIsSequenceComplete(true);
                }
                
                setIsSubmitting(false);
                console.log('✅ Generation completed:', finalResult);
                
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error('Erro ao parsear SSE:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating messages:', error);
      setIsSubmitting(false);
      
      if (error.message.includes('API key do Claude inválida')) {
        alert(`❌ Erro de Configuração:\n\n${error.message}\n\nSoluções:\n1. Configure uma API key válida do Claude no arquivo .env\n2. Ou altere AI_PROVIDER_MESSAGES para "openai" no arquivo .env\n\nConsulte CLAUDE_API_KEY_GUIDE.md para mais detalhes.`);
      } else if (error.message.includes('Overloaded')) {
        alert(`⚠️ API Temporariamente Sobrecarregada\n\nA API do Claude está com alta demanda no momento.\n\nSoluções:\n1. Aguarde alguns minutos e tente novamente\n2. Tente em horário de menor movimento\n3. O sistema já tentou 5 vezes automaticamente\n\nIsso é temporário e normal durante picos de uso.`);
      } else {
        alert(`Erro ao gerar mensagens: ${error.message}\n\nTente novamente ou verifique a configuração.`);
      }
      
      setCurrentStep('options');
    }
  };

  const handleContinueGeneration = () => {
    if (isSequentialGeneration && currentLoteIndex < lotes.length - 1) {
      // Move to next lote
      const nextLoteIndex = currentLoteIndex + 1;
      setCurrentLoteIndex(nextLoteIndex);
      setCanContinue(false);
      
      console.log('🔄 Continuing to lote:', nextLoteIndex + 1, lotes[nextLoteIndex].name);
      
      // Generate the next lote with the correct index
      handleGenerateMessages(lotes[nextLoteIndex].key, nextLoteIndex);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setMessagesResult(null);
    setCurrentStep('welcome');
    setSelectedLevel('complete');
    setCurrentQuestionIndex(0);
    setIsSequenceComplete(false);
    setAllGeneratedContent('');
    setCanContinue(false);
    setGenerationType('full');
    setSelectedLote('lote1');
    setCurrentLoteIndex(0);
    setCompletedLotes([]);
    setIsSequentialGeneration(false);
  };

  const handleBackToQuestions = () => {
    setCurrentStep('options');
    setCurrentQuestionIndex(0);
  };

  const handleStartGeneration = () => {
    console.log('🚀 Starting generation with type:', generationType);
    // Reset sequential generation state
    if (generationType === 'full') {
      console.log('📋 Initializing sequential generation state');
      setCurrentLoteIndex(0);
      setCompletedLotes([]);
      setIsSequentialGeneration(true);
      setAllGeneratedContent('');
    }
    handleGenerateMessages();
  };

  const renderWelcome = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-secondary dark:text-white mb-4">
          📱 Central de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mensagens</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Crie seu calendário completo de mensagens de WhatsApp para lançamento, 
          baseado no framework de alta conversão com mais de <strong>70 mensagens</strong> divididas em <strong>7 lotes estratégicos</strong>.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-3">
            🎯 Sistema de 7 Lotes Estratégicos
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <strong>Lote 1:</strong> Antecipação e Preparação (7 mensagens)</li>
            <li>• <strong>Lote 2:</strong> Aula 1 e Preparação Aula 2 (8 mensagens)</li>
            <li>• <strong>Lote 3:</strong> Aula 2 e Preparação Aula 3 (6 mensagens)</li>
            <li>• <strong>Lote 4:</strong> Aula 3 e Lista VIP (10 mensagens)</li>
            <li>• <strong>Lote 5:</strong> Vendas Dia 1 (5 mensagens)</li>
            <li>• <strong>Lote 6:</strong> Vendas Dia 2 - Contagem Regressiva (12 mensagens)</li>
            <li>• <strong>Lote 7:</strong> Extensão e Último Prazo (22 mensagens)</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3">
            ⚡ Framework de Alta Conversão
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Baseado em campanhas de milhões</li>
            <li>• Sequência psicológica testada</li>
            <li>• Gatilhos mentais estratégicos</li>
            <li>• Personalização com IA</li>
            <li>• Formato otimizado para WhatsApp</li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleStartQuestionnaire}
          className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🚀 Começar Questionário
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Responda algumas perguntas e receba suas mensagens personalizadas
        </p>
      </div>
    </div>
  );

  const renderLevelSelection = () => {
    const levels = getAllLevels();
    
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => setCurrentStep('welcome')}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <h1 className="text-3xl font-bold text-secondary dark:text-white mb-4">
            📊 Escolha o Nível do Questionário
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Selecione o nível de detalhamento para suas mensagens. 
            Mais perguntas = maior personalização e qualidade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div 
              key={level.id}
              className={`phase-card cursor-pointer transition-all duration-300 ${
                selectedLevel === level.id ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-800' : ''
              }`}
              onClick={() => handleLevelSelect(level.id)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl
                  ${level.color === 'yellow' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  ${level.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : ''}
                  ${level.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                `}>
                  {level.icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-2
                  ${level.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                  ${level.color === 'green' ? 'text-green-600 dark:text-green-400' : ''}
                  ${level.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : ''}
                `}>
                  {level.name}
                </h3>
                
                <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  {level.subtitle}
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {level.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Perguntas:</span>
                    <span className="font-medium">{level.questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tempo:</span>
                    <span className="font-medium">{level.estimatedTime}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Resultado:</strong> {level.quality}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              💡 Recomendação
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Para lançamentos profissionais, recomendamos o nível <strong>COMPLETO</strong> - 
              oferece o melhor custo-benefício entre tempo investido e qualidade das mensagens.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <MessagesResult
      result={messagesResult}
      onStartOver={handleStartOver}
      onBackToQuestions={handleBackToQuestions}
      canContinue={canContinue}
      onContinue={handleContinueGeneration}
      isGenerating={isSubmitting}
    />
  );

  if (currentStep === 'welcome') {
    return renderWelcome();
  }

  if (currentStep === 'level-selection') {
    return renderLevelSelection();
  }

  if (currentStep === 'questionnaire') {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <QuestionCard
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
        onNext={handleNextQuestion}
        onPrev={handlePrevQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === questions.length - 1}
        currentIndex={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        levelInfo={{
          name: levelConfig.name,
          color: levelConfig.color,
          icon: levelConfig.icon
        }}
      />
    );
  }

  if (currentStep === 'options') {
    return (
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">
          Escolha o Tipo de Geração
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Você pode gerar todas as mensagens de uma vez (Geração Completa) ou gerar mensagens por lote (Geração por Lote).
        </p>

        <div className="grid gap-4">
          <button
            onClick={() => {
              setGenerationType('full');
              setSelectedLote('lote1'); // Reset lote selection for full generation
              setCurrentLoteIndex(0);
              setCompletedLotes([]);
              setIsSequentialGeneration(false);
            }}
            className={`btn-primary ${generationType === 'full' ? 'bg-primary' : ''}`}
          >
            Geração Completa
          </button>
          <button
            onClick={() => {
              setGenerationType('lote');
              setSelectedLote('lote1'); // Default to first lote for lote generation
              setCurrentLoteIndex(0);
              setCompletedLotes([]);
              setIsSequentialGeneration(false);
            }}
            className={`btn-primary ${generationType === 'lote' ? 'bg-primary' : ''}`}
          >
            Geração por Lote
          </button>
        </div>

        {generationType === 'lote' && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-secondary dark:text-white mb-2">
              Selecione o Lote para Gerar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lotes.map((lote) => (
                <button
                  key={lote.key}
                  onClick={() => setSelectedLote(lote.key)}
                  className={`btn-secondary ${selectedLote === lote.key ? 'bg-primary' : ''}`}
                >
                  {lote.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={handleStartGeneration}
            className="btn-primary px-8 py-4 text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Gerando...' : 'Iniciar Geração'}
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 'generating') {
    return (
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">
          Gerando Mensagens
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Estamos gerando suas mensagens de WhatsApp. Isso pode levar alguns minutos.
        </p>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-secondary"></div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          {isSequentialGeneration ? 'Geração Sequencial em Andamento' : 'Geração por Lote em Andamento'}
        </p>
      </div>
    );
  }

  if (currentStep === 'results') {
    return renderResult();
  }

  return null;
};

export default CentralMensagens;