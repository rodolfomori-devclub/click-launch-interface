import { useState, useEffect } from 'react';
import { ChevronLeftIcon, CheckIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { emailsQuestions } from '../data/emailsQuestions';
import QuestionCard from '../components/editorial/QuestionCard';
import EmailsResult from '../components/emails/EmailsResult';

const CentralEmails = () => {
  const [currentStep, setCurrentStep] = useState('questionnaire'); // 'questionnaire', 'generating', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [emailsResult, setEmailsResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  // Load existing answers when component mounts
  useEffect(() => {
    const savedEmailsAnswers = localStorage.getItem('emailsAnswers');
    
    if (savedEmailsAnswers) {
      const emailsAnswers = JSON.parse(savedEmailsAnswers);
      setAnswers(emailsAnswers);
    }
  }, []);

  // Auto-navigate to first unanswered question on initial load
  useEffect(() => {
    if (currentStep === 'questionnaire' && currentQuestionIndex === 0) {
      const firstUnanswered = emailsQuestions.findIndex(q => !answers[q.id] || !answers[q.id].trim());
      
      if (firstUnanswered > 0) {
        setCurrentQuestionIndex(firstUnanswered);
      }
    }
  }, [currentStep]); // Only run when step changes


  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    localStorage.setItem('emailsAnswers', JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < emailsQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Review step
      setCurrentStep('generating');
      handleGenerateEmails();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGenerateEmails = async (existingContent = null) => {
    setIsGenerating(true);
    setCanContinue(false);

    try {
      
      const response = await fetch('http://localhost:3001/api/emails/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: answers,
          questions: emailsQuestions,
          existingContent: existingContent
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let emailsContent = existingContent || '';
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
                const content = data.data;
                if (content && content !== '[object Object]') {
                  emailsContent += content;
                  setEmailsResult({
                    ...metadata,
                    content: emailsContent,
                    id: Date.now().toString(),
                    status: 'generating'
                  });
                }
              } else if (data.type === 'complete') {
                const finalResult = {
                  ...metadata,
                  content: emailsContent,
                  id: Date.now().toString(),
                  status: 'generated'
                };
                setEmailsResult(finalResult);
                
                // Check if content seems incomplete
                const hasIncompleteMarkers = emailsContent.includes('[Continuo') || 
                                           emailsContent.includes('[continua') ||
                                           emailsContent.includes('se você quiser') ||
                                           emailsContent.includes('quer que eu continue') ||
                                           emailsContent.includes('Gostaria que eu continuasse') ||
                                           emailsContent.includes('resto do') ||
                                           emailsContent.includes('Solicite a continuação') ||
                                           emailsContent.includes('receber o resto');
                
                const seemsComplete = emailsContent.includes('FIM DA SEQUÊNCIA') ||
                                    emailsContent.includes('Sequência completa') ||
                                    (emailsContent.endsWith('.') && emailsContent.length > 5000 && !hasIncompleteMarkers);
                
                setCanContinue(hasIncompleteMarkers && !seemsComplete);
                setIsGenerating(false);
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating emails:', error);
      setIsGenerating(false);
      alert('Erro ao gerar emails. Tente novamente.');
      setCurrentStep('questionnaire');
    }
  };

  const handleContinueGeneration = () => {
    if (emailsResult?.content) {
      handleGenerateEmails(emailsResult.content);
    }
  };

  const handleStartOver = () => {
    setAnswers({});
    setEmailsResult(null);
    setCurrentStep('questionnaire');
    setCurrentQuestionIndex(0);
    localStorage.removeItem('emailsAnswers');
  };

  const handleBackToQuestions = () => {
    setCurrentStep('questionnaire');
    setCurrentQuestionIndex(0);
  };


  // Questionnaire Step
  if (currentStep === 'questionnaire') {
    const currentQuestion = emailsQuestions[currentQuestionIndex];
    
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
            
            {/* Debug info - remove in production */}
            <div className="mt-2 text-sm text-gray-500">
              Respostas salvas: {Object.keys(answers).length} | 
              Total necessário: {emailsQuestions.length}
            </div>
          </div>

          <QuestionCard
            question={currentQuestion}
            value={answers[currentQuestion.id] || ''}
            onChange={handleAnswerChange}
            onNext={handleNext}
            onPrev={handlePrev}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === emailsQuestions.length - 1}
            currentIndex={currentQuestionIndex + 1}
            totalQuestions={emailsQuestions.length}
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
          
          <EmailsResult
            result={emailsResult}
            onStartOver={handleStartOver}
            onBackToQuestions={handleBackToQuestions}
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