import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from '../components/editorial/QuestionCard';
import EmailsResult from '../components/emails/EmailsResult';
import { questionnairelevels } from '../data/emailsQuestions';

const CentralEmails = () => {
  const [currentStep, setCurrentStep] = useState('level-selection'); // 'level-selection', 'questionnaire', 'options', 'generating', 'results'
  const [selectedLevel, setSelectedLevel] = useState('completo'); // 'rapido', 'completo', 'detalhado'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [emailsResult, setEmailsResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  // Sistema de lotes
  const [currentBatch, setCurrentBatch] = useState(1);
  const [isSequenceComplete, setIsSequenceComplete] = useState(false);
  const [allGeneratedContent, setAllGeneratedContent] = useState('');

  // Configurações de geração
  const [generationType, setGenerationType] = useState('full'); // 'full', 'phase'
  const [selectedPhase, setSelectedPhase] = useState('pre-launch');

  // Controle de geração sequencial
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [isSequentialGeneration, setIsSequentialGeneration] = useState(false);

  // Definir as fases disponíveis
  const phases = [
    { key: 'pre-launch', name: 'Pré-lançamento', description: 'Confirmação e Véspera', emails: [1, 2] },
    { key: 'event', name: 'Fase do Evento', description: 'Aulas 1, 2 e 3', emails: [3, 4, 5, 6, 7, 8, 9, 10, 11] },
    { key: 'pre-sales', name: 'Pré-vendas', description: 'Lista VIP e Preparação', emails: [12, 13, 14] },
    { key: 'sales', name: 'Vendas', description: 'Abertura até Fechamento', emails: [15, 16, 17, 18, 19, 20, 21, 22] },
    { key: 'post-sales', name: 'Pós-vendas', description: 'Reabertura e Facilidades', emails: [23, 24, 25, 26, 27, 28, 29] }
  ];

  // Get questions based on selected level
  const getCurrentQuestions = () => {
    return questionnairelevels[selectedLevel].questions;
  };

  // Load existing answers when component mounts
  useEffect(() => {
    const savedEmailsAnswers = localStorage.getItem('emailsAnswers');
    const savedLevel = localStorage.getItem('emailsLevel');

    if (savedEmailsAnswers) {
      const emailsAnswers = JSON.parse(savedEmailsAnswers);
      setAnswers(emailsAnswers);
    }

    if (savedLevel) {
      setSelectedLevel(savedLevel);
    }
  }, []);

  // Auto-navigate to first unanswered question on initial load
  useEffect(() => {
    if (currentStep === 'questionnaire' && currentQuestionIndex === 0) {
      const currentQuestions = getCurrentQuestions();
      const firstUnanswered = currentQuestions.findIndex(q => !answers[q.id] || !answers[q.id].trim());

      if (firstUnanswered > 0) {
        setCurrentQuestionIndex(firstUnanswered);
      }
    }
  }, [currentStep, selectedLevel]); // Include selectedLevel


  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    localStorage.setItem('emailsAnswers', JSON.stringify(newAnswers));
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    localStorage.setItem('emailsLevel', level);
  };

  const handleStartQuestionnaire = () => {
    setCurrentStep('questionnaire');
    setCurrentQuestionIndex(0);
  };

  const handleNext = () => {
    const currentQuestions = getCurrentQuestions();
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Go to options step
      setCurrentStep('options');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGenerateEmails = async (specificPhase = null, phaseIndex = null) => {
    console.log('🔄 handleGenerateEmails called with:', {
      specificPhase,
      generationType,
      currentPhaseIndex,
      isSequentialGeneration,
      completedPhases
    });

    setIsGenerating(true);
    setCanContinue(false);
    setCurrentStep('generating');

    try {
      // Determinar qual fase gerar
      let phaseToGenerate = null;

      if (specificPhase) {
        // Fase específica (para geração individual)
        phaseToGenerate = specificPhase;
      } else if (generationType === 'phase') {
        // Geração de fase única selecionada
        phaseToGenerate = selectedPhase;
      } else if (generationType === 'full') {
        // Geração sequencial - começar ou continuar
        phaseToGenerate = phases[currentPhaseIndex].key;
        // Garantir que está em modo sequencial
        setIsSequentialGeneration(true);
      }

      console.log('📧 Phase determined:', {
        phaseToGenerate,
        isSequentialGeneration,
        currentPhaseIndex,
        phaseName: phases[currentPhaseIndex]?.name
      });

      // Preparar payload
      let requestBody = {
        answers: answers,
        questions: getCurrentQuestions(),
        questionnaireLevel: selectedLevel
      };

      // Sempre enviar o parâmetro phase para Claude
      if (phaseToGenerate) {
        requestBody.phase = phaseToGenerate;
        // Indicar se é geração sequencial ou fase individual
        requestBody.isSequential = isSequentialGeneration;
        console.log('🔄 Generating phase:', phaseToGenerate, 'Sequential:', isSequentialGeneration);
      }

      const response = await fetch(import.meta.env.VITE_API_URL + '/api/emails/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let newBatchContent = '';
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
              const dataString = line.slice(6).trim();

              // Skip empty data lines
              if (!dataString) continue;

              // Try to parse JSON data
              let data;
              try {
                data = JSON.parse(dataString);
              } catch (parseError) {
                console.warn('Failed to parse SSE data as JSON:', dataString);
                // Treat as plain text content if JSON parsing fails
                newBatchContent += dataString;

                const combinedContent = allGeneratedContent + newBatchContent;
                setEmailsResult(prev => ({
                  ...prev,
                  ...metadata,
                  content: combinedContent,
                  id: Date.now().toString(),
                  status: 'generating',
                  currentBatch: currentPhaseIndex + 1,
                  totalBatches: 5
                }));
                continue;
              }

              // Handle structured SSE data
              if (data && typeof data === 'object') {
                if (data.type === 'metadata') {
                  metadata = data.data;
                  console.log('📊 Generation metadata:', metadata);
                } else if (data.type === 'content') {
                  const content = data.data;
                  if (content && typeof content === 'string' && content !== '[object Object]') {
                    newBatchContent += content;

                    // Combinar conteúdo anterior com novo conteúdo
                    const combinedContent = allGeneratedContent + newBatchContent;

                    setEmailsResult(prev => ({
                      ...prev,
                      ...metadata,
                      content: combinedContent,
                      id: Date.now().toString(),
                      status: 'generating',
                      currentBatch: currentPhaseIndex + 1,
                      totalBatches: metadata?.generationType === 'phase' ? 1 : 5,
                      generationType: metadata?.generationType,
                      phase: metadata?.phase
                    }));
                  }
                } else if (data.type === 'complete') {
                  // Atualizar conteúdo total gerado
                  const updatedAllContent = allGeneratedContent + newBatchContent;
                  setAllGeneratedContent(updatedAllContent);

                  // Marcar fase atual como completa
                  const currentPhase = phaseToGenerate || phases[currentPhaseIndex].key;
                  const newCompletedPhases = [...completedPhases, currentPhase];
                  setCompletedPhases(newCompletedPhases);

                  // Verificar se é geração sequencial e se há mais fases
                  const effectivePhaseIndex = phaseIndex !== null ? phaseIndex : currentPhaseIndex;
                  const isSequentialComplete = isSequentialGeneration &&
                    (effectivePhaseIndex >= phases.length - 1);

                  const isPhaseComplete = metadata?.generationType === 'phase';

                  console.log('🔍 Completion check:', {
                    isSequentialGeneration,
                    currentPhaseIndex,
                    effectivePhaseIndex,
                    phasesLength: phases.length,
                    isSequentialComplete,
                    isPhaseComplete,
                    shouldContinue: isSequentialGeneration && !isSequentialComplete,
                    metadataGenerationType: metadata?.generationType,
                    frontendGenerationType: generationType
                  });

                  const finalResult = {
                    ...metadata,
                    content: updatedAllContent,
                    id: Date.now().toString(),
                    status: 'generated',
                    currentBatch: (phaseIndex !== null ? phaseIndex : currentPhaseIndex) + 1,
                    totalBatches: 5,
                    isComplete: isSequentialComplete || isPhaseComplete,
                    generationType: metadata?.generationType,
                    phase: currentPhase,
                    completedPhases: newCompletedPhases,
                    isSequentialGeneration: isSequentialGeneration || metadata?.isSequential || (generationType === 'full'),
                    canContinue: (isSequentialGeneration || metadata?.isSequential || (generationType === 'full')) && !isSequentialComplete,
                    currentPhaseIndex: phaseIndex !== null ? phaseIndex : currentPhaseIndex,
                    phaseName: phases[phaseIndex !== null ? phaseIndex : currentPhaseIndex].name,
                    nextPhaseName: (phaseIndex !== null ? phaseIndex : currentPhaseIndex) < phases.length - 1 ? phases[(phaseIndex !== null ? phaseIndex : currentPhaseIndex) + 1].name : null
                  };
                  setEmailsResult(finalResult);

                  // Controlar continuação da sequência
                  const shouldContinue = (isSequentialGeneration || metadata?.isSequential || (generationType === 'full')) && !isSequentialComplete;
                  console.log('🎯 Should continue logic:', {
                    isSequentialGeneration,
                    isSequentialComplete,
                    shouldContinue,
                    currentPhaseIndex,
                    effectivePhaseIndex,
                    totalPhases: phases.length,
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

                  setIsGenerating(false);
                  console.log('✅ Generation completed:', finalResult);
                  console.log('🔍 Debug info:', {
                    isSequentialGeneration,
                    currentPhaseIndex,
                    totalPhases: phases.length,
                    isSequentialComplete,
                    canContinue: isSequentialGeneration && !isSequentialComplete,
                    generationType,
                    phaseToGenerate,
                    finalResult: {
                      canContinue: finalResult.canContinue,
                      isSequentialGeneration: finalResult.isSequentialGeneration,
                      currentPhaseIndex: finalResult.currentPhaseIndex,
                      isComplete: finalResult.isComplete
                    }
                  });
                } else if (data.type === 'error') {
                  console.error('❌ Server error:', data.data);

                  // Verificar se é erro de API key do Claude
                  if (data.data && data.data.includes('Authentication failed') && data.data.includes('CLAUDE_API_KEY')) {
                    throw new Error('API key do Claude inválida. Verifique o arquivo .env ou altere AI_PROVIDER_EMAILS para "openai"');
                  }

                  // Verificar se é erro de sobrecarga (overloaded)
                  if (data.data && data.data.includes('Overloaded')) {
                    // Não quebrar o stream para erros de sobrecarga, o sistema já vai fazer retry
                    console.warn('⚠️ Claude API temporariamente sobrecarregada, tentando novamente...');

                    // Atualizar o estado para mostrar mensagem de retry
                    setEmailsResult(prev => ({
                      ...prev,
                      status: 'retrying',
                      retryMessage: 'API temporariamente sobrecarregada, tentando novamente...'
                    }));

                    return; // Não quebrar o stream
                  }

                  throw new Error(data.data || 'Unknown server error');
                }
              }
            } catch (e) {
              console.error('Error processing SSE data:', e);
              console.error('Raw line:', line);
              // Don't break the stream, continue processing
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating emails:', error);
      setIsGenerating(false);

      // Mensagem específica para erro de API key do Claude
      if (error.message.includes('API key do Claude inválida')) {
        alert(`❌ Erro de Configuração:\n\n${error.message}\n\nSoluções:\n1. Configure uma API key válida do Claude no arquivo .env\n2. Ou altere AI_PROVIDER_EMAILS para "openai" no arquivo .env\n\nConsulte CLAUDE_API_KEY_GUIDE.md para mais detalhes.`);
      } else if (error.message.includes('Overloaded')) {
        alert(`⚠️ API Temporariamente Sobrecarregada\n\nA API do Claude está com alta demanda no momento.\n\nSoluções:\n1. Aguarde alguns minutos e tente novamente\n2. Tente em horário de menor movimento\n3. O sistema já tentou 5 vezes automaticamente\n\nIsso é temporário e normal durante picos de uso.`);
      } else {
        alert(`Erro ao gerar emails: ${error.message}\n\nTente novamente ou verifique a configuração.`);
      }

      setCurrentStep('questionnaire');
    }
  };

  const handleContinueGeneration = () => {
    if (isSequentialGeneration && currentPhaseIndex < phases.length - 1) {
      // Move to next phase
      const nextPhaseIndex = currentPhaseIndex + 1;
      setCurrentPhaseIndex(nextPhaseIndex);
      setCanContinue(false);

      console.log('🔄 Continuing to phase:', nextPhaseIndex + 1, phases[nextPhaseIndex].name);

      // Generate the next phase with the correct index
      handleGenerateEmails(phases[nextPhaseIndex].key, nextPhaseIndex);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setEmailsResult(null);
    setCurrentStep('level-selection');
    setSelectedLevel('completo');
    setCurrentQuestionIndex(0);
    setCurrentBatch(1);
    setIsSequenceComplete(false);
    setAllGeneratedContent('');
    setCanContinue(false);
    setGenerationType('full');
    setSelectedPhase('pre-launch');
    setCurrentPhaseIndex(0);
    setCompletedPhases([]);
    setIsSequentialGeneration(false);
    localStorage.removeItem('emailsAnswers');
    localStorage.removeItem('emailsLevel');
  };

  const handleBackToQuestions = () => {
    setCurrentStep('level-selection');
    setCurrentQuestionIndex(0);
  };

  const handleBackToPhaseSelection = () => {
    setEmailsResult(null);
    setIsGenerating(false);
    setCanContinue(false);
    setCurrentStep('options');
  };

  const handleStartGeneration = () => {
    console.log('🚀 Starting generation with type:', generationType);
    // Reset sequential generation state
    if (generationType === 'full') {
      console.log('📋 Initializing sequential generation state');
      setCurrentPhaseIndex(0);
      setCompletedPhases([]);
      setIsSequentialGeneration(true);
      setAllGeneratedContent('');
    }
    handleGenerateEmails();
  };

  // Level Selection Step (first step)
  if (currentStep === 'level-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary dark:via-secondary-light dark:to-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Voltar ao Dashboard
            </Link>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
              📧 Central de Emails
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Escolha o nível de profundidade para seu questionário
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>💡 Dica:</strong> Recomendamos começar com o <strong>Questionário Completo</strong> para obter a melhor relação entre tempo e qualidade dos emails.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(questionnairelevels).map(([levelKey, level]) => (
                <div
                  key={levelKey}
                  className={`phase-card ${selectedLevel === levelKey ? 'selected' : ''}`}
                  onClick={() => handleLevelSelect(levelKey)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${levelKey === 'rapido' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                        levelKey === 'completo' ? 'bg-gradient-to-br from-primary to-primary-dark' :
                          'bg-gradient-to-br from-purple-500 to-purple-600'
                        }`}>
                        <span className="text-white text-xl">
                          {levelKey === 'rapido' ? '⚡' : levelKey === 'completo' ? '📋' : '🔬'}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 ${selectedLevel === levelKey
                      ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                      : 'border-gray-300 dark:border-gray-600'
                      }`}>
                      {selectedLevel === levelKey && (
                        <div className="w-full h-full rounded-full bg-white scale-50 transition-transform duration-300"></div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {level.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {level.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-primary">
                        {level.questionCount} perguntas
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {level.duration}
                      </span>
                    </div>

                    <div className={`text-sm font-medium mb-3 ${levelKey === 'rapido' ? 'text-yellow-600' :
                      levelKey === 'completo' ? 'text-green-600' :
                        'text-purple-600'
                      }`}>
                      {level.quality}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {level.features.map((feature, index) => (
                      <div key={index} className={`flex items-center text-sm ${levelKey === 'rapido' ? 'text-yellow-600 dark:text-yellow-400' :
                        levelKey === 'completo' ? 'text-green-600 dark:text-green-400' :
                          'text-purple-600 dark:text-purple-400'
                        }`}>
                        <span className={`w-2 h-2 rounded-full mr-3 ${levelKey === 'rapido' ? 'bg-yellow-500' :
                          levelKey === 'completo' ? 'bg-green-500' :
                            'bg-purple-500'
                          }`}></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={handleStartQuestionnaire}
                className="btn-continue group"
              >
                <span className="btn-continue-icon">🚀</span>
                <span className="btn-continue-text">
                  Iniciar {questionnairelevels[selectedLevel].name}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Options Step (after questionnaire)
  if (currentStep === 'options') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary dark:via-secondary-light dark:to-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Voltar ao Dashboard
            </Link>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
              🚀 Opções de Geração
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Escolha como deseja gerar seus emails
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 dark:bg-secondary/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 p-8">

              {/* Tipo de Geração */}
              <div className="mb-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-3">
                    ⚡ Escolha seu Método de Geração
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Selecione a estratégia ideal para criar sua sequência de emails. Ambas as opções produzem resultados profissionais.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Geração Completa */}
                  <div
                    className={`phase-card ${generationType === 'full' ? 'selected' : ''}`}
                    onClick={() => setGenerationType('full')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Sequência Completa
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Recomendado para resultados ótimos
                          </p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 ${generationType === 'full'
                        ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                        : 'border-gray-300 dark:border-gray-600'
                        }`}>
                        {generationType === 'full' && (
                          <div className="w-full h-full rounded-full bg-white scale-50 transition-transform duration-300"></div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      Gera todos os 29 emails em 5 fases sequenciais com máxima coerência narrativa
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Narrativa 100% coerente entre fases
                      </div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Economia de ~80% em tokens/custos
                      </div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Timing perfeito entre emails
                      </div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Aprovação entre cada fase
                      </div>
                    </div>
                  </div>

                  {/* Geração por Fase */}
                  <div
                    className={`phase-card ${generationType === 'phase' ? 'selected' : ''}`}
                    onClick={() => setGenerationType('phase')}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">🎯</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Fase Específica
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ideal para focar em uma estratégia
                          </p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 ${generationType === 'phase'
                        ? 'bg-primary border-primary shadow-lg shadow-primary/30'
                        : 'border-gray-300 dark:border-gray-600'
                        }`}>
                        {generationType === 'phase' && (
                          <div className="w-full h-full rounded-full bg-white scale-50 transition-transform duration-300"></div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      Gera apenas uma fase específica do funil de vendas para testes focados
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Geração mais rápida
                      </div>
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Estratégia focada
                      </div>
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Ideal para validação
                      </div>
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Menor custo inicial
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seleção de Fase (apenas se geração por fase) */}
              {generationType === 'phase' && (
                <div className="mb-10">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      🎯 Selecione a Fase Desejada
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Escolha qual fase do funil você deseja gerar primeiro
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phases.map((phase) => (
                      <div
                        key={phase.key}
                        className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${selectedPhase === phase.key
                          ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary/40 bg-white dark:bg-secondary/30'
                          }`}
                        onClick={() => setSelectedPhase(phase.key)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                            {phase.name}
                          </h4>
                          <div className={`w-5 h-5 rounded-full border-2 transition-all ${selectedPhase === phase.key ? 'bg-primary border-primary' : 'border-gray-300'
                            }`} />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                          {phase.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {phase.emails.length} emails
                          </span>
                          <span className="text-xs text-gray-500">
                            E{phase.emails[0]}-E{phase.emails[phase.emails.length - 1]}
                          </span>
                        </div>
                        {selectedPhase === phase.key && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light rounded-t-xl"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-gray-200/50 dark:border-gray-600/50">
                <button
                  onClick={() => setCurrentStep('level-selection')}
                  className="flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-secondary/50"
                >
                  <span>←</span>
                  <span>Voltar à Seleção de Nível</span>
                </button>

                <button
                  onClick={handleStartGeneration}
                  className="btn-continue group"
                >
                  <span className="btn-continue-icon">
                    {generationType === 'phase' ? '🎯' : '🚀'}
                  </span>
                  <span className="btn-continue-text">
                    {generationType === 'phase'
                      ? `Gerar ${phases.find(p => p.key === selectedPhase)?.name}`
                      : 'Iniciar Sequência Completa'
                    }
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questionnaire Step
  if (currentStep === 'questionnaire') {
    const currentQuestions = getCurrentQuestions();
    const currentQuestion = currentQuestions[currentQuestionIndex];

    // Safety check
    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary dark:via-secondary-light dark:to-secondary py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                Carregando perguntas...
              </h2>
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary dark:via-secondary-light dark:to-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Voltar ao Dashboard
            </Link>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
              📧 Central de Emails
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Complete o questionário para gerar seus emails
            </p>

            {/* Level and progress info */}
            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                {questionnairelevels[selectedLevel].name}
              </span>
              <span>
                Respostas: {Object.keys(answers).length}/{currentQuestions.length}
              </span>
              <span>
                Qualidade: {questionnairelevels[selectedLevel].quality}
              </span>
            </div>
          </div>

          <QuestionCard
            question={currentQuestion}
            value={answers[currentQuestion.id] || ''}
            onChange={handleAnswerChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === currentQuestions.length - 1}
            currentIndex={currentQuestionIndex + 1}
            totalQuestions={currentQuestions.length}
          />
        </div>
      </div>
    );
  }

  // Generation and Results Steps
  if (currentStep === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary dark:via-secondary-light dark:to-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Voltar ao Dashboard
            </Link>
          </div>

          {/* Debug log before EmailsResult */}
          {console.log('🔍 Passing to EmailsResult:', {
            canContinue,
            isGenerating,
            emailsResult: emailsResult ? {
              canContinue: emailsResult.canContinue,
              isSequentialGeneration: emailsResult.isSequentialGeneration,
              currentPhaseIndex: emailsResult.currentPhaseIndex,
              isComplete: emailsResult.isComplete
            } : null
          })}

          <EmailsResult
            result={emailsResult}
            onStartOver={handleStartOver}
            onBackToQuestions={handleBackToQuestions}
            onBackToPhaseSelection={handleBackToPhaseSelection}
            canContinue={canContinue}
            onContinue={handleContinueGeneration}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default CentralEmails;