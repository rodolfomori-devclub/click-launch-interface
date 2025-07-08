import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeftIcon,
  TrashIcon,
  DocumentArrowDownIcon,
  ClipboardIcon,
  EyeIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';

const SavedAnalyses = () => {
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    loadSavedAnalyses();
  }, []);

  const loadSavedAnalyses = () => {
    try {
      // Load all types of saved analyses
      const emailAnalyses = JSON.parse(localStorage.getItem('savedEmailAnalysis') || '[]');
      const editorialAnalyses = JSON.parse(localStorage.getItem('savedEditorialAnalysis') || '[]');
      const messageAnalyses = JSON.parse(localStorage.getItem('savedMessageAnalysis') || '[]');
      
      // Combine all analyses and sort by savedAt date
      const allAnalyses = [...emailAnalyses, ...editorialAnalyses, ...messageAnalyses]
        .sort((a, b) => new Date(b.metadata.savedAt) - new Date(a.metadata.savedAt));
      
      setSavedAnalyses(allAnalyses);
    } catch (error) {
      console.error('Erro ao carregar análises salvas:', error);
      setSavedAnalyses([]);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Tem certeza que deseja excluir esta análise?')) {
      const analysisToDelete = savedAnalyses.find(a => a.id === id);
      
      if (analysisToDelete) {
        // Remove from the appropriate localStorage based on type
        const storageKey = `saved${analysisToDelete.type.charAt(0).toUpperCase() + analysisToDelete.type.slice(1)}Analysis`;
        const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updated = existing.filter(analysis => analysis.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        
        // Update local state
        const updatedLocal = savedAnalyses.filter(analysis => analysis.id !== id);
        setSavedAnalyses(updatedLocal);
        
        if (selectedAnalysis?.id === id) {
          setSelectedAnalysis(null);
        }
      }
    }
  };

  const handleView = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleExportPDF = async (analysis) => {
    setIsExporting(true);
    
    try {
      // Function to clean content for PDF export (remove emojis and problematic characters)
      const cleanContentForPDF = (text) => {
        return text
          // Remove markdown code blocks
          .replace(/```/g, '')
          // Remove emojis and unicode symbols that cause PDF issues
          .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
          // Remove other problematic characters
          .replace(/[📧📤📋🎯💫📖💰🎁⭐🤖🥇🔸🔥✅⚡💡🚀📊📏📦📨🌊🧹💥🔍📱📚]/g, '')
          // Replace bullet points and special characters
          .replace(/•/g, '- ')
          .replace(/–/g, '-')
          .replace(/—/g, '-')
          .replace(/"/g, '"')
          .replace(/"/g, '"')
          .replace(/'/g, "'")
          .replace(/'/g, "'")
          // Clean up extra whitespace
          .replace(/\s+/g, ' ')
          .trim();
      };

      const cleanContent = cleanContentForPDF(analysis.content);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      // Title
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text(analysis.title, margin, margin);
      
      // Date
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const date = new Date(analysis.metadata.generatedAt).toLocaleDateString('pt-BR');
      pdf.text(`Gerado em: ${date}`, margin, margin + 10);
      
      // Content
      pdf.setFontSize(10);
      const lines = pdf.splitTextToSize(cleanContent, maxWidth);
      
      let yPosition = margin + 25;
      const lineHeight = 5;
      
      for (let i = 0; i < lines.length; i++) {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(lines[i], margin, yPosition);
        yPosition += lineHeight;
      }
      
      const fileName = `${analysis.title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const clearAllAnalyses = () => {
    if (confirm('Tem certeza que deseja excluir TODAS as análises salvas? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('savedEmailAnalysis');
      localStorage.removeItem('savedEditorialAnalysis');
      localStorage.removeItem('savedMessageAnalysis');
      setSavedAnalyses([]);
      setSelectedAnalysis(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-secondary dark:via-secondary-light dark:to-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Voltar ao Dashboard
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
                  📚 Análises Salvas
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Gerencie suas análises de emails salvos
                </p>
              </div>
              
              {savedAnalyses.length > 0 && (
                <button
                  onClick={clearAllAnalyses}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-800 dark:text-red-200 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                  <span>Limpar Tudo</span>
                </button>
              )}
            </div>
          </div>

          {savedAnalyses.length === 0 ? (
            <div className="card text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary dark:text-white mb-2">
                Nenhuma análise salva
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Suas análises salvos aparecerão aqui quando você criar e salvar conteúdo nos módulos de Email, Editorial ou Mensagens.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Analyses List */}
              <div className="lg:col-span-1">
                <div className="card">
                  <h3 className="text-lg font-semibold text-secondary dark:text-white mb-4">
                    Análises Salvas ({savedAnalyses.length})
                  </h3>
                  
                  <div className="space-y-3">
                    {savedAnalyses.map((analysis) => (
                      <div
                        key={analysis.id}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedAnalysis?.id === analysis.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 dark:border-gray-600 hover:border-primary/50'
                        }`}
                        onClick={() => handleView(analysis)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-secondary dark:text-white">
                                {analysis.title}
                              </h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                analysis.type === 'emails' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200' :
                                analysis.type === 'editorial' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' :
                                analysis.type === 'messages' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200'
                              }`}>
                                {analysis.type === 'emails' ? '📧 Emails' :
                                 analysis.type === 'editorial' ? '📄 Editorial' :
                                 analysis.type === 'messages' ? '💬 Mensagens' : 'Outro'}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                  {new Date(analysis.metadata.savedAt).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              {analysis.metadata.answeredQuestions} respostas • {analysis.metadata.completionRate}% completo
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExportPDF(analysis);
                              }}
                              disabled={isExporting}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              title="Exportar PDF"
                            >
                              <DocumentArrowDownIcon className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(analysis.id);
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                              title="Excluir"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Viewer */}
              <div className="lg:col-span-2">
                {selectedAnalysis ? (
                  <div className="card">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-secondary dark:text-white">
                        {selectedAnalysis.title}
                      </h3>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleCopy(selectedAnalysis.content)}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary rounded-lg transition-colors"
                        >
                          <ClipboardIcon className="w-5 h-5" />
                          <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                        
                        <button
                          onClick={() => handleExportPDF(selectedAnalysis)}
                          disabled={isExporting}
                          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                          {isExporting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <DocumentArrowDownIcon className="w-5 h-5" />
                          )}
                          <span>{isExporting ? 'Gerando...' : 'Exportar PDF'}</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Metadata */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-secondary-light p-3 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Gerado em</div>
                        <div className="font-medium">
                          {new Date(selectedAnalysis.metadata.generatedAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-secondary-light p-3 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Respostas</div>
                        <div className="font-medium">
                          {selectedAnalysis.metadata.answeredQuestions} de {selectedAnalysis.metadata.totalQuestions}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-secondary-light p-3 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Completude</div>
                        <div className="font-medium">
                          {selectedAnalysis.metadata.completionRate}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-gray-50 dark:bg-secondary rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm">
                        {selectedAnalysis.content}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="card">
                    <div className="text-center py-16">
                      <EyeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-secondary dark:text-white mb-2">
                        Selecione uma análise
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Clique em uma análise à esquerda para visualizar o conteúdo
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedAnalyses;