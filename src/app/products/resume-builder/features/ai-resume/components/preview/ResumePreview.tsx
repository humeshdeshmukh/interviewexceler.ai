'use client';

import { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, FileText, Loader2, Layout } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { generateDocx } from '../../utils/docx-generator';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { TwoColumnTemplate } from './templates/TwoColumnTemplate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const templates = [
  { id: 'modern', name: 'Modern', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
  { id: 'two-column', name: 'Two Column', component: TwoColumnTemplate },
];

export const ResumePreview = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [scale, setScale] = useState(1);

  // Calculate ATS score
  useEffect(() => {
    const calculateScore = async () => {
      try {
        setError(null);
        const response = await fetch('/api/resume/analyze-ats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resumeData }),
        });

        if (!response.ok) {
          throw new Error(response.status === 429 
            ? 'API quota exceeded. Please try again later.'
            : 'Error calculating ATS score');
        }

        const data = await response.json();
        setAtsScore(data.score);
      } catch (err) {
        setError('Error calculating ATS score. Please try again later.');
        setAtsScore(null);
      }
    };
    calculateScore();
  }, [resumeData]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('resume-preview');
      if (!element) return;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add CSS to prevent section splitting
      const style = document.createElement('style');
      style.textContent = `
        .section {
          break-inside: avoid;
          page-break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        .two-column-grid {
          break-inside: avoid-column;
          page-break-inside: avoid;
        }
      `;
      document.head.appendChild(style);

      // Calculate proper dimensions for A4 page
      const a4Width = 210; // mm
      const a4Height = 297; // mm
      const pixelsPerMm = 96 / 25.4; // Standard DPI conversion
      const pdfWidthInPx = a4Width * pixelsPerMm;
      const pdfHeightInPx = a4Height * pixelsPerMm;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        windowWidth: pdfWidthInPx,
        windowHeight: pdfHeightInPx,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('resume-preview');
          if (clonedElement) {
            // Reset any scaling and set exact dimensions
            clonedElement.style.transform = 'none';
            clonedElement.style.width = `${pdfWidthInPx}px`;
            clonedElement.style.height = 'auto';
            clonedElement.style.margin = '0';
            clonedElement.style.padding = '20px';

            // Add page-break classes to all sections
            const sections = clonedElement.querySelectorAll('.section, [class*="space-y"]');
            sections.forEach(section => {
              section.classList.add('section');
            });

            // Special handling for two-column template
            const twoColumnGrid = clonedElement.querySelector('.grid-cols-3');
            if (twoColumnGrid) {
              twoColumnGrid.classList.add('two-column-grid');
              // Ensure each column stays together
              const columns = twoColumnGrid.children;
              Array.from(columns).forEach(column => {
                column.classList.add('section');
              });
            }

            // Add styles for better text rendering
            const styleClone = style.cloneNode(true);
            clonedDoc.head.appendChild(styleClone);
          }
        }
      });

      // Get the content aspect ratio
      const imgWidth = a4Width;
      const imgHeight = (canvas.height * a4Width) / canvas.width;
      
      // Handle multi-page content with section awareness
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 0;

      while (heightLeft > 0) {
        // Add new page if it's not the first page
        if (pageCount > 0) {
          pdf.addPage();
        }

        // Calculate the height for this page
        const currentHeight = Math.min(a4Height, heightLeft);

        // Add the image
        pdf.addImage(
          canvas.toDataURL('image/png', 1.0),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
          '',
          'FAST'
        );

        heightLeft -= a4Height;
        position -= a4Height;
        pageCount++;
      }

      // Clean up the added style element
      document.head.removeChild(style);

      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDOCX = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateDocx(resumeData, selectedTemplate);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_resume.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      setError('Error generating DOCX. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      const element = document.getElementById('resume-preview');
      if (!element) return;

      const canvas = await html2canvas(element);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.share({
            files: [new File([blob], 'resume.png', { type: 'image/png' })],
            title: 'My Resume',
            text: 'Check out my resume!',
          });
        } catch (error) {
          console.error('Error sharing:', error);
          setError('Error sharing resume. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Error generating image for sharing. Please try again.');
    }
  };

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resume Preview</h2>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
          {atsScore !== null && !error && (
            <div className="mt-2 flex items-center">
              <span className="text-sm font-medium mr-2">ATS Score:</span>
              <div className="bg-gray-200 rounded-full h-2.5 w-40">
                <div 
                  className={`h-2.5 rounded-full ${
                    atsScore >= 80 ? 'bg-green-600' :
                    atsScore >= 60 ? 'bg-yellow-400' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${atsScore}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium">{atsScore}%</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[180px]">
              <Layout className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Choose template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setScale(Math.max(0.5, scale - 0.1))}>-</Button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <Button variant="outline" onClick={() => setScale(Math.min(1.5, scale + 0.1))}>+</Button>
          </div>

          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? 'Generating...' : 'Download'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDownloadPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadDOCX}>
                <FileText className="w-4 h-4 mr-2" />
                Download DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="p-6 bg-white overflow-auto">
        <div id="resume-preview" className="max-w-4xl mx-auto">
          <SelectedTemplateComponent resumeData={resumeData} scale={scale} />
        </div>
      </Card>
    </div>
  );
};
