import jsPDF from 'jspdf';
import { ResumeData } from '../types/resume';

export const exportToPDF = (data: ResumeData): void => {
  const pdf = new jsPDF();
  let y = 20;
  const lineHeight = 6;
  const margin = 20;
  const maxWidth = 170;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, startY: number, fontSize: number = 10, style: 'normal' | 'bold' = 'normal'): number => {
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', style);
    
    const lines = pdf.splitTextToSize(text, maxWidth);
    let currentY = startY;
    
    lines.forEach((line: string) => {
      pdf.text(line, x, currentY);
      currentY += lineHeight;
    });
    
    return currentY;
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.personalInfo.fullName || 'Your Name', margin, y);
  y += 10;

  // Contact Information
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const contactInfo = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.address
  ].filter(Boolean).join(' • ');
  
  if (contactInfo) {
    y = addWrappedText(contactInfo, margin, y);
    y += 5;
  }

  // Add a line separator
  pdf.setLineWidth(0.5);
  pdf.line(margin, y, margin + maxWidth, y);
  y += 8;

  // Professional Summary
  if (data.personalInfo.summary) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Professional Summary', margin, y);
    y += 8;
    
    y = addWrappedText(data.personalInfo.summary, margin, y);
    y += 8;
  }

  // Work Experience
  if (data.experience.length > 0) {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Work Experience', margin, y);
    y += 8;

    data.experience.forEach((exp) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      // Position and Company
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(exp.position, margin, y);
      
      // Date range (right-aligned)
      const dateRange = `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`;
      const dateWidth = pdf.getTextWidth(dateRange);
      pdf.setFont('helvetica', 'normal');
      pdf.text(dateRange, margin + maxWidth - dateWidth, y);
      y += 6;

      // Company
      pdf.setFont('helvetica', 'normal');
      pdf.text(exp.company, margin, y);
      y += 6;

      // Responsibilities
      exp.responsibilities.forEach((responsibility) => {
        if (responsibility.trim()) {
          y = addWrappedText(`• ${responsibility}`, margin + 5, y);
        }
      });
      y += 4;
    });
  }

  // Education
  if (data.education.length > 0) {
    if (y > 250) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Education', margin, y);
    y += 8;

    data.education.forEach((edu) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      // Degree and Field
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      const degreeText = `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`;
      pdf.text(degreeText, margin, y);
      
      // Date range (right-aligned)
      const dateRange = `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`;
      const dateWidth = pdf.getTextWidth(dateRange);
      pdf.setFont('helvetica', 'normal');
      pdf.text(dateRange, margin + maxWidth - dateWidth, y);
      y += 6;

      // School
      pdf.setFont('helvetica', 'normal');
      pdf.text(edu.school, margin, y);
      y += 6;

      // GPA
      if (edu.gpa) {
        pdf.text(`GPA: ${edu.gpa}`, margin, y);
        y += 6;
      }
      y += 2;
    });
  }

  // Skills
  if (data.skills.length > 0) {
    if (y > 250) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Skills', margin, y);
    y += 8;

    const skillsText = data.skills.join(', ');
    y = addWrappedText(skillsText, margin, y);
  }

  // Save the PDF
  const fileName = `${data.personalInfo.fullName || 'resume'}_resume.pdf`;
  pdf.save(fileName);
};