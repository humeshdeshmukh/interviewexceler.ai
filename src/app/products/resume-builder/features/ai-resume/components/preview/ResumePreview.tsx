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
import { Switch } from '@/components/ui/switch';

const templates = [
  { id: 'modern', name: 'Modern', component: ModernTemplate },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate },
  { id: 'two-column', name: 'Two Column', component: TwoColumnTemplate },
];

const paperSizes = [
  { id: 'a4', name: 'A4', width: 210, height: 297 },
  { id: 'letter', name: 'US Letter', width: 216, height: 279 } // 8.5x11 inches in mm
];
const textSizes = [
  { id: 'normal', name: 'Normal', className: '' },
  { id: 'large', name: 'Large', className: 'text-lg' },
  { id: 'small', name: 'Small', className: 'text-sm' }
];

const fontFamilies = [
  { id: 'Arial', name: 'Arial, sans-serif' },
  { id: 'Times New Roman', name: 'Times New Roman, serif' },
  { id: 'Georgia', name: 'Georgia, serif' },
  { id: 'Courier New', name: 'Courier New, monospace' },
  { id: 'Verdana', name: 'Verdana, sans-serif' },
];

// Default adjustment values
const DEFAULT_PADDING = 24;
const DEFAULT_LINE_SPACING = 1.5;
const DEFAULT_SECTION_SPACING = 24;
const DEFAULT_WORD_SPACING = 0;

export const ResumePreview = () => {
  const { resumeData } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [scale, setScale] = useState(1);
  const [paperSize, setPaperSize] = useState('a4');
  const [textSize, setTextSize] = useState('normal');
  const [fontFamily, setFontFamily] = useState('Arial');

  // Advanced adjustment states
  const [showBorder, setShowBorder] = useState(true);
  const [padding, setPadding] = useState(DEFAULT_PADDING);
  const [lineSpacing, setLineSpacing] = useState(DEFAULT_LINE_SPACING);
  const [sectionSpacing, setSectionSpacing] = useState(DEFAULT_SECTION_SPACING);
  const [wordSpacing, setWordSpacing] = useState(DEFAULT_WORD_SPACING);

  // Track last export settings for sync indicator
  const [lastExportSettings, setLastExportSettings] = useState<any>(null);
  const isSynced = lastExportSettings &&
    lastExportSettings.fontFamily === fontFamily &&
    lastExportSettings.paperSize === paperSize &&
    lastExportSettings.textSize === textSize &&
    lastExportSettings.showBorder === showBorder &&
    lastExportSettings.padding === padding &&
    lastExportSettings.lineSpacing === lineSpacing &&
    lastExportSettings.sectionSpacing === sectionSpacing &&
    lastExportSettings.wordSpacing === wordSpacing;

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('resume-preview');
      if (!element) return;

      const sizeObj = paperSizes.find(p => p.id === paperSize) || paperSizes[0];
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [sizeObj.width, sizeObj.height]
      });

      // Add CSS to prevent section splitting and adjust text size
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
        .resume-text-size-large { font-size: 1.15rem !important; }
        .resume-text-size-small { font-size: 0.9rem !important; }
        .resume-word-spacing { word-spacing: ${wordSpacing}px !important; }
        .resume-line-spacing { line-height: ${lineSpacing} !important; }
        .resume-section-spacing > * + * { margin-top: ${sectionSpacing}px !important; }
        #resume-preview { font-family: ${fontFamily}, Arial, sans-serif !important; }
      `;
      document.head.appendChild(style);

      // Calculate proper dimensions for selected paper size
      const width = sizeObj.width;
      const height = sizeObj.height;
      const pixelsPerMm = 96 / 25.4; // Standard DPI conversion
      const pdfWidthInPx = width * pixelsPerMm;
      const pdfHeightInPx = height * pixelsPerMm;

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
            clonedElement.style.padding = `${padding}px`;
            // Add text/spacing classes
            clonedElement.classList.remove('resume-text-size-large', 'resume-text-size-small', 'resume-word-spacing', 'resume-line-spacing', 'resume-section-spacing');
            if (textSize === 'large') clonedElement.classList.add('resume-text-size-large');
            if (textSize === 'small') clonedElement.classList.add('resume-text-size-small');
            clonedElement.classList.add('resume-word-spacing', 'resume-line-spacing', 'resume-section-spacing');

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
      const imgWidth = width;
      const imgHeight = (canvas.height * width) / canvas.width;

      // Handle multi-page content with section awareness
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 0;
      while (heightLeft > 0) {
        if (pageCount > 0) pdf.addPage();
        const currentHeight = Math.min(height, heightLeft);
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
        heightLeft -= height;
        position -= height;
        pageCount++;
      }

      // Clean up the added style element
      document.head.removeChild(style);

      pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_resume.pdf`);
      setLastExportSettings({
        fontFamily, paperSize, textSize, showBorder, padding, lineSpacing, sectionSpacing, wordSpacing
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDocx = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateDocx(resumeData);
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

  // Print Preview: open PDF in new tab
  const handlePrintPreview = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById('resume-preview');
      if (!element) return;
      const sizeObj = paperSizes.find(p => p.id === paperSize) || paperSizes[0];
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [sizeObj.width, sizeObj.height]
      });
      // Add CSS to prevent section splitting and adjust text size
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
        .resume-text-size-large { font-size: 1.15rem !important; }
        .resume-text-size-small { font-size: 0.9rem !important; }
        .resume-word-spacing { word-spacing: ${wordSpacing}px !important; }
        .resume-line-spacing { line-height: ${lineSpacing} !important; }
        .resume-section-spacing > * + * { margin-top: ${sectionSpacing}px !important; }
        #resume-preview { font-family: ${fontFamily}, Arial, sans-serif !important; }
      `;
      document.head.appendChild(style);

      // Calculate proper dimensions for selected paper size
      const width = sizeObj.width;
      const height = sizeObj.height;
      const pixelsPerMm = 96 / 25.4; // Standard DPI conversion
      const pdfWidthInPx = width * pixelsPerMm;
      const pdfHeightInPx = height * pixelsPerMm;

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
            clonedElement.style.padding = `${padding}px`;
            // Add text/spacing classes
            clonedElement.classList.remove('resume-text-size-large', 'resume-text-size-small', 'resume-word-spacing', 'resume-line-spacing', 'resume-section-spacing');
            if (textSize === 'large') clonedElement.classList.add('resume-text-size-large');
            if (textSize === 'small') clonedElement.classList.add('resume-text-size-small');
            clonedElement.classList.add('resume-word-spacing', 'resume-line-spacing', 'resume-section-spacing');

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
      const imgWidth = width;
      const imgHeight = (canvas.height * width) / canvas.width;

      // Handle multi-page content with section awareness
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 0;
      while (heightLeft > 0) {
        if (pageCount > 0) pdf.addPage();
        const currentHeight = Math.min(height, heightLeft);
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
        heightLeft -= height;
        position -= height;
        pageCount++;
      }

      // Clean up the added style element
      document.head.removeChild(style);

      // Open PDF in new tab
      window.open(pdf.output('bloburl'), '_blank');
    } catch (error) {
      setError('Error generating print preview.');
    } finally {
      setIsGenerating(false);
    }
  };

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || ModernTemplate;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Resume Preview</h2>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[150px]">
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

          <Select value={paperSize} onValueChange={setPaperSize}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Paper size" />
            </SelectTrigger>
            <SelectContent>
              {paperSizes.map(size => (
                <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={textSize} onValueChange={setTextSize}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Text size" />
            </SelectTrigger>
            <SelectContent>
              {textSizes.map(size => (
                <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Font family" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map(f => (
                <SelectItem key={f.id} value={f.id}>{f.id}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Switch checked={showBorder} onCheckedChange={setShowBorder} />
            <span className="text-xs">Show Border</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Padding</span>
            <input type="range" min={0} max={64} value={padding} onChange={e => setPadding(Number(e.target.value))} />
            <span className="text-xs">{padding}px</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Line Spacing</span>
            <input type="range" min={1} max={2.5} step={0.05} value={lineSpacing} onChange={e => setLineSpacing(Number(e.target.value))} />
            <span className="text-xs">{lineSpacing}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Section Spacing</span>
            <input type="range" min={0} max={64} value={sectionSpacing} onChange={e => setSectionSpacing(Number(e.target.value))} />
            <span className="text-xs">{sectionSpacing}px</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Word Spacing</span>
            <input type="range" min={0} max={16} value={wordSpacing} onChange={e => setWordSpacing(Number(e.target.value))} />
            <span className="text-xs">{wordSpacing}px</span>
          </div>

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
              <DropdownMenuItem onClick={handleDownloadDocx}>
                <FileText className="w-4 h-4 mr-2" />
                Download DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={handlePrintPreview}>
            Print Preview
          </Button>

          {/* Visual sync indicator */}
          <span className={`text-xs ml-2 ${isSynced ? 'text-green-600' : 'text-yellow-600'}`}>{isSynced ? 'Preview/export in sync' : 'Preview/export not in sync'}</span>

          {/* Custom font note */}
          {fontFamily !== 'Arial' && (
            <span className="text-xs text-orange-500 ml-2">Note: Custom font embedding for PDF may require additional setup for full fidelity.</span>
          )}
        </div>
      </div>

      <Card className="p-6 bg-white overflow-auto">
        <div
          id="resume-preview"
          className={`max-w-4xl mx-auto ${showBorder ? 'border border-gray-300 rounded shadow' : ''} bg-white ${textSize === 'large' ? 'resume-text-size-large' : textSize === 'small' ? 'resume-text-size-small' : ''
            } resume-word-spacing resume-line-spacing resume-section-spacing`}
          style={{
            width: paperSize === 'a4' ? '210mm' : '216mm',
            minHeight: paperSize === 'a4' ? '297mm' : '279mm',
            padding: `${padding}px`,
            boxSizing: 'border-box',
            wordSpacing: `${wordSpacing}px`,
            lineHeight: lineSpacing,
            fontFamily: fontFamilies.find(f => f.id === fontFamily)?.name || 'Arial, sans-serif',
          }}
        >
          <SelectedTemplateComponent resumeData={resumeData} scale={scale} />
        </div>
      </Card>
    </div>
  );
};
