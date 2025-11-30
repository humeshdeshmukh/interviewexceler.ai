"use client";

import { ResumeData } from "../../context/ResumeContext";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  className?: string;
}

export const ModernTemplate = ({ data, scale = 1, className = "" }: TemplateProps) => {
  return (
    <div
      className={`bg-white text-black p-8 ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
    >
      {/* Header */}
      <header className="text-center mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="text-sm space-y-1">
          <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
          {data.personalInfo.linkedin && (
            <p>LinkedIn: {data.personalInfo.linkedin}</p>
          )}
          {data.personalInfo.portfolio && (
            <p>Portfolio: {data.personalInfo.portfolio}</p>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {data.experiences.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Experience</h2>
              {data.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  {exp.technologies && (
                    <p className="text-sm mt-2 text-gray-600">
                      <span className="font-semibold">Technologies:</span>{" "}
                      {exp.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-sm mt-1">{project.description}</p>
                  <p className="text-sm mt-1 text-gray-600">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {project.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-sm">{edu.field}</p>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{lang.name}:</span>{" "}
                  <span className="text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary mb-4">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-600">{cert.date}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* Declaration */}
      {data.declaration && (
        <section className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 italic">{data.declaration}</p>
        </section>
      )}
    </div>
  );
};
