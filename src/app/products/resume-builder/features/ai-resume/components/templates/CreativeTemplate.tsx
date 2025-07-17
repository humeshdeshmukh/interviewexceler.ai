"use client";

import { ResumeData } from "../../context/ResumeContext";

interface TemplateProps {
  data: ResumeData;
  scale?: number;
  className?: string;
}

export const CreativeTemplate = ({ data, scale = 1, className = "" }: TemplateProps) => {
  return (
    <div
      className={`bg-white text-black ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
    >
      {/* Header with Accent Background */}
      <header className="bg-primary/10 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{data.personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-primary">
              {data.personalInfo.email}
            </a>
            <span>|</span>
            <span>{data.personalInfo.phone}</span>
            <span>|</span>
            <span>{data.personalInfo.location}</span>
            {data.personalInfo.linkedin && (
              <>
                <span>|</span>
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  LinkedIn
                </a>
              </>
            )}
            {data.personalInfo.portfolio && (
              <>
                <span>|</span>
                <a
                  href={data.personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Portfolio
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        {/* Summary with Accent Border */}
        {data.personalInfo.summary && (
          <section className="mb-12 pl-4 border-l-4 border-primary">
            <p className="text-lg leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Skills Grid */}
        {data.skills.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg text-center hover:bg-primary/10 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Timeline */}
        {data.experiences.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Experience</h2>
            <div className="space-y-8">
              {data.experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary/20">
                  <div className="absolute left-0 top-0 w-2 h-2 bg-primary rounded-full -translate-x-[3px]" />
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-gray-700">{desc}</li>
                    ))}
                  </ul>
                  {exp.technologies && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects with Cards */}
        {data.projects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View →
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education and Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-4">
                    <h3 className="font-bold">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-primary">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 text-primary">
                Certifications
              </h2>
              <div className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors"
                  >
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-primary">{cert.issuer}</p>
                    <p className="text-sm text-gray-600">{cert.date}</p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Certificate →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Languages</h2>
            <div className="flex flex-wrap gap-4">
              {data.languages.map((lang, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-50 rounded-lg flex items-center gap-2"
                >
                  <span className="font-bold">{lang.name}</span>
                  <span className="text-sm text-gray-600">
                    ({lang.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Declaration */}
        {data.declaration && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 italic text-center">
              {data.declaration}
            </p>
          </section>
        )}
      </main>
    </div>
  );
};
