// 🎯 Sistema de Geração em Lotes com Autorização
// Gera mensagens lote por lote, sempre pedindo autorização para continuar

import {
  ArrowRightIcon,
  CheckCircleIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

import { MESSAGE_PHASES } from '../../data/messagesPhases';

const BatchGeneration = ({
  selectedPhases,
  userAnswers,
  onBack,
  onComplete,
  selectedLevel = 'complete' // ← ADICIONADO
}) => {
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [generatedMessages, setGeneratedMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [completedBatches, setCompletedBatches] = useState([]);

  // Organizar fases selecionadas em ordem
  const orderedPhases = selectedPhases
    .map(phaseId => MESSAGE_PHASES[phaseId])
    .sort((a, b) => a.id.localeCompare(b.id));

  const currentPhase = orderedPhases[currentBatchIndex];

  const handleGenerateBatch = async () => {
    if (!currentPhase) {
      console.error('❌ No current phase to generate');
      return;
    }

    console.log('🚀 Starting batch generation for phase:', currentPhase.name);
    setIsGenerating(true);

    try {
      // Simular geração de mensagens para a fase atual
      const batchMessages = await generateMessagesForPhase(currentPhase, userAnswers);

      console.log('📦 Generated batch messages:', batchMessages);

      const updatedMessages = [...generatedMessages, ...batchMessages];
      setGeneratedMessages(updatedMessages);
      setCompletedBatches(prev => [...prev, currentPhase.id]);

      // Verificar se há mais fases
      if (currentBatchIndex < orderedPhases.length - 1) {
        console.log('➡️ More phases to generate, showing continue prompt');
        setShowContinuePrompt(true);
      } else {
        console.log('✅ All phases completed, calling onComplete with:', updatedMessages);
        // Completou todas as fases
        onComplete(updatedMessages);
      }

    } catch (error) {
      console.error('❌ Erro ao gerar mensagens:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContinue = () => {
    setCurrentBatchIndex(prev => prev + 1);
    setShowContinuePrompt(false);
  };

  const handleStop = () => {
    onComplete(generatedMessages);
  };

  // Função REAL para geração de mensagens via API do Claude
  const generateMessagesForPhase = async (phase, userAnswers) => {
    console.log('🎯 BatchGeneration: generateMessagesForPhase called with:', { phase: phase.name, userAnswers });

    try {
      // Importar questions do messagesQuestions
      const { getQuestionsByLevel } = await import('../../data/messagesQuestions');
      const questions = getQuestionsByLevel(selectedLevel); // Usar nível selecionado pelo usuário

      // Usar diretamente o ID da fase para o backend
      console.log('📋 Using phase ID:', phase.id);

      // Preparar payload para API
      const requestBody = {
        answers: userAnswers,
        questions: questions,
        phase: phase.id, // ← USAR PHASE ID DIRETO
        level: selectedLevel,
        isSequential: false
      };

      console.log('📡 Sending request to API:', requestBody);

      // Chamar API real do Claude
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/messages/generate-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Tentar ler o erro do corpo da resposta
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let generatedContent = '';
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
                console.log('📥 Content chunk received:', {
                  type: typeof data.data,
                  isString: typeof data.data === 'string',
                  isArray: Array.isArray(data.data),
                  isObject: typeof data.data === 'object' && data.data !== null,
                  data: data.data
                });

                // Handle different data types
                if (typeof data.data === 'string') {
                  generatedContent += data.data;
                } else if (Array.isArray(data.data)) {
                  // If it's an array, it might be the final result from generateMessagesInBatches
                  console.log('🔄 Received array data, storing for processing');
                  generatedContent = data.data; // Store as-is for later processing
                } else if (typeof data.data === 'object' && data.data !== null) {
                  // If it's an object, handle accordingly
                  console.log('🔄 Received object data, storing for processing');
                  generatedContent = data.data;
                } else {
                  console.warn('⚠️ Unexpected data type:', typeof data.data);
                  generatedContent += String(data.data);
                }
              } else if (data.type === 'complete') {
                console.log('✅ API generation complete');
                break;
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error('Erro ao parsear SSE:', {
                error: e.message,
                line: line,
                stack: e.stack
              });
              // Continue processing other lines instead of stopping
            }
          }
        }
      }

      // Processar conteúdo gerado e dividir em mensagens
      console.log('🔍 About to process generatedContent:', {
        type: typeof generatedContent,
        isString: typeof generatedContent === 'string',
        isArray: Array.isArray(generatedContent),
        isObject: typeof generatedContent === 'object' && generatedContent !== null,
        length: generatedContent?.length,
        content: generatedContent
      });

      try {
        const messages = parseGeneratedContent(generatedContent, phase);
        console.log('✅ BatchGeneration: Generated messages from API:', messages);
        return messages;
      } catch (parseError) {
        console.error('❌ Error parsing generated content:', {
          error: parseError.message,
          contentType: typeof generatedContent,
          content: generatedContent,
          stack: parseError.stack
        });

        // Return a fallback message if parsing fails
        return [{
          id: `${phase.id}_fallback`,
          title: 'Mensagem Gerada',
          content: typeof generatedContent === 'string' ? generatedContent : JSON.stringify(generatedContent),
          timing: 'Timing não especificado',
          phase: phase.name
        }];
      }

    } catch (error) {
      console.error('❌ Error calling API:', error);
      throw error;
    }
  };

  // Função para processar conteúdo gerado pelo Claude
  const parseGeneratedContent = (content, phase) => {
    console.log('🔧 parseGeneratedContent called with:', {
      contentType: typeof content,
      isArray: Array.isArray(content),
      isString: typeof content === 'string',
      isObject: typeof content === 'object' && content !== null,
      phase: phase.name
    });

    // Handle different data types
    if (Array.isArray(content)) {
      // If content is already an array of message objects from generateMessagesInBatches
      console.log('📋 Processing array of message objects');
      return content.map((messageObj, index) => {
        const phaseMessage = phase.messages[index];
        return {
          id: `${phase.id}_${messageObj.messageNumber || index + 1}`,
          title: messageObj.name || (phaseMessage ? phaseMessage.title : `Mensagem ${index + 1}`),
          content: messageObj.content || messageObj.toString(),
          timing: phaseMessage ? phaseMessage.timing : 'Timing não especificado',
          phase: phase.name
        };
      });
    }

    if (typeof content === 'object' && content !== null) {
      // If content is a single object
      console.log('📄 Processing single message object');
      return [{
        id: `${phase.id}_1`,
        title: content.name || phase.messages[0]?.title || 'Mensagem 1',
        content: content.content || content.toString(),
        timing: phase.messages[0]?.timing || 'Timing não especificado',
        phase: phase.name
      }];
    }

    // Handle string content (original logic)
    if (typeof content !== 'string') {
      console.warn('⚠️ Content is not a string, converting:', typeof content);
      content = String(content);
    }

    if (!content || content.trim() === '') {
      console.warn('⚠️ No content generated by Claude');
      return [];
    }

    // Dividir por separadores comuns que o Claude usa
    const messageSeparators = [
      '**MENSAGEM',
      '---MENSAGEM',
      '--- MENSAGEM',
      'MENSAGEM',
      '=== MENSAGEM',
      '== MENSAGEM',
      '\n\n---\n\n',
      '\n\n==\n\n'
    ];

    let messages = [content];

    // Tentar dividir por cada separador
    for (const separator of messageSeparators) {
      if (content.includes(separator)) {
        messages = content.split(separator).filter(msg => msg.trim() !== '');
        console.log(`📝 Split content by '${separator}' into ${messages.length} messages`);
        break;
      }
    }

    // Se não conseguiu dividir, usar o conteúdo como uma única mensagem
    if (messages.length === 1) {
      console.log('📝 Using content as single message');
      messages = [content];
    }

    // Processar cada mensagem
    return messages.map((msgContent, index) => {
      const cleanContent = msgContent.trim();
      const phaseMessage = phase.messages[index];

      return {
        id: `${phase.id}_${index + 1}`,
        title: phaseMessage ? phaseMessage.title : `Mensagem ${index + 1}`,
        content: cleanContent,
        timing: phaseMessage ? phaseMessage.timing : 'Timing não especificado',
        phase: phase.name
      };
    });
  };

  const getProgressPercentage = () => {
    return ((currentBatchIndex + (showContinuePrompt ? 1 : 0)) / orderedPhases.length) * 100;
  };

  const getTotalMessages = () => {
    return orderedPhases.reduce((total, phase) => total + phase.messageCount, 0);
  };

  const getGeneratedCount = () => {
    return generatedMessages.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🚀 Geração em Lotes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerando mensagens fase por fase com sua autorização
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Progresso: {currentBatchIndex + (showContinuePrompt ? 1 : 0)} de {orderedPhases.length} fases
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getGeneratedCount()} de {getTotalMessages()} mensagens
            </span>
          </div>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Current Phase Card */}
        {currentPhase && !showContinuePrompt && (
          <div className="mb-8">
            <div className="bg-white dark:bg-secondary/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentPhase.gradient}`}>
                    <span className="text-white text-2xl">{currentPhase.emoji}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentPhase.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentPhase.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhase.messageCount} mensagens
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentPhase.timing}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentPhase.messages.map((message) => (
                  <div key={message.id} className="bg-gray-50 dark:bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {message.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {message.timing}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGenerateBatch}
                  disabled={isGenerating}
                  className="generate-button group"
                >
                  <div className="flex items-center space-x-3">
                    {isGenerating ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Gerando mensagens...</span>
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span>Gerar Este Lote</span>
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Continue Prompt */}
        {showContinuePrompt && (
          <div className="mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-4 mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                    Lote Concluído!
                  </h3>
                  <p className="text-green-600 dark:text-green-400">
                    {currentPhase.messageCount} mensagens da fase "{currentPhase.name}" foram geradas
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-green-700 dark:text-green-300">
                  Próxima fase: {orderedPhases[currentBatchIndex + 1]?.name || 'Finalizado'}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleStop}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-secondary text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-secondary-light transition-colors"
                  >
                    <StopIcon className="w-4 h-4" />
                    <span>Parar Aqui</span>
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                    <span>Continuar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Batches */}
        {completedBatches.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              📋 Lotes Concluídos
            </h3>
            <div className="space-y-3">
              {completedBatches.map((phaseId) => {
                const phase = MESSAGE_PHASES[phaseId];
                return (
                  <div key={phaseId} className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {phase.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {phase.messageCount} mensagens geradas
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            ← Voltar às Opções
          </button>
        </div>

      </div>
    </div>
  );
};

export default BatchGeneration;