import { useState } from 'react';
import { 
  ArrowLeftIcon, 
  DocumentArrowDownIcon, 
  ClipboardIcon,
  CheckCircleIcon,
  BookmarkIcon 
} from '@heroicons/react/24/outline';

const EditorialResult = ({ result, onStartOver, onBackToQuestions, canContinue, onContinue, isGenerating }) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const isGeneratingStatus = result?.status === 'generating' || isGenerating;

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(result?.content || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleExportPDF = async () => {
    if (!result?.content) return;
    
    setIsExporting(true);
    
    try {
      const cleanContent = result.content.replace(/```/g, '').trim();
      
      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Linha Editorial - ClickLaunch', margin, margin);
      
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const date = new Date().toLocaleDateString('pt-BR');
      pdf.text(`Gerado em: ${date}`, margin, margin + 10);
      
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
      
      const fileName = `linha-editorial-clicklaunch-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao exportar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveEditorial = () => {
    if (!result) return;
    
    setIsSaving(true);
    
    try {
      const existingSaved = JSON.parse(localStorage.getItem('savedEditorialAnalysis') || '[]');
      
      const newSave = {
        id: Date.now().toString(),
        title: `Editorial - ${new Date().toLocaleDateString('pt-BR')}`,
        content: result.content,
        metadata: {
          totalQuestions: result.totalQuestions,
          answeredQuestions: result.answeredQuestions,
          completionRate: result.completionRate,
          generatedAt: result.generatedAt || new Date().toISOString(),
          savedAt: new Date().toISOString()
        },
        type: 'editorial'
      };
      
      const updatedSaved = [newSave, ...existingSaved];
      const limitedSaved = updatedSaved.slice(0, 20);
      
      localStorage.setItem('savedEditorialAnalysis', JSON.stringify(limitedSaved));
      
      setTimeout(() => setIsSaving(false), 1000);
      
    } catch (error) {
      console.error('Erro ao salvar editorial:', error);
      alert('Erro ao salvar editorial. Tente novamente.');
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          {isGeneratingStatus ? (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          )}
          <h1 className="text-3xl font-bold text-secondary dark:text-white">
            {isGeneratingStatus ? 'Gerando Sua Linha Editorial...' : 'Sua Linha Editorial Estratégica'}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {isGeneratingStatus ? 
            'Aguarde enquanto o Claude AI analisa suas respostas e gera sua linha editorial personalizada...' :
            `Linha editorial personalizada gerada com base em ${result?.answeredQuestions || 0} respostas (${result?.completionRate || 0}% completo)`
          }
        </p>
        
        {/* Continue Button at Top */}
        {canContinue && !isGeneratingStatus && (
          <div className="mt-4">
            <button
              onClick={onContinue}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium shadow-lg"
            >
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>🚀 Continuar Geração do Conteúdo</span>
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary dark:text-white">
                {result?.completionRate || 0}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completo</p>
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

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">✨</span>
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
            {canContinue && (
              <button
                onClick={onContinue}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 hover:bg-orange-200 dark:hover:bg-orange-900/40 text-orange-800 dark:text-orange-200 rounded-lg transition-colors font-medium"
              >
                <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                <span>Continuar Geração</span>
              </button>
            )}
            
            <button
              onClick={handleCopyContent}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary rounded-lg transition-colors"
            >
              <ClipboardIcon className="w-5 h-5" />
              <span>{copied ? 'Copiado!' : 'Copiar Conteúdo'}</span>
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
              onClick={handleSaveEditorial}
              disabled={isSaving}
              className="btn-primary px-4 py-2 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <BookmarkIcon className="w-5 h-5 mr-2" />
              )}
              <span>{isSaving ? 'Salvando...' : 'Salvar Editorial'}</span>
            </button>
          </div>
        )}

        {/* Editorial Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="bg-gray-50 dark:bg-secondary rounded-lg p-6 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {result?.content || (isGeneratingStatus ? 'Aguarde, o conteúdo está sendo gerado em tempo real...' : 'Nenhum conteúdo disponível')}
            </pre>
            {isGeneratingStatus && (
              <div className="mt-4 flex items-center space-x-2 text-primary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Gerando conteúdo em tempo real...</span>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button at Bottom */}
        {canContinue && !isGeneratingStatus && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center">
              <button
                onClick={onContinue}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all transform hover:scale-105 font-medium shadow-xl text-lg"
              >
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>🚀 Continuar Geração do Restante do Conteúdo</span>
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
              <span>Criar Nova Linha Editorial</span>
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

      {/* Next Steps */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-lg border border-primary/20">
        <h3 className="text-lg font-semibold text-secondary dark:text-white mb-3">
          🎯 Próximos Passos Recomendados
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">1.</span>
            <span>Implemente o cronograma de publicações gradualmente</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">2.</span>
            <span>Crie templates para cada tipo de conteúdo</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">3.</span>
            <span>Configure métricas de acompanhamento</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary font-bold">4.</span>
            <span>Prepare o banco de conteúdos para cada pilar</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditorialResult;