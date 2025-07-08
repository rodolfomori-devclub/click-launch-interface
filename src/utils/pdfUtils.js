/**
 * Utility functions for PDF export
 * Centralizes the content cleaning logic to avoid encoding issues
 */

/**
 * Cleans content for PDF export by removing emojis and problematic characters
 * that cause encoding issues in jsPDF library
 * 
 * @param {string} text - Text content to clean
 * @returns {string} - Cleaned text safe for PDF export
 */
export const cleanContentForPDF = (text) => {
  if (!text) return '';
  
  return text
    // Remove markdown code blocks
    .replace(/```/g, '')
    // Remove emojis and unicode symbols that cause PDF issues
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    // Remove specific problematic characters that appear in generated content
    .replace(/[📧📤📋🎯💫📖💰🎁⭐🤖🥇🔸🔥✅⚡💡🚀📊📏📦📨🌊🧹💥🔍📱📚✨]/g, '')
    // Replace bullet points and special characters with safe alternatives
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

/**
 * Common PDF export configuration
 */
export const PDF_CONFIG = {
  format: 'a4',
  orientation: 'portrait',
  unit: 'mm',
  margin: 20,
  fontSize: {
    title: 16,
    subtitle: 12,
    body: 10
  },
  lineHeight: 5
};

/**
 * Creates a standardized PDF with title, date, and content
 * 
 * @param {Object} jsPDF - jsPDF instance
 * @param {string} title - PDF title
 * @param {string} content - Main content
 * @param {string} date - Generation date
 * @returns {Object} - PDF instance ready for save
 */
export const createStandardPDF = (jsPDF, title, content, date = null) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = PDF_CONFIG.margin;
  const maxWidth = pageWidth - (margin * 2);
  
  // Clean content for PDF
  const cleanContent = cleanContentForPDF(content);
  
  // Title
  pdf.setFontSize(PDF_CONFIG.fontSize.title);
  pdf.setFont(undefined, 'bold');
  pdf.text(title, margin, margin);
  
  // Date
  pdf.setFontSize(PDF_CONFIG.fontSize.body);
  pdf.setFont(undefined, 'normal');
  const displayDate = date || new Date().toLocaleDateString('pt-BR');
  pdf.text(`Gerado em: ${displayDate}`, margin, margin + 10);
  
  // Content
  pdf.setFontSize(PDF_CONFIG.fontSize.body);
  const lines = pdf.splitTextToSize(cleanContent, maxWidth);
  
  let yPosition = margin + 25;
  const lineHeight = PDF_CONFIG.lineHeight;
  
  for (let i = 0; i < lines.length; i++) {
    if (yPosition + lineHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    pdf.text(lines[i], margin, yPosition);
    yPosition += lineHeight;
  }
  
  return pdf;
};

export default {
  cleanContentForPDF,
  createStandardPDF,
  PDF_CONFIG
}; 