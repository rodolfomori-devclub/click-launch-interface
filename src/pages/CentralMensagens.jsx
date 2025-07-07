import { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { messagesQuestions } from '../data/messagesQuestions';
import QuestionCard from '../components/editorial/QuestionCard';
import ReviewAnswers from '../components/editorial/ReviewAnswers';
import MessagesResult from '../components/messages/MessagesResult';
import useLocalStorage from '../hooks/useLocalStorage';

const CentralMensagens = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'questions', 'review', 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage('messages-answers', {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messagesResult, setMessagesResult] = useState(null);
  const [canContinue, setCanContinue] = useState(false);

  // Check if user has started the questionnaire
  useEffect(() => {
    const hasAnswers = Object.keys(answers).length > 0;
    if (hasAnswers && currentStep === 'welcome') {
      setCurrentStep('questions');
      // Find the first unanswered question
      const firstUnanswered = messagesQuestions.findIndex(q => !answers[q.id]);
      setCurrentQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
    }
  }, [answers, currentStep]);

  const handleStartQuestionnaire = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < messagesQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep('review');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleEditQuestion = (questionId) => {
    const questionIndex = messagesQuestions.findIndex(q => q.id === questionId);
    setCurrentQuestionIndex(questionIndex);
    setCurrentStep('questions');
  };

  const handleSubmitAnswers = async (existingContent = null) => {
    setIsSubmitting(true);
    setCurrentStep('result');
    setCanContinue(false);
    
    try {
      // Clean the data to avoid circular references
      const cleanAnswers = {};
      Object.keys(answers).forEach(key => {
        const value = answers[key];
        if (typeof value === 'string') {
          cleanAnswers[key] = value;
        }
      });

      const cleanQuestions = messagesQuestions.map(q => ({
        id: q.id,
        question: q.question,
        category: q.category,
        type: q.type
      }));

      const cleanExistingContent = typeof existingContent === 'string' ? existingContent : null;

      const response = await fetch('http://localhost:3001/api/messages/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: cleanAnswers,
          questions: cleanQuestions,
          existingContent: cleanExistingContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar mensagens');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let messagesContent = existingContent || '';
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
              } else if (data.type === 'content') {
                messagesContent += data.data;
                setMessagesResult({
                  ...metadata,
                  content: messagesContent,
                  id: Date.now().toString(),
                  status: 'generating'
                });
              } else if (data.type === 'complete') {
                const finalResult = {
                  ...metadata,
                  content: messagesContent,
                  id: Date.now().toString(),
                  status: 'generated'
                };
                setMessagesResult(finalResult);
                
                // Check if content seems incomplete
                const hasIncompleteMarkers = messagesContent.includes('[Continuo') || 
                                           messagesContent.includes('[continua') ||
                                           messagesContent.includes('se você quiser') ||
                                           messagesContent.includes('quer que eu continue') ||
                                           messagesContent.includes('Gostaria que eu continuasse') ||
                                           messagesContent.includes('resto do') ||
                                           messagesContent.includes('Solicite a continuação') ||
                                           messagesContent.includes('receber o resto');
                
                const seemsComplete = messagesContent.includes('FIM DAS MENSAGENS') ||
                                    messagesContent.includes('Mensagens completas') ||
                                    (messagesContent.endsWith('.') && messagesContent.length > 5000 && !hasIncompleteMarkers);
                
                setCanContinue(hasIncompleteMarkers && !seemsComplete);
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
      console.error('Erro ao enviar respostas:', error);
      alert('Erro ao gerar mensagens. Tente novamente.');
      setCurrentStep('review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueGeneration = () => {
    if (messagesResult?.content) {
      handleSubmitAnswers(messagesResult.content);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setMessagesResult(null);
    setCurrentStep('welcome');
    setCurrentQuestionIndex(0);
  };

  const handleBackToQuestions = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
  };

  const renderWelcome = () => (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6 shadow-neon">
          <ChatBubbleLeftRightIcon className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-secondary dark:text-white mb-4">
          Central de Mensagens de Lançamento
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Gere todas as mensagens de WhatsApp para seu lançamento com a ajuda da IA
        </p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold text-secondary dark:text-white mb-4">
          📱 Mensagens Personalizadas para Todo o Funil
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Responda 25 perguntas estratégicas sobre seu lançamento e receba todas as mensagens 
          prontas para copiar e colar no WhatsApp, organizadas por fase do lançamento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-secondary rounded-lg p-4">
            <h3 className="font-semibold text-secondary dark:text-white mb-2">
              🎯 O que você receberá:
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Mensagens de pré-lançamento</li>
              <li>✓ Convites para as aulas</li>
              <li>✓ Lembretes estratégicos</li>
              <li>✓ Mensagens de vendas</li>
              <li>✓ Follow-ups otimizados</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-secondary rounded-lg p-4">
            <h3 className="font-semibold text-secondary dark:text-white mb-2">
              ⚡ Benefícios:
            </h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>✓ Tom de voz personalizado</li>
              <li>✓ Gatilhos mentais estratégicos</li>
              <li>✓ Sequência otimizada</li>
              <li>✓ Emojis e formatação</li>
              <li>✓ Links organizados</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            📋 Como funciona:
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Responda 25 perguntas sobre seu lançamento, incluindo informações sobre evento, 
            produto, oferta e bônus. Suas respostas serão salvas automaticamente.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleStartQuestionnaire}
            className="btn-primary px-8 py-4 text-lg font-semibold animate-pulse"
          >
            Começar Questionário
          </button>
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <MessagesResult
      result={messagesResult}
      onStartOver={handleStartOver}
      onBackToQuestions={() => setCurrentStep('review')}
      canContinue={canContinue}
      onContinue={handleContinueGeneration}
      isGenerating={isSubmitting}
    />
  );

  if (currentStep === 'welcome') {
    return renderWelcome();
  }

  if (currentStep === 'questions') {
    const currentQuestion = messagesQuestions[currentQuestionIndex];
    return (
      <QuestionCard
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
        onNext={handleNextQuestion}
        onPrev={handlePrevQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === messagesQuestions.length - 1}
        currentIndex={currentQuestionIndex + 1}
        totalQuestions={messagesQuestions.length}
      />
    );
  }

  if (currentStep === 'review') {
    return (
      <ReviewAnswers
        answers={answers}
        questions={messagesQuestions}
        onBack={handleBackToQuestions}
        onEdit={handleEditQuestion}
        onSubmit={() => handleSubmitAnswers()}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (currentStep === 'result') {
    return renderResult();
  }

  return null;
};

export default CentralMensagens;