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
        
        {/* Progress Bar */}
        {result?.currentBatch && result?.totalBatches && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progresso da Sequência</span>
              <span>{Math.round((result.currentBatch / result.totalBatches) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-secondary-light rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(result.currentBatch / result.totalBatches) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
              {Array.from({ length: result.totalBatches }, (_, i) => (
                <span key={i} className={`${i < result.currentBatch ? 'text-primary font-medium' : ''}`}>
                  F{i + 1}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Continue Button at Top */}
        {shouldShowContinueButton && !isGeneratingStatus && !isRetryingStatus && (
          <div className="mt-4">
            <button
              onClick={handleContinue}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium shadow-lg"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>
                🚀 Continuar para Fase {result?.currentBatch ? result.currentBatch + 1 : 'Próxima'}/5
                {result?.nextPhaseName && ` - ${result.nextPhaseName}`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <EnvelopeIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary dark:text-white">
                {emails.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Emails</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <BookmarkIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary dark:text-white">
                {result?.answeredQuestions || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Respostas</p>
            </div>
          </div>
        </div>

        {result?.currentBatch && result?.totalBatches && (
          <div className="card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">
                  {result.currentBatch}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary dark:text-white">
                  {result.currentBatch}/{result.totalBatches}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {result.isComplete ? 'Completo' : 'Fase Atual'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">📧</span>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary dark:text-white">
                Gerado em
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result?.generatedAt ? new Date(result.generatedAt).toLocaleDateString('pt-BR') : 'Agora'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card">
        {/* Action Buttons */}
        {!isGeneratingStatus && (
          <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            {shouldShowContinueButton && (
              <button
                onClick={handleContinue}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 hover:bg-orange-200 dark:hover:bg-orange-900/40 text-orange-800 dark:text-orange-200 rounded-lg transition-colors font-medium"
              >
                <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Continuar Fase {result?.currentBatch ? result.currentBatch + 1 : 'Próxima'}/5</span>
              </button>
            )}
            
            <button
              onClick={handleCopyContent}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary rounded-lg transition-colors"
            >
              <ClipboardIcon className="w-5 h-5" />
              <span>{copied ? 'Copiado!' : 'Copiar Todos'}</span>
            </button>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
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
              className="btn-primary px-4 py-2 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <BookmarkIcon className="w-5 h-5 mr-2" />
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
              <div key={email.id} className="bg-gray-50 dark:bg-secondary rounded-lg p-6 relative">
                <button
                  onClick={() => handleCopySection(email.content, index)}
                  className="absolute top-4 right-4 p-2 bg-white dark:bg-secondary-light rounded-lg hover:bg-gray-100 dark:hover:bg-secondary transition-colors"
                  title="Copiar este email"
                >
                  {copiedSection === index ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm pr-12">
                  {email.content}
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Continue Button at Bottom */}
        {shouldShowContinueButton && !isGeneratingStatus && !isRetryingStatus && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all transform hover:scale-105 font-medium shadow-xl text-lg"
              >
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>🚀 Continuar para Fase {result?.currentBatch ? result.currentBatch + 1 : 'Próxima'}/5 - {result?.nextPhaseName || 'Próxima Fase'}</span>
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