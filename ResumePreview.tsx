import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div id="resume-preview" className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {data.personalInfo.address}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </div>
              </div>
              {exp.responsibilities.length > 0 && exp.responsibilities[0] && (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.responsibilities.map((responsibility, index) => (
                    responsibility && (
                      <li key={index} className="text-sm">{responsibility}</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.school}</p>
                  {edu.gpa && (
                    <p className="text-gray-500 text-sm">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-right text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!data.personalInfo.fullName && 
       data.experience.length === 0 && 
       data.education.length === 0 && 
       data.skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">Your resume preview will appear here</p>
          <p className="text-sm">Start filling out the form to see your resume come to life!</p>
        </div>
      )}
    </div>
  );
};