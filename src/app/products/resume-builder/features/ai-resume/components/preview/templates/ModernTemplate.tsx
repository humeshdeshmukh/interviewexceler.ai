'use client';

import { motion } from 'framer-motion';

interface ModernTemplateProps {
  resumeData: any;
  scale?: number;
}

export function ModernTemplate({ resumeData, scale = 1 }: ModernTemplateProps) {
  return (
    <div className="p-8 bg-white text-black" style={{ transform: `scale(${scale})` }}>
      {/* Header */}
      <div className="border-b-2 border-[#fcba28] pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-3">{resumeData.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-700">
          <span>{resumeData.personalInfo.email}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.phone}</span>
          {resumeData.personalInfo.location && (
            <>
              <span>•</span>
              <span>{resumeData.personalInfo.location}</span>
            </>
          )}
          {resumeData.personalInfo.linkedin && (
            <>
              <span>•</span>
              <a 
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fcba28] hover:text-[#fcba28]/80"
              >
                LinkedIn Profile
              </a>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Professional Summary</h2>
          <p className="text-gray-800 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experiences?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Experience</h2>
          <div className="space-y-6">
            {resumeData.experiences.map((exp: any, index: number) => (
              <div key={index} className="relative pl-4 border-l-2 border-[#fcba28]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  {exp.description.map((desc: string, i: number) => (
                    <li key={i} className="text-gray-700">{desc}</li>
                  ))}
                </ul>
                {exp.technologies && (
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {exp.technologies.join(", ")}
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
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="relative pl-4 border-l-2 border-[#fcba28]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.gpa && (
                  <p className="text-gray-700 mt-1">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resumeData.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill: string, index: number) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-800 font-medium"
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
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Projects</h2>
          <div className="space-y-6">
            {resumeData.projects.map((project: any, index: number) => (
              <div key={index} className="relative pl-4 border-l-2 border-[#fcba28]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fcba28] hover:text-[#fcba28]/80"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{project.description}</p>
                {project.technologies && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {project.technologies.join(", ")}
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
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Certifications</h2>
          <div className="space-y-4">
            {resumeData.certifications.map((cert: any, index: number) => (
              <div key={index} className="relative pl-4 border-l-2 border-[#fcba28]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{cert.name}</h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                  </div>
                  <span className="text-gray-600">{cert.date}</span>
                </div>
                {cert.link && (
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fcba28] hover:text-[#fcba28]/80 mt-1 inline-block"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {resumeData.languages?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Languages</h2>
          <div className="flex flex-wrap gap-6">
            {resumeData.languages.map((lang: any, index: number) => (
              <div key={index} className="text-gray-800">
                <span className="font-bold">{lang.name}</span>
                <span className="text-gray-600"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer Work */}
      {resumeData.volunteer?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Volunteer Experience</h2>
          <div className="space-y-6">
            {resumeData.volunteer.map((vol: any, index: number) => (
              <div key={index} className="relative pl-4 border-l-2 border-[#fcba28]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{vol.role}</h3>
                    <p className="text-gray-700">{vol.organization}</p>
                  </div>
                  <span className="text-gray-600">
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
          <h2 className="text-2xl font-bold mb-4 text-[#fcba28]">Declaration</h2>
          <p className="text-gray-700">{resumeData.declaration}</p>
        </div>
      )}
    </div>
  );
}
