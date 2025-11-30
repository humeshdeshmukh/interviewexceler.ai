import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPdf = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let page = 1;

    // Add pages if content exceeds A4 height
    while (heightLeft >= 0) {
      if (page > 1) {
        pdf.addPage();
      }

      const contentDataURL = canvas.toDataURL('image/png');
      pdf.addImage(
        contentDataURL,
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
        '',
        'FAST'
      );

      heightLeft -= pageHeight;
      position -= pageHeight;
      page++;
    }

    // Save the PDF
    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const shareResume = async (elementId: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    // Create canvas and convert to blob
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0);
    });

    // Create file from blob
    const file = new File([blob], 'resume.png', { type: 'image/png' });

    // Share using Web Share API if available
    if (navigator.share) {
      await navigator.share({
        files: [file],
        title: 'My Resume',
        text: 'Check out my professional resume!',
      });
      return true;
    } else {
      // Fallback: Download as image
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'resume.png';
      link.click();
      URL.revokeObjectURL(link.href);
      return true;
    }
  } catch (error) {
    console.error('Error sharing resume:', error);
    return false;
  }
};
