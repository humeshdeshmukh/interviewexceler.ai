"use client";

import { ResumeData } from "../../context/ResumeContext";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  className?: string;
}

export const MinimalTemplate = ({ data, scale = 1, className = "" }: TemplateProps) => {
  return (
    <div
      className={`bg-white text-black p-8 max-w-4xl mx-auto ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-light mb-4">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={data.personalInfo.linkedin} className="text-primary">
                LinkedIn
              </a>
            </>
          )}
          {data.personalInfo.portfolio && (
            <>
              <span>•</span>
              <a href={data.personalInfo.portfolio} className="text-primary">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider">
            Experience
          </h2>
          {data.experiences.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              {exp.technologies && (
                <p className="text-sm mt-2 text-gray-600">
                  {exp.technologies.join(" • ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-medium">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              {edu.gpa && (
                <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-gray-100 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-medium">{project.name}</h3>
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
              <p className="text-sm text-gray-700 mb-1">{project.description}</p>
              <p className="text-sm text-gray-600">
                {project.technologies.join(" • ")}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Additional Sections */}
      <div className="grid grid-cols-2 gap-8">
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider">
              Certifications
            </h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-medium text-sm">{cert.name}</h3>
                <p className="text-sm text-gray-600">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider">
              Languages
            </h2>
            {data.languages.map((lang, index) => (
              <div key={index} className="mb-2 text-sm">
                <span className="font-medium">{lang.name}</span>
                <span className="text-gray-600"> • {lang.proficiency}</span>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Declaration */}
      {data.declaration && (
        <section className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">{data.declaration}</p>
        </section>
      )}
    </div>
  );
};
