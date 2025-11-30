import { ResumeData } from "../../../context/ResumeContext";
import { formatDate } from "../../components/templates/utils/dateUtils";

export const generateGeminiTemplate = (data: ResumeData) => ({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        // Header with Name and Contact Info
        {
          type: "paragraph",
          children: [
            {
              text: data.personalInfo.name,
              bold: true,
              size: 36,
              color: "2563EB", // blue-600
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: data.personalInfo.title,
              size: 24,
              color: "4F46E5", // indigo-600
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
              size: 20,
              color: "6B7280", // gray-500
            },
          ],
        },

        // Professional Summary
        {
          type: "paragraph",
          children: [
            {
              text: "Professional Summary",
              bold: true,
              size: 28,
              color: "2563EB",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: data.personalInfo.summary,
              size: 20,
            },
          ],
        },

        // Experience Section
        ...(data.experiences.length > 0
          ? [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Professional Experience",
                    bold: true,
                    size: 28,
                    color: "2563EB",
                  },
                ],
              },
              ...data.experiences.flatMap((exp) => [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: exp.title,
                      bold: true,
                      size: 24,
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: exp.company,
                      italic: true,
                      size: 20,
                      color: "7C3AED", // purple-600
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: `${formatDate(exp.startDate)} - ${
                        exp.current ? "Present" : formatDate(exp.endDate)
                      }`,
                      size: 20,
                      color: "6B7280",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: exp.description,
                      size: 20,
                    },
                  ],
                },
              ]),
            ]
          : []),

        // Skills Section
        ...(data.skills.length > 0
          ? [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Skills",
                    bold: true,
                    size: 28,
                    color: "2563EB",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: data.skills.join(" • "),
                    size: 20,
                  },
                ],
              },
            ]
          : []),

        // Education Section
        ...(data.education.length > 0
          ? [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Education",
                    bold: true,
                    size: 28,
                    color: "2563EB",
                  },
                ],
              },
              ...data.education.flatMap((edu) => [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: edu.degree,
                      bold: true,
                      size: 24,
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: edu.school,
                      italic: true,
                      size: 20,
                      color: "7C3AED",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: `${formatDate(edu.startDate)} - ${
                        edu.current ? "Present" : formatDate(edu.endDate)
                      }`,
                      size: 20,
                      color: "6B7280",
                    },
                  ],
                },
                ...(edu.description
                  ? [
                      {
                        type: "paragraph",
                        children: [
                          {
                            text: edu.description,
                            size: 20,
                          },
                        ],
                      },
                    ]
                  : []),
              ]),
            ]
          : []),

        // Projects Section
        ...(data.projects.length > 0
          ? [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Projects",
                    bold: true,
                    size: 28,
                    color: "2563EB",
                  },
                ],
              },
              ...data.projects.flatMap((project) => [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: project.name,
                      bold: true,
                      size: 24,
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: project.technologies,
                      italic: true,
                      size: 20,
                      color: "7C3AED",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: project.description,
                      size: 20,
                    },
                  ],
                },
              ]),
            ]
          : []),

        // Certifications Section
        ...(data.certifications.length > 0
          ? [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Certifications",
                    bold: true,
                    size: 28,
                    color: "2563EB",
                  },
                ],
              },
              ...data.certifications.flatMap((cert) => [
                {
                  type: "paragraph",
                  children: [
                    {
                      text: cert.name,
                      bold: true,
                      size: 24,
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: cert.issuer,
                      italic: true,
                      size: 20,
                      color: "7C3AED",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      text: formatDate(cert.date),
                      size: 20,
                      color: "6B7280",
                    },
                  ],
                },
              ]),
            ]
          : []),
      ],
    },
  ],
});
