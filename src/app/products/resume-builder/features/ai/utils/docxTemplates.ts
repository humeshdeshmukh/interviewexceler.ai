import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  convertInchesToTwip,
  PageOrientation,
  IDocumentOptions,
} from "docx";
import { saveAs } from "file-saver";
import { ResumeData } from "../context/ResumeContext";

// Common styles
const styles = {
  page: {
    margin: {
      top: convertInchesToTwip(1),
      right: convertInchesToTwip(1),
      bottom: convertInchesToTwip(1),
      left: convertInchesToTwip(1),
    },
  },
  heading1: {
    size: 32,
    bold: true,
    color: "2E3440",
  },
  heading2: {
    size: 24,
    bold: true,
    color: "3B4252",
  },
  heading3: {
    size: 20,
    bold: true,
    color: "434C5E",
  },
  normal: {
    size: 16,
    color: "4C566A",
  },
};

// Base template generator
const createBaseDocument = (options: Partial<IDocumentOptions> = {}) => {
  return new Document({
    sections: [{
      properties: {
        page: {
          ...styles.page,
          orientation: PageOrientation.PORTRAIT,
        },
      },
      children: [],
    }],
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 24,
            color: "333333",
          },
          paragraph: {
            spacing: {
              line: 360,
              before: 240,
              after: 240,
            },
          },
        },
      },
    },
    ...options,
  });
};

// Modern template
export const generateModernTemplate = (data: ResumeData) => {
  const doc = createBaseDocument();
  const children: (Paragraph | Table)[] = [];

  // Header with contact info
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 240,
      },
      children: [
        new TextRun({
          text: data.personalInfo.fullName,
          ...styles.heading1,
          break: 2,
        }),
        new TextRun({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
          ...styles.normal,
          break: 1,
        }),
      ],
    })
  );

  // Summary
  if (data.personalInfo.summary) {
    children.push(
      new Paragraph({
        spacing: {
          before: 240,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Professional Summary",
            ...styles.heading2,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.personalInfo.summary,
            ...styles.normal,
          }),
        ],
      })
    );
  }

  // Experience section
  if (data.experiences.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Experience",
            ...styles.heading2,
          }),
        ],
      })
    );

    data.experiences.forEach((exp) => {
      children.push(
        new Paragraph({
          spacing: {
            before: 240,
          },
          children: [
            new TextRun({
              text: exp.company,
              ...styles.heading3,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.position} | ${exp.startDate} - ${exp.endDate}`,
              ...styles.normal,
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: {
            after: 240,
          },
          children: [
            new TextRun({
              text: exp.description,
              ...styles.normal,
            }),
          ],
        })
      );
    });
  }

  // Education section
  if (data.education.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Education",
            ...styles.heading2,
          }),
        ],
      })
    );

    data.education.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: {
            before: 240,
          },
          children: [
            new TextRun({
              text: edu.institution,
              ...styles.heading3,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.field} | ${edu.startDate} - ${edu.endDate}`,
              ...styles.normal,
              italics: true,
            }),
          ],
        })
      );
    });
  }

  // Skills section
  if (data.skills.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Skills",
            ...styles.heading2,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.skills.join(" • "),
            ...styles.normal,
          }),
        ],
      })
    );
  }

  doc.addSection({
    children: children,
  });

  return doc;
};

// Gemini template
export const generateGeminiTemplate = (data: ResumeData) => {
  const doc = createBaseDocument();
  const children: (Paragraph | Table)[] = [];

  // Header with contact info
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 240,
      },
      children: [
        new TextRun({
          text: data.personalInfo.fullName,
          ...styles.heading1,
          break: 2,
        }),
        new TextRun({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
          ...styles.normal,
          break: 1,
        }),
      ],
    })
  );

  // Summary
  if (data.personalInfo.summary) {
    children.push(
      new Paragraph({
        spacing: {
          before: 240,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Professional Summary",
            ...styles.heading2,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.personalInfo.summary,
            ...styles.normal,
          }),
        ],
      })
    );
  }

  // Experience section
  if (data.experiences.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Experience",
            ...styles.heading2,
          }),
        ],
      })
    );

    data.experiences.forEach((exp) => {
      children.push(
        new Paragraph({
          spacing: {
            before: 240,
          },
          children: [
            new TextRun({
              text: exp.company,
              ...styles.heading3,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.position} | ${exp.startDate} - ${exp.endDate}`,
              ...styles.normal,
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          spacing: {
            after: 240,
          },
          children: [
            new TextRun({
              text: exp.description,
              ...styles.normal,
            }),
          ],
        })
      );
    });
  }

  // Education section
  if (data.education.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Education",
            ...styles.heading2,
          }),
        ],
      })
    );

    data.education.forEach((edu) => {
      children.push(
        new Paragraph({
          spacing: {
            before: 240,
          },
          children: [
            new TextRun({
              text: edu.institution,
              ...styles.heading3,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree} in ${edu.field} | ${edu.startDate} - ${edu.endDate}`,
              ...styles.normal,
              italics: true,
            }),
          ],
        })
      );
    });
  }

  // Skills section
  if (data.skills.length > 0) {
    children.push(
      new Paragraph({
        spacing: {
          before: 360,
          after: 240,
        },
        children: [
          new TextRun({
            text: "Skills",
            ...styles.heading2,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: data.skills.join(" • "),
            ...styles.normal,
          }),
        ],
      })
    );
  }

  doc.addSection({
    children: children,
  });

  return doc;
};

// Function to generate and download the document
export const generateAndDownloadResume = async (
  templateType: string,
  data: ResumeData
) => {
  try {
    let template;
    switch (templateType) {
      case "modern":
        template = generateModernTemplate(data);
        break;
      case "gemini":
        template = generateGeminiTemplate(data);
        break;
      default:
        template = generateModernTemplate(data);
    }

    const content = [];

    // Header
    content.push(`${data.personalInfo.name}`);
    content.push(`${data.personalInfo.title}`);
    content.push(`${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`);
    content.push('\n');

    // Summary
    if (data.personalInfo.summary) {
      content.push('Professional Summary');
      content.push(data.personalInfo.summary);
      content.push('\n');
    }

    // Experience
    if (data.experiences.length > 0) {
      content.push('Professional Experience');
      data.experiences.forEach(exp => {
        content.push(`${exp.title}`);
        content.push(`${exp.company}`);
        content.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`);
        content.push(exp.description);
        content.push('\n');
      });
    }

    // Education
    if (data.education.length > 0) {
      content.push('Education');
      data.education.forEach(edu => {
        content.push(`${edu.degree}`);
        content.push(`${edu.school}`);
        content.push(`${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`);
        if (edu.description) content.push(edu.description);
        content.push('\n');
      });
    }

    // Skills
    if (data.skills.length > 0) {
      content.push('Skills');
      content.push(data.skills.join(', '));
      content.push('\n');
    }

    // Projects
    if (data.projects.length > 0) {
      content.push('Projects');
      data.projects.forEach(project => {
        content.push(`${project.name} - ${project.role}`);
        content.push(project.description);
        content.push(`Technologies: ${project.technologies.join(', ')}`);
        if (project.githubUrl) content.push(`GitHub: ${project.githubUrl}`);
        if (project.liveUrl) content.push(`Live Demo: ${project.liveUrl}`);
        content.push('\n');
      });
    }

    // Certifications
    if (data.certifications.length > 0) {
      content.push('Certifications');
      data.certifications.forEach(cert => {
        content.push(`${cert.name} - ${cert.issuer}`);
        content.push(`Date: ${cert.date}`);
        content.push('\n');
      });
    }

    // Languages
    if (data.languages.length > 0) {
      content.push('Languages');
      content.push(data.languages.map(lang => lang.name).join(', '));
      content.push('\n');
    }

    // Volunteer Work
    if (data.volunteerWork.length > 0) {
      content.push('Volunteer Experience');
      data.volunteerWork.forEach(vol => {
        content.push(`${vol.role} at ${vol.organization}`);
        content.push(`${vol.startDate} - ${vol.current ? 'Present' : vol.endDate}`);
        content.push(vol.description);
        if (vol.impact) content.push(`Impact: ${vol.impact}`);
        content.push('\n');
      });
    }

    // Achievements
    if (data.achievements.length > 0) {
      content.push('Achievements');
      data.achievements.forEach(achievement => {
        content.push(`• ${achievement.name}`);
      });
      content.push('\n');
    }

    // Declaration
    if (data.declaration) {
      content.push('Declaration');
      content.push(data.declaration);
    }

    // Create a Blob with the content
    const blob = new Blob([content.join('\n')], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.docx`);
  
    // Trigger download
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error("Error generating resume:", error);
    return false;
  }
};

// Function to generate preview HTML
export const generatePreviewHtml = (template: string, data: ResumeData): string => {
  const commonStyles = `
    .preview-container {
      font-family: 'Calibri', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      color: #2E3440;
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .section {
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #3B4252;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #E5E9F0;
    }
    .item {
      margin-bottom: 1.5rem;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    .item-title {
      font-weight: bold;
      color: #434C5E;
    }
    .item-subtitle {
      font-style: italic;
      color: #4C566A;
    }
    .dates {
      color: #4C566A;
      font-size: 0.9rem;
      white-space: nowrap;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .tag {
      background: #E5E9F0;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.9rem;
    }
    .links {
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
    .links a {
      color: #5E81AC;
      text-decoration: none;
      margin-right: 1rem;
    }
    .links a:hover {
      text-decoration: underline;
    }
  `;

  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    return `${formatDate(startDate)} - ${current ? 'Present' : formatDate(endDate)}`;
  };

  return `
    <style>${commonStyles}</style>
    <div class="preview-container">
      <div class="header">
        <h1>${data.personalInfo.name}</h1>
        <p>${data.personalInfo.title}</p>
        <p>${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}</p>
      </div>

      ${data.personalInfo.summary ? `
        <div class="section">
          <h2 class="section-title">Professional Summary</h2>
          <p>${data.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${data.experiences.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Experience</h2>
          ${data.experiences.map(exp => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${exp.title}</div>
                  <div class="item-subtitle">${exp.company}</div>
                </div>
                <div class="dates">${formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
              </div>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.education.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${data.education.map(edu => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.degree}</div>
                  <div class="item-subtitle">${edu.school}</div>
                </div>
                <div class="dates">${formatDateRange(edu.startDate, edu.endDate, edu.current)}</div>
              </div>
              ${edu.description ? `<p>${edu.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.projects.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${data.projects.map(project => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${project.name}</div>
                  <div class="item-subtitle">${project.role}</div>
                </div>
                <div class="dates">${formatDateRange(project.startDate, project.endDate, project.current)}</div>
              </div>
              <p>${project.description}</p>
              ${project.technologies.length > 0 ? `
                <div class="tags">
                  ${project.technologies.map(tech => `
                    <span class="tag">${tech}</span>
                  `).join('')}
                </div>
              ` : ''}
              ${project.githubUrl || project.liveUrl ? `
                <div class="links">
                  ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank">GitHub</a>` : ''}
                  ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank">Live Demo</a>` : ''}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.skills.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="tags">
            ${data.skills.map(skill => `
              <span class="tag">${skill}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${data.certifications.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Certifications</h2>
          ${data.certifications.map(cert => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${cert.name}</div>
                  <div class="item-subtitle">${cert.issuer}</div>
                </div>
                <div class="dates">${formatDate(cert.date)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.volunteerWork.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Volunteer Experience</h2>
          ${data.volunteerWork.map(vol => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${vol.role}</div>
                  <div class="item-subtitle">${vol.organization}</div>
                </div>
                <div class="dates">${formatDateRange(vol.startDate, vol.endDate, vol.current)}</div>
              </div>
              <p>${vol.description}</p>
              ${vol.impact ? `<p><strong>Impact:</strong> ${vol.impact}</p>` : ''}
              ${vol.causes.length > 0 ? `
                <div class="tags">
                  ${vol.causes.map(cause => `
                    <span class="tag">${cause}</span>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.languages.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Languages</h2>
          <div class="tags">
            ${data.languages.map(lang => `
              <span class="tag">${lang.name}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${data.achievements.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Achievements</h2>
          ${data.achievements.map(achievement => `
            <div class="item">
              <div class="item-title">${achievement.name}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${data.declaration ? `
        <div class="section">
          <h2 class="section-title">Declaration</h2>
          <p>${data.declaration}</p>
        </div>
      ` : ''}
    </div>
  `;
};
