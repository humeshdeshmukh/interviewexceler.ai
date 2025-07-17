"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { Wand2, Download, Settings, Save, AlertCircle, RefreshCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAndDownloadResume } from "../../utils/docxTemplates";
import { useResume } from "../../context/ResumeContext";
import { ErrorBoundary } from "./examples/ErrorBoundary";
import { generateDynamicTemplate } from "./utils/templateGenerator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ResumeTemplate } from './ResumeTemplate';

interface TemplateSelectorProps {
  selectedTemplate: number;
  onSelect: (id: number) => void;
}

interface CustomizationOptions {
  targetRole: string;
  industry: string;
  experienceLevel: string;
  preferences: string;
  templateStyle: string;
  pageCount: number;
  resumeTool: string;
}

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Creative",
  "Engineering",
  "Sales",
  "Other"
];

const experienceLevels = [
  "Entry Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Executive"
];

const templateStyles = [
  "Modern",
  "Classic",
  "Creative",
  "Minimalist",
  "Professional",
  "Executive"
];

const resumeTools = [
  "Gemini AI",
  "ChatGPT",
  "Resume.io",
  "Novoresume",
  "Canva",
  "VisualCV",
  "Standard ATS"
];

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
  const { toast } = useToast();
  const [customOptions, setCustomOptions] = useState<CustomizationOptions>({
    targetRole: "",
    industry: "",
    experienceLevel: "",
    preferences: "",
    templateStyle: "Modern",
    pageCount: 1,
    resumeTool: "Gemini AI"
  });
  const { resumeData, updateTemplateId } = useResume();

  const validateForm = useCallback(() => {
    if (!customOptions.targetRole.trim()) {
      toast({
        title: "Missing Information",
        description: "Please specify your target role",
        variant: "destructive",
      });
      return false;
    }
    if (!customOptions.industry) {
      toast({
        title: "Missing Information",
        description: "Please select an industry",
        variant: "destructive",
      });
      return false;
    }
    if (!customOptions.experienceLevel) {
      toast({
        title: "Missing Information",
        description: "Please select your experience level",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }, [customOptions, toast]);

  const handleGenerateTemplate = async () => {
    if (!validateForm()) return;
    
    setError(null);
    setIsGenerating(true);
    try {
      const template = await generateDynamicTemplate(resumeData, customOptions);
      setGeneratedTemplate(template);
      updateTemplateId(Date.now());
      toast({
        title: "Success!",
        description: "Your resume template has been generated",
      });
      setPreviewMode('preview');
    } catch (error) {
      console.error("Failed to generate template:", error);
      setError("Failed to generate template. Please try again.");
      toast({
        title: "Error",
        description: "Failed to generate template. Please try again.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const handleRegenerateTemplate = async () => {
    if (!validateForm()) return;
    
    setError(null);
    setIsGenerating(true);
    try {
      // Add some randomness to ensure unique templates
      const modifiedOptions = {
        ...customOptions,
        preferences: customOptions.preferences + ` [Regeneration timestamp: ${Date.now()}]`
      };
      
      const template = await generateDynamicTemplate(resumeData, modifiedOptions);
      setGeneratedTemplate(template);
      updateTemplateId(Date.now());
      toast({
        title: "Success!",
        description: "Your resume template has been regenerated",
      });
    } catch (error) {
      console.error("Failed to regenerate template:", error);
      setError("Failed to regenerate template. Please try again.");
      toast({
        title: "Error",
        description: "Failed to regenerate template. Please try again.",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('resumeDraft', JSON.stringify({
        customOptions,
        templateId: Date.now()
      }));
      toast({
        title: "Draft Saved",
        description: "Your template preferences have been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

  const handleDownload = async () => {
    if (generatedTemplate) {
      try {
        await generateAndDownloadResume("dynamic", resumeData);
        toast({
          title: "Success!",
          description: "Your resume has been downloaded",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to download resume",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mode Toggle */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPreviewMode(prev => prev === 'edit' ? 'preview' : 'edit')}
          className="flex items-center gap-2"
        >
          {previewMode === 'edit' ? (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          ) : (
            <>
              <Settings className="w-4 h-4" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Customization Options */}
      <AnimatePresence mode="wait">
        {previewMode === 'edit' ? (
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-lg border border-white/10"
          >
            <div className="space-y-4">
              <TooltipProvider>
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="targetRole" className="flex items-center gap-2">
                        Target Role
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Specify the job title you're targeting</p>
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    id="targetRole"
                    placeholder="e.g., Senior Software Engineer"
                    value={customOptions.targetRole}
                    onChange={(e) => setCustomOptions({ ...customOptions, targetRole: e.target.value })}
                    className={cn(
                      "bg-white/10 transition-colors",
                      !customOptions.targetRole && "border-red-500/50"
                    )}
                  />
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={customOptions.industry}
                    onValueChange={(value) => setCustomOptions({ ...customOptions, industry: value })}
                  >
                    <SelectTrigger className={cn(
                      "bg-white/10",
                      !customOptions.industry && "border-red-500/50"
                    )}>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry.toLowerCase()}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={customOptions.experienceLevel}
                    onValueChange={(value) => setCustomOptions({ ...customOptions, experienceLevel: value })}
                  >
                    <SelectTrigger className={cn(
                      "bg-white/10",
                      !customOptions.experienceLevel && "border-red-500/50"
                    )}>
                      <SelectValue placeholder="Select Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level.toLowerCase()}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="templateStyle">Template Style</Label>
                  <Select
                    value={customOptions.templateStyle}
                    onValueChange={(value) => setCustomOptions({ ...customOptions, templateStyle: value })}
                  >
                    <SelectTrigger className="bg-white/10">
                      <SelectValue placeholder="Select Template Style" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateStyles.map((style) => (
                        <SelectItem key={style} value={style.toLowerCase()}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TooltipProvider>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Number of Pages</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min={1}
                    max={3}
                    value={customOptions.pageCount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 3) {
                        setCustomOptions({ ...customOptions, pageCount: value });
                      }
                    }}
                    className="bg-white/10 w-20"
                  />
                  <span className="text-sm text-gray-400">(1-3 pages)</span>
                </div>
              </div>

              <div>
                <Label htmlFor="preferences">Additional Preferences</Label>
                <Textarea
                  id="preferences"
                  placeholder="Any specific style preferences or requirements..."
                  value={customOptions.preferences}
                  onChange={(e) => setCustomOptions({ ...customOptions, preferences: e.target.value })}
                  className="bg-white/10 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="resumeTool">Resume Tool</Label>
                <Select
                  value={customOptions.resumeTool}
                  onValueChange={(value) => setCustomOptions({ ...customOptions, resumeTool: value })}
                >
                  <SelectTrigger className="bg-white/10">
                    <SelectValue placeholder="Select Resume Tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumeTools.map((tool) => (
                      <SelectItem key={tool} value={tool.toLowerCase()}>
                        {tool}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={handleGenerateTemplate}
          className="bg-[#fcba28] hover:bg-[#fcba28]/90 text-black flex items-center gap-2 px-6 py-3 text-lg transition-all"
          disabled={isGenerating}
        >
          <Wand2 className={cn("w-5 h-5", isGenerating && "animate-spin")} />
          {isGenerating ? "Generating..." : "Generate Template"}
        </Button>
        
        {generatedTemplate && (
          <Button
            onClick={handleRegenerateTemplate}
            className="bg-white/10 hover:bg-white/20 flex items-center gap-2 px-6 py-3 text-lg transition-all"
            disabled={isGenerating}
          >
            <RefreshCcw className={cn("w-5 h-5", isGenerating && "animate-spin")} />
            Regenerate
          </Button>
        )}
        
        <Button
          onClick={handleSaveDraft}
          className="bg-white/10 hover:bg-white/20 flex items-center gap-2 px-6 py-3 text-lg transition-all"
          disabled={isSaving}
        >
          <Save className="w-5 h-5" />
          {isSaving ? "Saving..." : "Save Draft"}
        </Button>
        
        {generatedTemplate && (
          <Button
            onClick={handleDownload}
            className="bg-white/10 hover:bg-white/20 flex items-center gap-2 px-6 py-3 text-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>
        )}
      </div>

      {/* Template Preview */}
      <AnimatePresence mode="wait">
        {previewMode === 'preview' && (
          <motion.div
            key="template-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-8 max-w-[1000px] mx-auto">
              <ErrorBoundary>
                <ResumeTemplate
                  resumeData={resumeData}
                  templateStyle={customOptions.templateStyle.toLowerCase()}
                  onEdit={(section, index) => {
                    toast({
                      title: "Edit Mode",
                      description: `Click on any section to edit ${section} at index ${index}`,
                    });
                  }}
                />
              </ErrorBoundary>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
