import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeData } from "../types";

interface CustomizationOptions {
  targetRole: string;
  industry: string;
  experienceLevel: string;
  preferences: string;
  templateStyle: string;
  pageCount: number;
  resumeTool: string;
}

const generateBaseStyles = () => {
  return `
    .resume-template {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }
    
    .resume-header {
      margin-bottom: 2rem;
    }
    
    .resume-name {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .resume-contact {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      font-size: 0.9rem;
    }
    
    .resume-section {
      margin-bottom: 2rem;
    }
    
    .resume-section-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #2a2a2a;
    }
    
    .resume-item {
      margin-bottom: 1.5rem;
    }
    
    .resume-item-title {
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    
    .resume-item-subtitle {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .resume-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .resume-skill-category {
      flex: 1;
      min-width: 200px;
    }
    
    .resume-skill-title {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    
    .resume-skill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .resume-skill-item {
      background: #f5f5f5;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.9rem;
    }
    
    @media print {
      .resume-template {
        padding: 0;
        max-width: none;
      }
      @page {
        margin: 1cm;
      }
      .resume-skill-item {
        background: none;
        border: 1px solid #ddd;
      }
    }
  `;
};

const generateStylePrompt = (options: CustomizationOptions) => {
  return `Create a modern and professional CSS style for a resume with these requirements:
- Style: ${options.templateStyle}
- Industry: ${options.industry}
- Experience Level: ${options.experienceLevel}
- Additional preferences: ${options.preferences}

The CSS should enhance these existing classes:
.resume-template {}
.resume-header {}
.resume-name {}
.resume-contact {}
.resume-section {}
.resume-section-title {}
.resume-item {}
.resume-item-title {}
.resume-item-subtitle {}
.resume-skills {}
.resume-skill-category {}
.resume-skill-title {}
.resume-skill-list {}
.resume-skill-item {}

Requirements:
1. Use modern design principles
2. Include responsive layout
3. Have proper spacing and typography
4. Use appropriate colors for ${options.industry} industry
5. Match the ${options.templateStyle} style
6. Be optimized for ${options.pageCount} page(s)
7. Include print-friendly styles
8. Use modern CSS features (Grid, Flexbox)

Return only the CSS code without any explanations.`;
};

const generateStructurePrompt = (resumeData: ResumeData, options: CustomizationOptions) => {
  const experienceHighlights = resumeData.experience
    .map(exp => exp.description)
    .join('\n');

  const skillHighlights = resumeData.skills
    .map(skill => `${skill.category}: ${skill.items.join(', ')}`)
    .join(', ');

  return `Create a professional resume HTML structure for ${options.targetRole} in the ${options.industry} industry using this data:

Personal Information:
- Name: ${resumeData.personalInfo.fullName}
- Email: ${resumeData.personalInfo.email}
- Phone: ${resumeData.personalInfo.phone}
${resumeData.personalInfo.location ? `- Location: ${resumeData.personalInfo.location}` : ''}
${resumeData.personalInfo.linkedin ? `- LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}

Experience Level: ${options.experienceLevel}
Key Skills: ${skillHighlights}

Notable Experience:
${experienceHighlights}

Requirements:
1. Use these CSS classes:
   - resume-template (main container)
   - resume-header (for personal info)
   - resume-name (for full name)
   - resume-contact (for contact details)
   - resume-section (for each major section)
   - resume-section-title (for section headings)
   - resume-item (for experience/education items)
   - resume-item-title (for item headings)
   - resume-item-subtitle (for dates/locations)
   - resume-skills (for skills section)
   - resume-skill-category (for skill categories)
   - resume-skill-title (for skill category names)
   - resume-skill-list (for list of skills)
   - resume-skill-item (for individual skills)

2. Additional Requirements:
   - Create a unique layout that stands out
   - Optimize content for ATS systems
   - Highlight achievements and metrics
   - Use semantic HTML5 elements
   - Include proper ARIA attributes
   - Structure content for ${options.pageCount} page(s)
   - Add data-* attributes for dynamic styling

Style: ${options.templateStyle}
Additional Preferences: ${options.preferences}

Return only the HTML structure without any CSS or explanations.`;
};

const enhanceContent = async (content: string, role: string, industry: string) => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const enhancementPrompt = `Enhance this resume content for a ${role} position in the ${industry} industry:

${content}

Make these improvements while preserving all HTML structure and CSS classes:
1. Add more impactful action verbs
2. Include relevant industry keywords
3. Quantify achievements where possible
4. Add relevant metrics and data points
5. Optimize for ATS systems
6. Make achievements more specific
7. Add industry-specific terminology
8. Highlight leadership and soft skills

Return only the enhanced HTML without any explanations.`;

  const result = await model.generateContent(enhancementPrompt);
  return result.response.text();
};

export const generateDynamicTemplate = async (resumeData: ResumeData, options: CustomizationOptions) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Generate base styles
    const baseStyles = generateBaseStyles();

    // Generate custom styles
    const stylePrompt = generateStylePrompt(options);
    const styleResult = await model.generateContent(stylePrompt);
    const customStyles = styleResult.response.text();

    // Generate HTML structure
    const structurePrompt = generateStructurePrompt(resumeData, options);
    const structureResult = await model.generateContent(structurePrompt);
    let html = structureResult.response.text();

    // Enhance content
    html = await enhanceContent(html, options.targetRole, options.industry);

    // Clean and combine the template
    const cleanedHtml = html
      .replace(/```html/g, '')
      .replace(/```/g, '')
      .trim();

    const cleanedStyles = customStyles
      .replace(/```css/g, '')
      .replace(/```/g, '')
      .trim();

    // Generate a unique template ID
    const templateId = `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Combine everything into a complete template
    return `
      <style>
        /* Base styles */
        ${baseStyles}
        
        /* Custom styles */
        ${cleanedStyles}
        
        /* Print optimization */
        @media print {
          body * {
            visibility: hidden;
          }
          .resume-template,
          .resume-template * {
            visibility: visible;
          }
          .resume-template {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      </style>
      <div class="resume-template" id="${templateId}" data-template-style="${options.templateStyle}" data-industry="${options.industry}">
        ${cleanedHtml}
      </div>
    `;
  } catch (error) {
    console.error('Error generating template:', error);
    throw new Error('Failed to generate resume template. Please try again.');
  }
};
