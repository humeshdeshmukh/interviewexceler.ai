import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import dynamic from 'next/dynamic';
import { asBlob } from 'html-docx-js-typescript';

// Dynamically import html-to-image
const htmlToImage = {
  toPng: async (node: HTMLElement, options?: any) => {
    const { toPng } = await import('html-to-image');
    return toPng(node, options);
  },
  toJpeg: async (node: HTMLElement, options?: any) => {
    const { toJpeg } = await import('html-to-image');
    return toJpeg(node, options);
  },
  toSvg: async (node: HTMLElement, options?: any) => {
    const { toSvg } = await import('html-to-image');
    return toSvg(node, options);
  },
};

interface ExportOptions {
  quality?: number;
  scale?: number;
  format?: 'Letter' | 'A4';
  margin?: number;
  fileName?: string;
}

export const exportFormats = {
  PDF: 'pdf',
  PNG: 'png',
  JPEG: 'jpeg',
  SVG: 'svg',
  DOCX: 'docx',
} as const;

export type ExportFormat = typeof exportFormats[keyof typeof exportFormats];

const defaultOptions: ExportOptions = {
  quality: 2,
  scale: 2,
  format: 'Letter',
  margin: 0,
  fileName: 'resume',
};

export const exportToPdf = async (
  elementId: string,
  options: ExportOptions = defaultOptions
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const canvas = await html2canvas(element, {
      scale: options.scale || 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: options.format,
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${options.fileName || 'resume'}.pdf`);

    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return false;
  }
};

export const exportToImage = async (
  elementId: string,
  format: 'png' | 'jpeg',
  options: ExportOptions = defaultOptions
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const exportFn = format === 'png' ? htmlToImage.toPng : htmlToImage.toJpeg;
    const dataUrl = await exportFn(element, {
      quality: options.quality || 0.95,
      pixelRatio: options.scale || 2,
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${options.fileName || 'resume'}.${format}`;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error(`Error exporting to ${format.toUpperCase()}:`, error);
    return false;
  }
};

export const exportToSvg = async (
  elementId: string,
  options: ExportOptions = defaultOptions
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const dataUrl = await htmlToImage.toSvg(element, {
      quality: options.quality || 1,
      pixelRatio: options.scale || 2,
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${options.fileName || 'resume'}.svg`;
    link.href = dataUrl;
    link.click();

    return true;
  } catch (error) {
    console.error('Error exporting to SVG:', error);
    return false;
  }
};

export const exportToDocx = async (
  elementId: string,
  options: ExportOptions = defaultOptions
): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    // Get the HTML content
    const htmlContent = element.outerHTML;

    // Convert HTML to DOCX format using html-docx-js-typescript
    const docxBlob = await asBlob(htmlContent, {
      orientation: 'portrait',
      margins: {
        top: '1in',
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
    });

    // Create a download link
    const url = window.URL.createObjectURL(docxBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${options.fileName || 'resume'}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    return false;
  }
};

export const shareResume = async (elementId: string): Promise<boolean> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    // Convert to PNG for sharing
    const dataUrl = await htmlToImage.toPng(element, {
      quality: 0.8,
      pixelRatio: 2,
    });

    // Convert data URL to Blob
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'resume.png', { type: 'image/png' });

    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: 'My Resume',
        text: 'Check out my professional resume!',
      });
    } else {
      // Fallback to download if Web Share API is not supported
      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = dataUrl;
      link.click();
    }

    return true;
  } catch (error) {
    console.error('Error sharing resume:', error);
    return false;
  }
};

// Helper function to validate export options
export const validateExportOptions = (options: ExportOptions): ExportOptions => {
  return {
    ...defaultOptions,
    ...options,
    quality: Math.min(Math.max(options.quality || 1, 0.1), 1),
    scale: Math.min(Math.max(options.scale || 2, 1), 4),
  };
};
