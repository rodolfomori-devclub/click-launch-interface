import { CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import EditorialResult from '../components/editorial/EditorialResult';
import QuestionCard from '../components/editorial/QuestionCard';
import ReviewAnswers from '../components/editorial/ReviewAnswers';
import { editorialQuestions } from '../data/editorialQuestions';
import useLocalStorage from '../hooks/useLocalStorage';

const LinhaEditorial = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'questions', 'review', 'result'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useLocalStorage('editorial-answers', {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorialResult, setEditorialResult] = useState(null);
  const [canContinue, setCanContinue] = useState(false);

  // Check if user has started the questionnaire
  useEffect(() => {
    const hasAnswers = Object.keys(answers).length > 0;
    if (hasAnswers && currentStep === 'welcome') {
      setCurrentStep('questions');
      // Find the first unanswered question
      const firstUnanswered = editorialQuestions.findIndex(q => !answers[q.id]);
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
    if (currentQuestionIndex < editorialQuestions.length - 1) {
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
    const questionIndex = editorialQuestions.findIndex(q => q.id === questionId);
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
        // Only include string values, exclude any DOM elements or complex objects
        if (typeof value === 'string') {
          cleanAnswers[key] = value;
        }
      });

      const cleanQuestions = editorialQuestions.map(q => ({
        id: q.id,
        question: q.question,
        category: q.category,
        type: q.type
      }));

      const cleanExistingContent = typeof existingContent === 'string' ? existingContent : null;

      const response = await fetch(import.meta.env.VITE_API_URL + '/api/editorial/generate-stream', {
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
        throw new Error('Erro ao gerar linha editorial');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let editorialContent = existingContent || '';
      let metadata = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'metadata') {
                metadata = data.data;
              } else if (data.type === 'content') {
                editorialContent += data.data;
                // Update result in real-time
                setEditorialResult({
                  ...metadata,
                  content: editorialContent,
                  id: Date.now().toString(),
                  status: 'generating'
                });
              } else if (data.type === 'complete') {
                // Final update
                const finalResult = {
                  ...metadata,
                  content: editorialContent,
                  id: Date.now().toString(),
                  status: 'generated'
                };
                setEditorialResult(finalResult);

                // Check if content seems incomplete (contains continuation indicators)
                const hasIncompleteMarkers = editorialContent.includes('[Continuo') ||
                  editorialContent.includes('[continua') ||
                  editorialContent.includes('se você quiser') ||
                  editorialContent.includes('quer que eu continue') ||
                  editorialContent.includes('Gostaria que eu continuasse') ||
                  editorialContent.includes('resto do cronograma') ||
                  editorialContent.includes('Solicite a continuação') ||
                  editorialContent.includes('receber o resto do plano');

                // Also check if content ends with complete sections
                const seemsComplete = editorialContent.includes('## 8. RECOMENDAÇÕES ESPECIAIS') ||
                  editorialContent.includes('Próximos passos após o lançamento') ||
                  editorialContent.includes('FIM DA LINHA EDITORIAL COMPLETA') ||
                  (editorialContent.endsWith('.') && editorialContent.length > 5000 && !hasIncompleteMarkers);

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
      alert('Erro ao gerar linha editorial. Tente novamente.');
      setCurrentStep('review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueGeneration = () => {
    if (editorialResult?.content) {
      handleSubmitAnswers(editorialResult.content);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setEditorialResult(null);
    setCurrentStep('welcome');
    setCurrentQuestionIndex(0);
  };

  const handleBackToQuestions = () => {
    setCurrentStep('questions');
  };

  const renderWelcome = () => (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <DocumentTextIcon className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold text-secondary dark:text-white">
            Linha Editorial
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Crie uma linha editorial completa e estratégica para seu lançamento
        </p>
      </div>

      <div className="card text-left">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-secondary dark:text-white mb-4">
            ✨ O que você vai receber:
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Linha editorial estratégica personalizada para seu nicho
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Temas e ângulos de conteúdo para todo o lançamento
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Cronograma de publicações e estratégia de aquecimento
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Diretrizes de tom de voz e posicionamento
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            📋 Como funciona:
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Responda 20 perguntas estratégicas sobre seu lançamento. Suas respostas serão salvas automaticamente,
            então você pode pausar e retomar quando quiser.
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
    <EditorialResult
      result={editorialResult}
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
    const currentQuestion = editorialQuestions[currentQuestionIndex];
    return (
      <QuestionCard
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
        onNext={handleNextQuestion}
        onPrev={handlePrevQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === editorialQuestions.length - 1}
        currentIndex={currentQuestionIndex + 1}
        totalQuestions={editorialQuestions.length}
      />
    );
  }

  if (currentStep === 'review') {
    return (
      <ReviewAnswers
        answers={answers}
        questions={editorialQuestions}
        onBack={handleBackToQuestions}
        onEdit={handleEditQuestion}
        onSubmit={handleSubmitAnswers}
        isSubmitting={isSubmitting}
      />
    );
  }

  if (currentStep === 'result') {
    return renderResult();
  }

  return null;
};

export default LinhaEditorial;