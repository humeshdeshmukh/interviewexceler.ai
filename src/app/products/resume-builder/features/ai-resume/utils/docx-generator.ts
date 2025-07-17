import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, IStylesOptions, convertInchesToTwip, Tab } from 'docx';

export const generateDocx = async (resumeData: any, template: string = 'modern') => {
  // Define consistent styles
  const styles: IStylesOptions = {
    default: {
      heading1: {
        run: {
          size: 28,
          bold: true,
          color: "#2b2b2b",
        },
        paragraph: {
          spacing: {
            before: 240,
            after: 120,
          },
        },
      },
      document: {
        run: {
          size: 24,
          font: "Arial",
        },
        paragraph: {
          spacing: {
            line: 360,
          },
        },
      },
    },
  };

  const doc = new Document({
    styles,
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
          },
        },
      },
      children: [
        // Header with personal info
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 200,
          },
          children: [
            new TextRun({
              text: resumeData.personalInfo.fullName,
              bold: true,
              size: 36,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
          children: [
            new TextRun({
              text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`,
              size: 24,
            }),
            ...(resumeData.personalInfo.location ? [
              new TextRun({ text: " | ", size: 24 }),
              new TextRun({ text: resumeData.personalInfo.location, size: 24 }),
            ] : []),
            ...(resumeData.personalInfo.linkedin ? [
              new TextRun({ text: " | ", size: 24 }),
              new TextRun({ text: resumeData.personalInfo.linkedin, size: 24, color: "0000FF" }),
            ] : []),
          ],
        }),

        // Summary
        ...(resumeData.personalInfo.summary ? [
          new Paragraph({
            text: "Professional Summary",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          new Paragraph({
            text: resumeData.personalInfo.summary,
            spacing: {
              after: 200,
            },
          }),
        ] : []),

        // Experience
        ...(resumeData.experiences?.length > 0 ? [
          new Paragraph({
            text: "Work Experience",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          ...resumeData.experiences.flatMap((exp: any) => [
            new Paragraph({
              spacing: {
                before: 180,
                after: 80,
              },
              children: [
                new TextRun({
                  text: exp.position,
                  bold: true,
                  size: 26,
                }),
                new TextRun({
                  text: ` at ${exp.company}`,
                  size: 26,
                }),
                new Tab(),
                new TextRun({
                  text: `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`,
                  italics: true,
                  size: 24,
                }),
              ],
            }),
            ...exp.description.map((desc: string) => 
              new Paragraph({
                text: desc,
                bullet: { level: 0 },
                spacing: {
                  before: 60,
                  after: 60,
                },
              })
            ),
            ...(exp.technologies ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technologies: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: exp.technologies.join(", "),
                  }),
                ],
                spacing: {
                  before: 60,
                  after: 120,
                },
              }),
            ] : []),
          ]),
        ] : []),

        // Education
        ...(resumeData.education?.length > 0 ? [
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          ...resumeData.education.flatMap((edu: any) => [
            new Paragraph({
              spacing: {
                before: 180,
                after: 80,
              },
              children: [
                new TextRun({
                  text: `${edu.degree} in ${edu.field}`,
                  bold: true,
                  size: 26,
                }),
                new Tab(),
                new TextRun({
                  text: `${edu.startDate} - ${edu.endDate}`,
                  italics: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.institution,
                  size: 24,
                }),
                ...(edu.gpa ? [
                  new TextRun({ text: " | GPA: ", size: 24 }),
                  new TextRun({ text: edu.gpa, size: 24 }),
                ] : []),
              ],
              spacing: {
                after: 120,
              },
            }),
          ]),
        ] : []),

        // Skills
        ...(resumeData.skills?.length > 0 ? [
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          new Paragraph({
            text: resumeData.skills.join(" • "),
            spacing: {
              after: 200,
            },
          }),
        ] : []),

        // Projects
        ...(resumeData.projects?.length > 0 ? [
          new Paragraph({
            text: "Projects",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          ...resumeData.projects.flatMap((project: any) => [
            new Paragraph({
              spacing: {
                before: 180,
                after: 80,
              },
              children: [
                new TextRun({
                  text: project.name,
                  bold: true,
                  size: 26,
                }),
                ...(project.link ? [
                  new Tab(),
                  new TextRun({
                    text: project.link,
                    color: "0000FF",
                    size: 24,
                  }),
                ] : []),
              ],
            }),
            new Paragraph({
              text: project.description,
              spacing: {
                before: 60,
                after: 60,
              },
            }),
            ...(project.technologies ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technologies: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: project.technologies.join(", "),
                  }),
                ],
                spacing: {
                  before: 60,
                  after: 120,
                },
              }),
            ] : []),
          ]),
        ] : []),

        // Languages
        ...(resumeData.languages?.length > 0 ? [
          new Paragraph({
            text: "Languages",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          new Paragraph({
            children: resumeData.languages.map((lang: any, index: number) => [
              new TextRun({
                text: lang.name,
                bold: true,
              }),
              new TextRun({
                text: ` (${lang.proficiency})`,
              }),
              ...(index < resumeData.languages.length - 1 ? [new TextRun({ text: " • " })] : []),
            ]).flat(),
            spacing: {
              after: 200,
            },
          }),
        ] : []),

        // Certifications
        ...(resumeData.certifications?.length > 0 ? [
          new Paragraph({
            text: "Certifications",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          ...resumeData.certifications.map((cert: any) => 
            new Paragraph({
              children: [
                new TextRun({
                  text: cert.name,
                  bold: true,
                  size: 26,
                }),
                new TextRun({
                  text: ` - ${cert.issuer}`,
                  size: 24,
                }),
                new Tab(),
                new TextRun({
                  text: cert.date,
                  italics: true,
                  size: 24,
                }),
              ],
              spacing: {
                before: 120,
                after: 120,
              },
            })
          ),
        ] : []),

        // Declaration
        ...(resumeData.declaration ? [
          new Paragraph({
            text: "Declaration",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
          }),
          new Paragraph({
            text: resumeData.declaration,
            spacing: {
              before: 120,
              after: 120,
            },
          }),
        ] : []),
      ],
    }],
  });

  return await Packer.toBlob(doc);
};
