'use client';

import { motion } from 'framer-motion';
import styles from '../ResumePreview.module.css';

interface TwoColumnTemplateProps {
  resumeData: any;
  scale?: number;
}

export function TwoColumnTemplate({ resumeData, scale = 1 }: TwoColumnTemplateProps) {
  return (
    <div className="grid grid-cols-3 gap-6 p-8 bg-white text-black" style={{ transform: `scale(${scale})` }}>
      {/* Left Column */}
      <div className="col-span-1 space-y-6 bg-gray-100 p-6 rounded-lg">
        {/* Contact Info */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Contact</h2>
          <div className="text-sm space-y-1">
            <p>{resumeData.personalInfo.email}</p>
            <p>{resumeData.personalInfo.phone}</p>
            <p>{resumeData.personalInfo.location}</p>
            {resumeData.personalInfo.linkedin && (
              <p>
                <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills?.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-white rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resumeData.languages?.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Languages</h2>
            <div className="space-y-1">
              {resumeData.languages.map((lang: any, index: number) => (
                <p key={index} className="text-sm">
                  <span className="font-medium">{lang.name}:</span> {lang.proficiency}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications?.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Certifications</h2>
            <div className="space-y-2">
              {resumeData.certifications.map((cert: any, index: number) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-2 space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
          {resumeData.personalInfo.title && (
            <p className="text-lg text-gray-600">{resumeData.personalInfo.title}</p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Professional Summary</h2>
            <p className="text-sm">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData.experiences?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Work Experience</h2>
            {resumeData.experiences.map((exp: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {exp.description.map((desc: string, i: number) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Education</h2>
            {resumeData.education.map((edu: any, index: number) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Projects</h2>
            {resumeData.projects.map((project: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-sm">{project.description}</p>
                {project.technologies && (
                  <p className="text-sm">
                    <span className="font-medium">Technologies:</span>{" "}
                    {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Declaration */}
        {resumeData.declaration && (
          <div className="space-y-2">
            <h2 className="text-lg font-bold border-b-2 border-[#fcba28] pb-2">Declaration</h2>
            <p className="text-sm">{resumeData.declaration}</p>
          </div>
        )}
      </div>
    </div>
  );
}
