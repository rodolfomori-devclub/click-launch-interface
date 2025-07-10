// 📱 Componente de Geração de Mensagens
// Sistema de seleção entre gerar todas ou por lotes

import React, { useState } from 'react';
import { 
  RocketLaunchIcon, 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  ChevronRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

import { GENERATION_OPTIONS, MESSAGE_PHASES, getAllPhases } from '../../data/messagesPhases';

const MessagesGeneration = ({ userAnswers, onBack, onGenerate }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPhases, setSelectedPhases] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === 'all') {
      setSelectedPhases(Object.keys(MESSAGE_PHASES));
    } else {
      setSelectedPhases([]);
    }
  };

  const handlePhaseToggle = (phaseId) => {
    setSelectedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const handleGenerate = () => {
    if (selectedOption === 'all') {
      onGenerate('all', Object.keys(MESSAGE_PHASES));
    } else {
      onGenerate('batches', selectedPhases);
    }
  };

  const getTotalSelectedMessages = () => {
    return selectedPhases.reduce((total, phaseId) => {
      return total + MESSAGE_PHASES[phaseId].messageCount;
    }, 0);
  };

  const getEstimatedTime = () => {
    if (selectedOption === 'all') {
      return '5-10 min';
    }
    const messageCount = getTotalSelectedMessages();
    return `${Math.ceil(messageCount / 10)}-${Math.ceil(messageCount / 5)} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Voltar às Perguntas</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🚀 Geração de Mensagens
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Escolha como deseja gerar suas mensagens de lançamento
          </p>
        </div>

        {/* Options Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.values(GENERATION_OPTIONS).map((option) => (
            <div
              key={option.id}
              className={`generation-option-card ${
                selectedOption === option.id ? 'selected' : ''
              }`}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${option.gradient}`}>
                    <span className="text-white text-2xl">{option.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {option.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {option.subtitle}
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 ${
                  selectedOption === option.id 
                    ? 'border-primary bg-primary' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedOption === option.id && (
                    <CheckCircleIcon className="w-full h-full text-white" />
                  )}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {option.description}
              </p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <ClipboardDocumentListIcon className="w-4 h-4" />
                  <span>{option.totalMessages} mensagens</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>{option.estimatedTime}</span>
                </div>
              </div>

              <div className="space-y-2">
                {option.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <SparklesIcon className="w-4 h-4 text-green-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Phase Selection (only for batches) */}
        {selectedOption === 'batches' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📋 Selecione as Fases
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Escolha quais fases do calendário você deseja gerar
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getAllPhases().map((phase) => (
                <div
                  key={phase.id}
                  className={`phase-card ${
                    selectedPhases.includes(phase.id) ? 'selected' : ''
                  }`}
                  onClick={() => handlePhaseToggle(phase.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${phase.gradient}`}>
                      <span className="text-white text-sm">{phase.emoji}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      selectedPhases.includes(phase.id)
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedPhases.includes(phase.id) && (
                        <CheckCircleIcon className="w-full h-full text-white" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {phase.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {phase.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      {phase.messageCount} mensagens
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {phase.timing}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedPhases.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                  <ClipboardDocumentListIcon className="w-5 h-5" />
                  <span className="font-semibold">
                    {selectedPhases.length} fases selecionadas
                  </span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {getTotalSelectedMessages()} mensagens serão geradas
                </p>
              </div>
            )}
          </div>
        )}

        {/* Generate Button */}
        {selectedOption && (selectedOption === 'all' || selectedPhases.length > 0) && (
          <div className="text-center">
            <button
              onClick={handleGenerate}
              className="generate-button group"
            >
              <div className="flex items-center space-x-3">
                <RocketLaunchIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">
                  {selectedOption === 'all' ? 'Gerar Todas as Mensagens' : 'Gerar Fases Selecionadas'}
                </span>
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-2 text-sm opacity-90">
                {selectedOption === 'all' ? '70+ mensagens' : `${getTotalSelectedMessages()} mensagens`} • {getEstimatedTime()}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesGeneration;