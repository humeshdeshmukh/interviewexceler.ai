'use client';

import { motion } from 'framer-motion';

interface MinimalTemplateProps {
  resumeData: any;
  scale?: number;
}

export function MinimalTemplate({ resumeData, scale = 1 }: MinimalTemplateProps) {
  return (
    <div className="p-8 bg-white text-black" style={{ transform: `scale(${scale})` }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light mb-2">{resumeData.personalInfo.fullName}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{resumeData.personalInfo.email} • {resumeData.personalInfo.phone}</p>
          {resumeData.personalInfo.location && (
            <p>{resumeData.personalInfo.location}</p>
          )}
          {resumeData.personalInfo.linkedin && (
            <p>
              <a 
                href={resumeData.personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                LinkedIn Profile
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-800 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experiences?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Experience</h2>
          <div className="space-y-6">
            {resumeData.experiences.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                {exp.technologies && (
                  <p className="text-gray-600 mt-2 text-sm">
                    Technologies: {exp.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.education?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Projects</h2>
          <div className="space-y-4">
            {resumeData.projects.map((project: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-gray-700">{project.description}</p>
                {project.technologies && (
                  <p className="text-gray-600 mt-1 text-sm">
                    Technologies: {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resumeData.certifications?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Certifications</h2>
          <div className="space-y-3">
            {resumeData.certifications.map((cert: any, index: number) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-gray-500 text-sm">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resumeData.languages?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {resumeData.languages.map((lang: any, index: number) => (
              <div key={index} className="text-gray-700">
                <span className="font-medium">{lang.name}</span>
                <span className="text-gray-500"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer Work */}
      {resumeData.volunteer?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Volunteer Experience</h2>
          <div className="space-y-4">
            {resumeData.volunteer.map((vol: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{vol.role}</h3>
                    <p className="text-gray-600">{vol.organization}</p>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {vol.startDate} - {vol.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{vol.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Declaration */}
      {resumeData.declaration && (
        <div>
          <h2 className="text-lg font-light uppercase tracking-wider mb-4">Declaration</h2>
          <p className="text-gray-700">{resumeData.declaration}</p>
        </div>
      )}
    </div>
  );
}
