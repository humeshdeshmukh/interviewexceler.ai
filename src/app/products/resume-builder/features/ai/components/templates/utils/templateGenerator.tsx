import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from './dateUtils';
import { ResumeData } from '../types';

interface CustomizationOptions {
  targetRole?: string;
  industry?: string;
  experienceLevel?: string;
  preferences?: string;
  templateStyle?: string;
  pageCount?: number;
  resumeTool?: string;
}

interface TemplateStyles {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  spacing: {
    sectionGap: string;
    contentDensity: string;
    fontSize: string;
  };
  layout: string;
}

const generateSection = (title: string, content: JSX.Element, styles: TemplateStyles) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="mb-6"
      style={{ marginBottom: styles.spacing.sectionGap }}
    >
      <h2 style={{ 
        color: styles.colors.primary,
        fontSize: styles.spacing.fontSize,
        marginBottom: '0.5rem',
        fontWeight: 'bold'
      }}>
        {title}
      </h2>
      <div style={{ color: styles.colors.text }}>{content}</div>
    </motion.div>
  );
};

const generatePageLayout = (content: JSX.Element[], styles: TemplateStyles, pageNumber: number) => {
  const layoutStyles = {
    modern: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '2rem',
      padding: '2rem',
    },
    classic: {
      display: 'flex',
      flexDirection: 'column' as const,
      padding: '2rem',
    },
    creative: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      padding: '2rem',
    },
    minimalist: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      padding: '1.5rem',
    },
    professional: {
      display: 'grid',
      gridTemplateColumns: '2.5fr 1fr',
      gap: '2rem',
      padding: '2rem',
    },
    executive: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
      padding: '2.5rem',
    }
  };

  const pageStyle = {
    backgroundColor: styles.colors.background,
    minHeight: '297mm',
    width: '210mm',
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative' as const,
  };

  const layoutType = styles.layout.split('-')[0] as keyof typeof layoutStyles;
  const layoutStyle = layoutStyles[layoutType] || layoutStyles.modern;

  return (
    <div style={pageStyle} className="mb-8">
      <div style={layoutStyle}>
        {content}
      </div>
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        fontSize: '0.75rem',
        color: styles.colors.secondary,
      }}>
        Page {pageNumber}
      </div>
    </div>
  );
};

const distributeContent = (sections: JSX.Element[], pageCount: number) => {
  const pages: JSX.Element[][] = Array(pageCount).fill([]).map(() => []);
  
  if (pageCount === 1) {
    return [sections];
  }

  // Distribute sections based on importance and page count
  if (pageCount === 2) {
    const firstPageSections = sections.slice(0, Math.ceil(sections.length * 0.6));
    const secondPageSections = sections.slice(Math.ceil(sections.length * 0.6));
    return [firstPageSections, secondPageSections];
  }

  if (pageCount === 3) {
    const firstPageSections = sections.slice(0, Math.ceil(sections.length * 0.4));
    const secondPageSections = sections.slice(
      Math.ceil(sections.length * 0.4),
      Math.ceil(sections.length * 0.7)
    );
    const thirdPageSections = sections.slice(Math.ceil(sections.length * 0.7));
    return [firstPageSections, secondPageSections, thirdPageSections];
  }

  return pages;
};

export const generateDynamicTemplate = async (data: ResumeData, options?: CustomizationOptions) => {
  const styles = generateStyles(data, options);

  const DynamicTemplate = () => {
    const pageCount = options?.pageCount || 1;

    // Generate all sections
    const sections: JSX.Element[] = [];

    // Personal Information Section
    if (data.personalInfo) {
      sections.push(
        generateSection('Personal Information', (
          <div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              color: styles.colors.primary,
              marginBottom: '0.5rem'
            }}>
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            {data.personalInfo.email && (
              <p style={{ color: styles.colors.secondary }}>{data.personalInfo.email}</p>
            )}
            {data.personalInfo.phone && (
              <p style={{ color: styles.colors.secondary }}>{data.personalInfo.phone}</p>
            )}
            {data.personalInfo.location && (
              <p style={{ color: styles.colors.secondary }}>{data.personalInfo.location}</p>
            )}
          </div>
        ), styles)
      );

      // Professional Summary
      if (data.personalInfo.summary) {
        sections.push(
          generateSection('Professional Summary', (
            <p style={{ lineHeight: '1.6' }}>{data.personalInfo.summary}</p>
          ), styles)
        );
      }
    }

    // Experience Section
    if (data.experience && data.experience.length > 0) {
      sections.push(
        generateSection('Experience', (
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 style={{ color: styles.colors.secondary, fontWeight: 'bold' }}>
                  {exp.title} {exp.company && `at ${exp.company}`}
                </h3>
                <p style={{ color: styles.colors.text, fontSize: '0.9em' }}>
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </p>
                {exp.description && (
                  <p style={{ color: styles.colors.text, marginTop: '0.5rem' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        ), styles)
      );
    }

    // Education Section
    if (data.education && data.education.length > 0) {
      sections.push(
        generateSection('Education', (
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 style={{ color: styles.colors.secondary, fontWeight: 'bold' }}>
                  {edu.degree} {edu.school && `- ${edu.school}`}
                </h3>
                <p style={{ color: styles.colors.text, fontSize: '0.9em' }}>
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </p>
                {edu.description && (
                  <p style={{ color: styles.colors.text }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        ), styles)
      );
    }

    // Skills Section
    if (data.skills && data.skills.length > 0) {
      sections.push(
        generateSection('Skills', (
          <div className="grid grid-cols-2 gap-4">
            {data.skills.map((skill, index) => (
              <div key={index} style={{ color: styles.colors.text }}>
                {skill.name} {skill.level && `- ${skill.level}`}
              </div>
            ))}
          </div>
        ), styles)
      );
    }

    // Projects Section
    if (data.projects && data.projects.length > 0) {
      sections.push(
        generateSection('Projects', (
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 style={{ color: styles.colors.secondary, fontWeight: 'bold' }}>
                  {project.name}
                </h3>
                {project.description && (
                  <p style={{ color: styles.colors.text }}>{project.description}</p>
                )}
              </div>
            ))}
          </div>
        ), styles)
      );
    }

    // Certifications Section
    if (data.certifications && data.certifications.length > 0) {
      sections.push(
        generateSection('Certifications', (
          <div className="space-y-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-4">
                <h3 style={{ color: styles.colors.secondary, fontWeight: 'bold' }}>
                  {cert.name}
                </h3>
                {cert.issuer && (
                  <p style={{ color: styles.colors.text }}>{cert.issuer}</p>
                )}
                {cert.date && (
                  <p style={{ color: styles.colors.text, fontSize: '0.9em' }}>
                    {formatDate(cert.date)}
                  </p>
                )}
              </div>
            ))}
          </div>
        ), styles)
      );
    }

    // Languages Section
    if (data.languages && data.languages.length > 0) {
      sections.push(
        generateSection('Languages', (
          <div className="grid grid-cols-2 gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} style={{ color: styles.colors.text }}>
                {lang.name} {lang.level && `- ${lang.level}`}
              </div>
            ))}
          </div>
        ), styles)
      );
    }

    // Distribute content across pages
    const pages = distributeContent(sections, pageCount);

    return (
      <div className="space-y-8">
        {pages.map((pageContent, index) => (
          <div key={index}>
            {generatePageLayout(pageContent, styles, index + 1)}
          </div>
        ))}
      </div>
    );
  };

  return <DynamicTemplate />;
};

const generateStyles = (data: ResumeData, options?: CustomizationOptions): TemplateStyles => {
  let colors = {
    primary: '#2d3748',
    secondary: '#4a5568',
    accent: '#fcba28',
    text: '#2d3748',
    background: '#ffffff',
  };

  // Apply template style colors
  if (options?.templateStyle) {
    switch (options.templateStyle.toLowerCase()) {
      case 'modern':
        colors = {
          primary: '#2563eb',
          secondary: '#3b82f6',
          accent: '#fcba28',
          text: '#1f2937',
          background: '#ffffff',
        };
        break;
      case 'classic':
        colors = {
          primary: '#1f2937',
          secondary: '#4b5563',
          accent: '#9ca3af',
          text: '#111827',
          background: '#ffffff',
        };
        break;
      case 'creative':
        colors = {
          primary: '#db2777',
          secondary: '#ec4899',
          accent: '#f472b6',
          text: '#831843',
          background: '#ffffff',
        };
        break;
      case 'minimalist':
        colors = {
          primary: '#18181b',
          secondary: '#27272a',
          accent: '#71717a',
          text: '#09090b',
          background: '#ffffff',
        };
        break;
      case 'professional':
        colors = {
          primary: '#0f766e',
          secondary: '#0d9488',
          accent: '#14b8a6',
          text: '#134e4a',
          background: '#ffffff',
        };
        break;
      case 'executive':
        colors = {
          primary: '#7c2d12',
          secondary: '#9a3412',
          accent: '#c2410c',
          text: '#431407',
          background: '#ffffff',
        };
        break;
    }
  }

  // Adjust colors based on resume tool
  if (options?.resumeTool) {
    const toolAccents = {
      'gemini ai': '#2563eb',
      'chatgpt': '#10a37f',
      'resume.io': '#6366f1',
      'novoresume': '#0ea5e9',
      'canva': '#ec4899',
      'visualcv': '#8b5cf6',
      'standard ats': '#1f2937',
    };

    const tool = options.resumeTool.toLowerCase() as keyof typeof toolAccents;
    if (toolAccents[tool]) {
      colors.accent = toolAccents[tool];
    }
  }

  // Adjust spacing based on page count and content
  const spacing = {
    sectionGap: options?.pageCount === 1 ? '1.5rem' : '2rem',
    contentDensity: options?.pageCount === 1 ? 'compact' : 'comfortable',
    fontSize: options?.pageCount === 1 ? '0.875rem' : '1rem',
  };

  // Determine layout based on template style and page count
  let layout = `${options?.templateStyle?.toLowerCase() || 'modern'}-${options?.pageCount === 1 ? 'single' : options?.pageCount === 2 ? 'double' : 'triple'}`;

  return { colors, spacing, layout };
};
