"use client";

import React from 'react';
import { ResumeData } from './types';
import { formatDate } from './utils/dateUtils';

interface ResumeTemplateProps {
  resumeData: ResumeData;
  templateStyle: string;
  onEdit?: (section: string, index: number) => void;
}

export const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
  resumeData,
  templateStyle,
  onEdit
}) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = []
  } = resumeData || {};

  if (!resumeData || !personalInfo) {
    return (
      <div className="resume-template bg-white text-gray-800 min-h-[297mm] w-[210mm] mx-auto p-8 shadow-lg">
        <p className="text-center text-gray-500">No resume data available. Please add your information.</p>
      </div>
    );
  }

  return (
    <div className="resume-template bg-white text-gray-800 min-h-[297mm] w-[210mm] mx-auto p-8 shadow-lg">
      {/* Header Section */}
      <header className="resume-header mb-8 text-center">
        <h1 className="resume-name text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="resume-contact flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-200">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="resume-item mb-4" onClick={() => onEdit?.('experience', index)}>
              <div className="flex justify-between items-start">
                <h3 className="resume-item-title text-lg font-semibold">
                  {exp.title || 'Position'} {exp.company && `at ${exp.company}`}
                </h3>
                <span className="resume-item-subtitle text-sm text-gray-600">
                  {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </span>
              </div>
              {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-200">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="resume-item mb-4" onClick={() => onEdit?.('education', index)}>
              <div className="flex justify-between items-start">
                <h3 className="resume-item-title text-lg font-semibold">
                  {edu.degree && edu.field ? `${edu.degree} in ${edu.field}` : 'Degree'}
                </h3>
                <span className="resume-item-subtitle text-sm text-gray-600">
                  {edu.startDate && formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </span>
              </div>
              {edu.school && <p className="text-gray-700">{edu.school}</p>}
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-200">
            Skills
          </h2>
          <div className="resume-skills grid grid-cols-2 gap-4">
            {skills.map((skillCategory, index) => (
              <div key={index} className="resume-skill-category" onClick={() => onEdit?.('skills', index)}>
                <h3 className="resume-skill-title text-lg font-semibold mb-2">
                  {skillCategory.category || 'Skill Category'}
                </h3>
                <div className="resume-skill-list flex flex-wrap gap-2">
                  {(skillCategory.items || []).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="resume-skill-item px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-200">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="resume-item mb-4" onClick={() => onEdit?.('projects', index)}>
              <div className="flex justify-between items-start">
                <h3 className="resume-item-title text-lg font-semibold">
                  {project.name || 'Project Name'}
                </h3>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
              {project.description && <p className="text-gray-700 mt-2">{project.description}</p>}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section className="resume-section mb-6">
          <h2 className="resume-section-title text-2xl font-bold mb-4 text-gray-900 border-b-2 border-gray-200">
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={index} className="resume-item mb-4" onClick={() => onEdit?.('certifications', index)}>
              <div className="flex justify-between items-start">
                <h3 className="resume-item-title text-lg font-semibold">
                  {cert.name || 'Certification Name'}
                </h3>
                {cert.date && (
                  <span className="resume-item-subtitle text-sm text-gray-600">
                    {formatDate(cert.date)}
                  </span>
                )}
              </div>
              {cert.issuer && <p className="text-gray-700">{cert.issuer}</p>}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      <style jsx>{`
        @media print {
          .resume-template {
            box-shadow: none;
            margin: 0;
            padding: 20mm;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
        }
        
        .resume-template {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        .resume-item:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.02);
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>
  );
};
