import { useState } from 'react';
import { 
  ArrowLeftIcon, 
  DocumentArrowDownIcon, 
  ClipboardIcon,
  CheckCircleIcon,
  BookmarkIcon,
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EmailsResult = ({ result, onStartOver, onBackToQuestions, canContinue, onContinue, isGenerating }) => {
  const [copied, setCopied] = useState(false);
  const [copiedSection, setCopiedSection] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const isGeneratingStatus = result?.status === 'generating' || isGenerating;
  const isRetryingStatus = result?.status === 'retrying';

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(result?.content || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleCopySection = async (section, index) => {
    try {
      await navigator.clipboard.writeText(section);
      setCopiedSection(index);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar seção:', error);
    }
  };

  const handleExportPDF = async () => {
    if (!result?.content) return;
    
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
          .replace(/[📧📤📋🎯💫📖💰🎁⭐🤖🥇🔸🔥✅⚡💡🚀📊📏📦📨🌊🧹💥🔍]/g, '')
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
      
      // Create a clean version of the content for PDF
      const cleanContent = cleanContentForPDF(result.content);
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      // Title
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Sequência de Emails - ClickLaunch', margin, margin);
      
      // Date
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const date = new Date().toLocaleDateString('pt-BR');
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
      
      // Save the PDF
      const fileName = `emails-clicklaunch-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveEmails = () => {
    if (!result) return;
    
    setIsSaving(true);
    
    try {
      // Get existing saved emails
      const existingSaved = JSON.parse(localStorage.getItem('savedEmailAnalysis') || '[]');
      
      // Create new save entry
      const newSave = {
        id: Date.now().toString(),
        title: `Emails - ${new Date().toLocaleDateString('pt-BR')}`,
        content: result.content,
        metadata: {
          totalQuestions: result.totalQuestions,
          answeredQuestions: result.answeredQuestions,
          completionRate: result.completionRate,
          generatedAt: result.generatedAt || new Date().toISOString(),
          savedAt: new Date().toISOString()
        },
        type: 'emails'
      };
      
      // Add to saved list
      const updatedSaved = [newSave, ...existingSaved];
      
      // Keep only last 20 saves to avoid localStorage bloat
      const limitedSaved = updatedSaved.slice(0, 20);
      
      // Save to localStorage
      localStorage.setItem('savedEmailAnalysis', JSON.stringify(limitedSaved));
      
      // Show success feedback
      setTimeout(() => setIsSaving(false), 1000);
      
    } catch (error) {
      console.error('Erro ao salvar emails:', error);
      alert('Erro ao salvar emails. Tente novamente.');
      setIsSaving(false);
    }
  };

  // Parse emails from content
  const parseEmails = (content) => {
    if (!content) return [];
    
    // Split by email markers with better patterns
    const sections = content.split(/(?=EMAIL\s+\d+|E-MAIL\s+\d+|\*\*EMAIL\s+\d+|\*\*E-MAIL\s+\d+|##\s+EMAIL\s+\d+|---\s*EMAIL\s+\d+)/i);
    
    return sections
      .filter(s => s.trim()) // Remove empty sections
      .filter(s => !s.match(/^[\s\-`*#]+$/)) // Remove sections that are only separators
      .filter(s => s.trim().length > 20) // Remove very short sections
      .filter(s => s.toLowerCase().includes('email') || s.toLowerCase().includes('assunto')) // Must contain email content
      .map((section, index) => ({
        id: index,
        content: section.trim()
      }));
  };

  const emails = parseEmails(result?.content);

  // Determine if continue button should show
  const shouldShowContinueButton = canContinue || 
    result?.canContinue || 
    (result?.isSequentialGeneration && !result?.isComplete && 
     result?.currentPhaseIndex < 4); // 4 = last phase index (0-4 for 5 phases)

  // Debug log (reduced for cleaner console)
  if (result && result.currentPhaseIndex < 4) {
    console.log('🔍 EmailsResult - Phase:', result.currentPhaseIndex + 1, 'shouldShowButton:', shouldShowContinueButton);
  }

  // Safe continue handler
  const handleContinue = () => {
    console.log('🚀 Continue button clicked');
    if (onContinue) {
      onContinue();
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          {isGeneratingStatus || isRetryingStatus ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          )}
          <h1 className="text-3xl font-bold text-secondary dark:text-white">
            {isRetryingStatus ? 
              `⚠️ Tentando novamente - Fase ${result?.currentBatch || 1}/5` :
              isGeneratingStatus ? 
                `Gerando Fase ${result?.currentBatch || 1}/5 - ${result?.phaseName || 'Carregando...'}` : 
                result?.isComplete ? 
                  '✅ Sequência de 29 Emails Completa' : 
                  `Fase ${result?.currentBatch || 1}/5 - ${result?.phaseName || 'Concluída'}`
            }
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {isRetryingStatus ?
            result?.retryMessage || 'API temporariamente sobrecarregada, tentando novamente...' :
            isGeneratingStatus ? 
              'Aguarde enquanto o assistente de IA cria sua sequência completa de emails de lançamento...' :
              `${emails.length} emails gerados com base nas suas ${result?.answeredQuestions || 0} respostas`
          }
          {result?.currentBatch && result?.totalBatches && (
            <span className="ml-2 text-primary font-medium">
              • Fase {result.currentBatch}/{result.totalBatches}
              {result.isComplete && " • ✅ Sequência Completa"}
            </span>
          )}
        </p>
        
        {/* Enhanced Progress Bar */}
        {result?.currentBatch && result?.totalBatches && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-medium">Progresso da Sequência</span>
              <span className="font-bold text-primary">{Math.round((result.currentBatch / result.totalBatches) * 100)}%</span>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${(result.currentBatch / result.totalBatches) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-2">
              {Array.from({ length: result.totalBatches }, (_, i) => (
                <span key={i} className={`transition-all duration-300 ${
                  i < result.currentBatch 
                    ? 'text-primary font-bold scale-110' 
                    : 'text-gray-400 dark:text-gray-600'
                }`}>
                  F{i + 1}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Continue Button at Top */}
        {shouldShowContinueButton && !isGeneratingStatus && !isRetryingStatus && (
          <div className="mt-6">
            <button
              onClick={handleContinue}
              className="btn-continue group"
            >
              <span className="btn-continue-icon">🚀</span>
              <span className="btn-continue-text">
                Continuar para Fase {result?.currentBatch ? result.currentBatch + 1 : 'Próxima'}/5
                {result?.nextPhaseName && ` - ${result.nextPhaseName}`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stats-card group">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <EnvelopeIcon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-secondary dark:text-white mb-1">
                {emails.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Emails Gerados</p>
              <div className="w-full bg-green-100 dark:bg-green-900/20 rounded-full h-1 mt-2">
                <div className="bg-green-500 h-1 rounded-full w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <BookmarkIcon className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-secondary dark:text-white mb-1">
                {result?.answeredQuestions || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Respostas Base</p>
              <div className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-full h-1 mt-2">
                <div className="bg-blue-500 h-1 rounded-full w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>

        {result?.currentBatch && result?.totalBatches && (
          <div className="stats-card group">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">
                  {result.currentBatch}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-secondary dark:text-white mb-1">
                  Fase {result.currentBatch}/{result.totalBatches}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {result.isComplete ? '✅ Concluída' : '🔄 Atual'}
                </p>
                <div className="w-full bg-primary/20 rounded-full h-1 mt-2">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all duration-700"
                    style={{ width: `${(result.currentBatch / result.totalBatches) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="stats-card group">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white text-2xl">⏰</span>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-secondary dark:text-white mb-1">
                Criado em
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result?.generatedAt ? new Date(result.generatedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit', 
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Agora'}
              </p>
              <div className="w-full bg-purple-100 dark:bg-purple-900/20 rounded-full h-1 mt-2">
                <div className="bg-purple-500 h-1 rounded-full w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card">
        {/* Enhanced Action Buttons */}
        {!isGeneratingStatus && (
          <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
            {shouldShowContinueButton && (
              <button
                onClick={handleContinue}
                className="btn-continue group"
              >
                <span className="btn-continue-icon">🚀</span>
                <span className="btn-continue-text">
                  Continuar Fase {result?.currentBatch ? result.currentBatch + 1 : 'Próxima'}/5
                </span>
              </button>
            )}
            
            <button
              onClick={handleCopyContent}
              className="action-btn-secondary"
            >
              <ClipboardIcon className="w-5 h-5" />
              <span>{copied ? '✅ Copiado!' : 'Copiar Todos'}</span>
            </button>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="action-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <DocumentArrowDownIcon className="w-5 h-5" />
              )}
              <span>{isExporting ? 'Gerando PDF...' : 'Exportar PDF'}</span>
            </button>

            <button
              onClick={handleSaveEmails}
              disabled={isSaving}
              className="action-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
              <span>{isSaving ? 'Salvando...' : 'Salvar Emails'}</span>
            </button>
          </div>
        )}

        {/* Emails Content */}
        <div className="space-y-6">
          {isRetryingStatus ? (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">Tentando novamente...</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    {result?.retryMessage || 'API temporariamente sobrecarregada. O sistema está tentando novamente automaticamente.'}
                  </p>
                </div>
              </div>
            </div>
          ) : isGeneratingStatus ? (
            <div className="bg-gray-50 dark:bg-secondary rounded-lg p-6">
              <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm">
                {result?.content || 'Aguarde, a sequência de emails está sendo gerada em tempo real...'}
              </pre>
              <div className="mt-4 flex items-center space-x-2 text-primary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Gerando emails em tempo real...</span>
              </div>
            </div>
          ) : (
            emails.map((email, index) => (
              <div key={email.id} className="email-card">
                <button
                  onClick={() => handleCopySection(email.content, index)}
                  className="copy-btn"
                  title="Copiar este email"
                >
                  {copiedSection === index ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm pr-16 leading-relaxed">
                  {email.content}
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Continue Button at Bottom */}
        {shouldShowContinueButton && !isGeneratingStatus && !isRetryingStatus && (
          <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                className="btn-continue group text-lg px-10 py-5"
              >
                <span className="btn-continue-icon text-2xl">🚀</span>
                <span className="btn-continue-text">
                  Continuar para Fase {result?.currentBatch ? result.currentBatch + 1 : 'Próxima'}/5
                  {result?.nextPhaseName && (
                    <span className="block text-sm opacity-90 mt-1">
                      {result.nextPhaseName}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        )}
        

        {/* Bottom Actions */}
        {!isGeneratingStatus && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <button
              onClick={onStartOver}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Criar Nova Sequência</span>
            </button>

            <button
              onClick={onBackToQuestions}
              className="text-primary hover:text-primary-dark font-medium transition-colors"
            >
              Editar Respostas
            </button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg border border-primary/20">
        <h3 className="text-lg font-semibold text-secondary dark:text-white mb-3">
          💡 Dicas para Usar os Emails
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">1.</span>
            <span>Copie cada email individualmente clicando no ícone de copiar</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">2.</span>
            <span>Personalize subject lines e conteúdo específico antes de enviar</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">3.</span>
            <span>Respeite o timing sugerido para cada fase da sequência</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">4.</span>
            <span>Teste todos os links e CTAs antes de configurar na sua plataforma</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">5.</span>
            <span>Adapte o conteúdo ao seu tom de voz e marca pessoal</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmailsResult;