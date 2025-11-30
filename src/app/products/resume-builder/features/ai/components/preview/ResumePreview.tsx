"use client";

import { useResume } from "../../context/ResumeContext";
import { generatePreviewHtml } from "../../utils/docxTemplates";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Download,
  Share2,
  FileText,
  ZoomIn,
  ZoomOut,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Target,
  Lightbulb,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  exportToPdf,
  exportToImage,
  exportToDocx,
  shareResume,
  ExportFormat,
  exportFormats,
} from "../../utils/exportUtils";
import { analyzeResumeWithGemini, enhanceWithGemini, EnhancementOptions } from "../../services/aiService";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ResumePreview() {
  const { resumeData } = useResume();
  const [scale, setScale] = useState(1);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [previewHtml, setPreviewHtml] = useState("");
  const [enhancementOptions, setEnhancementOptions] = useState<Partial<EnhancementOptions>>({
    style: 'professional',
    tone: 'formal',
    focus: [],
    keywords: []
  });
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Update preview HTML when resume data changes
  useEffect(() => {
    const html = generatePreviewHtml("modern", resumeData);
    setPreviewHtml(html);
  }, [resumeData]);

  // Close export options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showExportOptions && !event.target?.closest(".export-options")) {
        setShowExportOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExportOptions]);

  // Cleanup function for analysis modal
  useEffect(() => {
    return () => {
      setShowAnalysis(false);
      setAnalysisResult(null);
    };
  }, []);

  const handleExport = async (format: ExportFormat) => {
    if (!previewRef.current) return;
    setShowExportOptions(false);

    try {
      switch (format) {
        case "pdf":
          await exportToPdf(previewRef.current);
          break;
        case "image":
          await exportToImage(previewRef.current);
          break;
        case "docx":
          await exportToDocx(resumeData);
          break;
        default:
          console.error("Unsupported format");
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleShare = async () => {
    if (!previewRef.current) return;
    try {
      await shareResume(previewRef.current);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResumeWithGemini(resumeData);
      setAnalysisResult(result);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEnhance = async (section: string) => {
    if (!section || isEnhancing) return;
    
    setIsEnhancing(true);
    try {
      const result = await enhanceWithGemini(
        section,
        resumeData[section],
        enhancementOptions
      );
      // TODO: Update the resume data with enhanced content
      console.log('Enhancement result:', result);
    } catch (error) {
      console.error("Enhancement failed:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCloseAnalysis = () => {
    setShowAnalysis(false);
    // Add a small delay before clearing the result to prevent DOM issues
    setTimeout(() => {
      setAnalysisResult(null);
    }, 300);
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="relative h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={zoomIn}
            disabled={scale >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="export-options"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <AnimatePresence>
              {showExportOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10 min-w-[150px] export-options"
                >
                  {exportFormats.map((format) => (
                    <Button
                      key={format}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleExport(format)}
                    >
                      Export as {format.toUpperCase()}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "AI Analysis"}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-8">
        <div
          ref={previewRef}
          id="resume-preview"
          className="mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "21cm",
            minHeight: "29.7cm",
          }}
        >
          <div
            className="h-full"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>

      {/* Analysis Results */}
      <AnimatePresence mode="wait">
        {showAnalysis && analysisResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-sm overflow-auto z-50"
          >
            <div className="max-w-4xl mx-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-[#fcba28]" />
                  AI Resume Analysis
                </h2>
                <Button
                  variant="ghost"
                  onClick={handleCloseAnalysis}
                >
                  Close
                </Button>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sections">Sections</TabsTrigger>
                  <TabsTrigger value="enhance">AI Enhancement</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-white/50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <Gauge className="h-4 w-4 mr-2 text-[#fcba28]" />
                          Overall Score
                        </h3>
                        <span className="text-2xl font-bold text-[#fcba28]">
                          {analysisResult.overallScore}%
                        </span>
                      </div>
                      <Progress value={analysisResult.overallScore} className="h-2" />
                    </div>

                    <div className="bg-white/50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium flex items-center mb-2">
                        <Target className="h-4 w-4 mr-2 text-[#fcba28]" />
                        Market Alignment
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Industry Match</span>
                          <span className="font-medium">{analysisResult.marketAlignment.industry}</span>
                        </div>
                        <Progress value={analysisResult.marketAlignment.score} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium flex items-center mb-4">
                      <AlertCircle className="h-4 w-4 mr-2 text-[#fcba28]" />
                      Key Improvement Areas
                    </h3>
                    <div className="space-y-2">
                      {analysisResult.marketAlignment.gaps.map((gap: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-1 text-[#fcba28]" />
                          <span>{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium flex items-center mb-4">
                      <Lightbulb className="h-4 w-4 mr-2 text-[#fcba28]" />
                      Keywords Analysis
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sections" className="space-y-4">
                  {Object.entries(analysisResult.sectionScores).map(([section, score]: [string, any]) => (
                    <div key={section} className="bg-white/50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium capitalize">{section}</h3>
                        <span className="font-bold text-[#fcba28]">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2 mb-4" />
                      <div className="space-y-2">
                        {analysisResult.suggestions
                          .find((s: any) => s.section === section)
                          ?.suggestions.map((suggestion: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="h-4 w-4 mt-1 text-[#fcba28]" />
                              <span>{suggestion}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="enhance" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Section to Enhance</label>
                        <Select
                          value={selectedSection}
                          onValueChange={setSelectedSection}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="summary">Professional Summary</SelectItem>
                            <SelectItem value="experience">Experience</SelectItem>
                            <SelectItem value="skills">Skills</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Enhancement Style</label>
                        <Select
                          value={enhancementOptions.style}
                          onValueChange={(value: any) => 
                            setEnhancementOptions(prev => ({ ...prev, style: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="executive">Executive</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Tone</label>
                        <Select
                          value={enhancementOptions.tone}
                          onValueChange={(value: any) =>
                            setEnhancementOptions(prev => ({ ...prev, tone: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="confident">Confident</SelectItem>
                            <SelectItem value="humble">Humble</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={() => selectedSection && handleEnhance(selectedSection)}
                        disabled={!selectedSection || isEnhancing}
                        className="w-full"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                      </Button>
                    </div>

                    <div className="bg-white/50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium mb-4">Enhancement Preview</h3>
                      <p className="text-sm text-gray-600">
                        Select a section and enhancement options to preview AI-enhanced content.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
