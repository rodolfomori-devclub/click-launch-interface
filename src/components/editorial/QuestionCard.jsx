import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const QuestionCard = ({ question, value, onChange, onNext, onPrev, isFirst, isLast, currentIndex, totalQuestions }) => {
  const [answer, setAnswer] = useState(value || '');

  useEffect(() => {
    setAnswer(value || '');
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    onChange(question.id, newValue);
  };

  const handleNext = () => {
    if (answer.trim() || question.type === 'select') {
      onNext();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (answer.trim() || question.type === 'select') {
        handleNext();
      }
    }
  };

  const renderInput = () => {
    if (question.type === 'select') {
      return (
        <select
          value={answer}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-secondary-light text-gray-900 dark:text-white transition-all duration-200 form-select"
        >
          <option value="">Selecione uma opção...</option>
          {question.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <textarea
        value={answer}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={question.placeholder}
        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-secondary-light text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 resize-none form-textarea"
        rows={6}
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Pergunta {currentIndex} de {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round((currentIndex / totalQuestions) * 100)}% completo
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-primary-light h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card shadow-xl animate-slide-up">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {question.category}
          </span>
          <span className="text-4xl">{question.icon}</span>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-3">
          {question.question}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {question.description}
        </p>

        {/* Input */}
        <div className="mb-8">
          {renderInput()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isFirst
                ? 'opacity-50 cursor-not-allowed text-gray-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-light'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <button
            onClick={handleNext}
            disabled={!answer.trim() && question.type !== 'select'}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              answer.trim() || question.type === 'select'
                ? 'bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-neon transform hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{isLast ? 'Revisar Respostas' : 'Próxima'}</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <span>Dica: Use </span>
        <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd>
        <span> para próxima pergunta</span>
      </div>
    </div>
  );
};

export default QuestionCard;