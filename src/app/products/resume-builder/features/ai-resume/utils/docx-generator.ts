import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, BorderStyle } from 'docx';
import { ResumeData } from '../context/ResumeContext';

export async function generateDocx(resumeData: ResumeData): Promise<Blob> {
  const sections: any[] = [];

  // Helper function to add section with page break if needed
  const addSection = (title: string, content: any[], forcePageBreak = false) => {
    if (content.length === 0) return;

    // Add page break before section if needed
    if (forcePageBreak && sections.length > 0) {
      sections.push(new Paragraph({ children: [new PageBreak()] }));
    }

    sections.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 200 },
        thematicBreak: true,
      })
    );

    sections.push(...content);
  };

  // Personal Info (Header)
  const { personalInfo } = resumeData;
  sections.push(
    new Paragraph({
      text: personalInfo.fullName || '',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: [
            personalInfo.email,
            personalInfo.phone,
            personalInfo.location,
          ].filter(Boolean).join(' | '),
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  if (personalInfo.linkedin || personalInfo.portfolio) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: [personalInfo.linkedin, personalInfo.portfolio].filter(Boolean).join(' | '),
            size: 20,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
  }

  // Professional Summary
  if (personalInfo.summary) {
    addSection('Professional Summary', [
      new Paragraph({
        text: personalInfo.summary,
        spacing: { after: 200 },
      }),
    ]);
  }

  // Work Experience
  if (resumeData.experiences && resumeData.experiences.length > 0) {
    const expContent = resumeData.experiences.flatMap((exp) => [
      new Paragraph({
        children: [
          new TextRun({ text: exp.position || '', bold: true, size: 24 }),
          new TextRun({ text: ` - ${exp.company || ''}`, size: 22 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`,
            size: 20,
            italics: true,
          }),
        ],
        spacing: { after: 100 },
      }),
      ...(exp.description || []).map(
        (desc) =>
          new Paragraph({
            text: `• ${desc}`,
            spacing: { after: 50 },
            indent: { left: 360 },
          })
      ),
      ...(exp.technologies && exp.technologies.length > 0
        ? [
          new Paragraph({
            children: [
              new TextRun({ text: 'Technologies: ', bold: true, size: 20 }),
              new TextRun({ text: exp.technologies.join(', '), size: 20 }),
            ],
            spacing: { after: 100 },
            indent: { left: 360 },
          }),
        ]
        : []),
    ]);

    // Check if experience section might need page break
    const forcePageBreak = resumeData.experiences.length > 2;
    addSection('Work Experience', expContent, forcePageBreak);
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    const eduContent = resumeData.education.flatMap((edu) => [
      new Paragraph({
        children: [
          new TextRun({ text: edu.degree || '', bold: true, size: 24 }),
          new TextRun({ text: ` in ${edu.field || ''}`, size: 22 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: edu.institution || '', size: 22 }),
          new TextRun({
            text: ` | ${edu.startDate || ''} - ${edu.endDate || ''}`,
            size: 20,
            italics: true,
          }),
        ],
        spacing: { after: 100 },
      }),
      ...(edu.gpa
        ? [
          new Paragraph({
            text: `GPA: ${edu.gpa}`,
            spacing: { after: 100 },
            indent: { left: 360 },
          }),
        ]
        : []),
    ]);

    addSection('Education', eduContent);
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    addSection('Skills', [
      new Paragraph({
        text: resumeData.skills.join(' • '),
        spacing: { after: 200 },
      }),
    ]);
  }

  // Projects
  if (resumeData.projects && resumeData.projects.length > 0) {
    const projContent = resumeData.projects.flatMap((proj) => [
      new Paragraph({
        children: [
          new TextRun({ text: proj.name || '', bold: true, size: 24 }),
        ],
        spacing: { before: 200, after: 100 },
      }),
      new Paragraph({
        text: proj.description || '',
        spacing: { after: 100 },
      }),
      ...(proj.technologies && proj.technologies.length > 0
        ? [
          new Paragraph({
            children: [
              new TextRun({ text: 'Technologies: ', bold: true, size: 20 }),
              new TextRun({ text: proj.technologies.join(', '), size: 20 }),
            ],
            spacing: { after: 100 },
          }),
        ]
        : []),
      ...(proj.link
        ? [
          new Paragraph({
            text: `Link: ${proj.link}`,
            spacing: { after: 100 },
          }),
        ]
        : []),
    ]);

    const forcePageBreak = resumeData.projects.length > 3;
    addSection('Projects', projContent, forcePageBreak);
  }

  // Certifications
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    const certContent = resumeData.certifications.flatMap((cert) => [
      new Paragraph({
        children: [
          new TextRun({ text: cert.name || '', bold: true, size: 22 }),
          new TextRun({ text: ` - ${cert.issuer || ''}`, size: 20 }),
        ],
        spacing: { before: 100, after: 50 },
      }),
      ...(cert.date
        ? [
          new Paragraph({
            text: `Earned: ${cert.date}`,
            spacing: { after: 100 },
            indent: { left: 360 },
          }),
        ]
        : []),
    ]);

    addSection('Certifications', certContent);
  }

  // Languages
  if (resumeData.languages && resumeData.languages.length > 0) {
    const langContent = resumeData.languages.map(
      (lang) =>
        new Paragraph({
          text: `• ${lang.name || ''} - ${lang.proficiency || ''}`,
          spacing: { after: 50 },
        })
    );

    addSection('Languages', langContent);
  }

  // Achievements
  if (resumeData.achievements && resumeData.achievements.length > 0) {
    const achContent = resumeData.achievements.flatMap((ach) => [
      new Paragraph({
        children: [
          new TextRun({ text: ach.title || '', bold: true, size: 22 }),
        ],
        spacing: { before: 100, after: 50 },
      }),
      new Paragraph({
        text: ach.description || '',
        spacing: { after: 100 },
        indent: { left: 360 },
      }),
    ]);

    addSection('Achievements', achContent);
  }

  // Volunteer Work
  if (resumeData.volunteer && resumeData.volunteer.length > 0) {
    const volContent = resumeData.volunteer.flatMap((vol) => [
      new Paragraph({
        children: [
          new TextRun({ text: vol.role || '', bold: true, size: 22 }),
          new TextRun({ text: ` at ${vol.organization || ''}`, size: 20 }),
        ],
        spacing: { before: 100, after: 50 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${vol.startDate || ''} - ${vol.endDate || ''}`,
            size: 20,
            italics: true,
          }),
        ],
        spacing: { after: 50 },
      }),
      new Paragraph({
        text: vol.description || '',
        spacing: { after: 100 },
        indent: { left: 360 },
      }),
    ]);

    addSection('Volunteer Work', volContent);
  }

  // Declaration
  if (resumeData.declaration) {
    addSection('Declaration', [
      new Paragraph({
        text: resumeData.declaration,
        spacing: { after: 200 },
      }),
    ], true); // Force page break for declaration
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: sections,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
