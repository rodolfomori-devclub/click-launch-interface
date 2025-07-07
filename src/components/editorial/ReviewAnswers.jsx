import { useState } from 'react';
import { ChevronLeftIcon, SparklesIcon, PencilIcon } from '@heroicons/react/24/outline';

const ReviewAnswers = ({ answers, questions, onBack, onEdit, onSubmit, isSubmitting }) => {
  const [showAll, setShowAll] = useState(false);

  const getAnswerByQuestionId = (questionId) => {
    return answers[questionId] || '';
  };

  const getQuestionOption = (question, value) => {
    if (question.type === 'select' && question.options) {
      const option = question.options.find(opt => opt.value === value);
      return option ? option.label : value;
    }
    return value;
  };

  const answeredQuestions = questions.filter(q => getAnswerByQuestionId(q.id));
  const progress = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">
          Revisão das Respostas
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Revise suas respostas antes de gerar a linha editorial
        </p>
      </div>

      {/* Progress Summary */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-secondary dark:text-white">
              Progresso Geral
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {answeredQuestions.length} de {questions.length} perguntas respondidas
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completo</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Answers List */}
      <div className="space-y-4">
        {questions.slice(0, showAll ? questions.length : 5).map((question) => {
          const answer = getAnswerByQuestionId(question.id);
          const hasAnswer = answer && answer.trim();

          return (
            <div
              key={question.id}
              className={`card transition-all duration-200 ${
                hasAnswer ? '' : 'opacity-60 border-l-4 border-yellow-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{question.icon}</span>
                    <div>
                      <h4 className="font-semibold text-secondary dark:text-white">
                        {question.question}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {question.category}
                      </p>
                    </div>
                  </div>
                  
                  {hasAnswer ? (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-secondary rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {getQuestionOption(question, answer)}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        Pergunta não respondida
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onEdit(question.id)}
                  className="ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less */}
      {questions.length > 5 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary hover:text-primary-dark font-medium transition-colors"
          >
            {showAll ? 'Mostrar Menos' : `Mostrar Mais ${questions.length - 5} Perguntas`}
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Voltar às Perguntas</span>
        </button>

        <div className="flex items-center space-x-4">
          {answeredQuestions.length < questions.length && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Responda todas as perguntas para gerar a linha editorial
            </p>
          )}
          
          <button
            onClick={() => onSubmit()}
            disabled={answeredQuestions.length < questions.length || isSubmitting}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              answeredQuestions.length >= questions.length && !isSubmitting
                ? 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-neon transform hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Gerando...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Gerar Linha Editorial</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnswers;