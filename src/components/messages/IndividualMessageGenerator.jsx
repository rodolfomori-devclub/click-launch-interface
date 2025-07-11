import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  ClipboardIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';

const IndividualMessageGenerator = () => {
  const [availableMessages, setAvailableMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [previousContext, setPreviousContext] = useState('');

  useEffect(() => {
    fetchAvailableMessages();
    loadAnswersFromStorage();
  }, []);

  const fetchAvailableMessages = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/available-messages`);
      const result = await response.json();

      if (result.success) {
        setAvailableMessages(result.data.messages);
      }
    } catch (error) {
      console.error('Erro ao buscar mensagens disponíveis:', error);
    }
  };

  const loadAnswersFromStorage = () => {
    const storedAnswers = localStorage.getItem('messagesAnswers');
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  };

  const fetchTemplate = async (messageNumber) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/template/${messageNumber}`);
      const result = await response.json();

      if (result.success) {
        setTemplate(result.data);
      }
    } catch (error) {
      console.error('Erro ao buscar template:', error);
    }
  };

  const handleMessageSelect = (messageId) => {
    setSelectedMessage(messageId);
    setGeneratedContent('');
    fetchTemplate(messageId);
  };

  const generateMessage = async () => {
    if (!selectedMessage || !answers) {
      alert('Selecione uma mensagem e preencha as respostas');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/generate-individual-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageNumber: selectedMessage,
          answers: answers,
          previousContext: previousContext
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'content') {
                setGeneratedContent(prev => prev + data.data);
              } else if (data.type === 'complete') {
                console.log('Geração completa:', data.data);
              } else if (data.type === 'error') {
                throw new Error(data.data);
              }
            } catch (parseError) {
              console.warn('Erro ao parsear SSE:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro na geração:', error);
      alert('Erro na geração: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Mensagem copiada para a área de transferência!');
  };

  const saveAsFile = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mensagem-${selectedMessage}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const groupedMessages = availableMessages.reduce((acc, message) => {
    if (!acc[message.fase]) {
      acc[message.fase] = [];
    }
    acc[message.fase].push(message);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <ChatBubbleLeftRightIcon className="inline-block mr-3 h-8 w-8 text-blue-600" />
            Gerador de Mensagens Individuais
          </h1>
          <p className="text-gray-600">
            Gere mensagens específicas usando instruções detalhadas para cada momento da campanha
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seleção de Mensagem */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Selecionar Mensagem
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {Object.entries(groupedMessages).map(([fase, messages]) => (
                <div key={fase} className="border-b pb-3">
                  <h3 className="font-medium text-gray-700 mb-2 capitalize">
                    {fase.replace(/-/g, ' ')}
                  </h3>

                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => handleMessageSelect(message.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedMessage === message.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="font-medium text-sm text-gray-800">
                          #{message.id} - {message.nome}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {message.tema}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Selecionado */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Detalhes do Template
            </h2>

            {template ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700">Nome</h3>
                  <p className="text-gray-600">{template.nome}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700">Objetivo</h3>
                  <p className="text-gray-600 text-sm">{template.objetivo}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700">Momento</h3>
                  <p className="text-gray-600 text-sm">{template.momento}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700">Elementos-chave</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.elementosChave.map((elemento, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {elemento}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <textarea
                    value={previousContext}
                    onChange={(e) => setPreviousContext(e.target.value)}
                    placeholder="Contexto das mensagens anteriores (opcional)"
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    rows={3}
                  />
                </div>

                <button
                  onClick={generateMessage}
                  disabled={isGenerating || !selectedMessage}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${isGenerating || !selectedMessage
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                  {isGenerating ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      <span>Gerar Mensagem</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Selecione uma mensagem para ver os detalhes
              </div>
            )}
          </div>

          {/* Resultado */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Mensagem Gerada
              </h2>

              {generatedContent && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Copiar"
                  >
                    <ClipboardIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={saveAsFile}
                    className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                    title="Baixar"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg p-4 min-h-64 bg-gray-50">
              {generatedContent ? (
                <div className="whitespace-pre-wrap text-gray-800">
                  {generatedContent}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  {isGenerating ? (
                    <div className="space-y-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p>Gerando mensagem...</p>
                    </div>
                  ) : (
                    <p>A mensagem gerada aparecerá aqui</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualMessageGenerator;