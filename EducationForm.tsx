import React from 'react';
import { GraduationCap, Plus, X } from 'lucide-react';
import { Education } from '../types/resume';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
  errors: { [key: string]: Partial<Education> };
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange, errors }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>
      
      {data.map((education) => (
        <div key={education.id} className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-start mb-3">
            <GraduationCap className="w-5 h-5 text-blue-500 mt-1" />
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School/University</label>
              <input
                type="text"
                value={education.school}
                onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[education.id]?.school ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="University of Example"
              />
              {errors[education.id]?.school && (
                <p className="text-red-500 text-sm mt-1">{errors[education.id]?.school}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[education.id]?.degree ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Bachelor of Science"
              />
              {errors[education.id]?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors[education.id]?.degree}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[education.id]?.field ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Computer Science"
              />
              {errors[education.id]?.field && (
                <p className="text-red-500 text-sm mt-1">{errors[education.id]?.field}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
              <input
                type="text"
                value={education.gpa}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3.8"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[education.id]?.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[education.id]?.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors[education.id]?.startDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={education.endDate}
                onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[education.id]?.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[education.id]?.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors[education.id]?.endDate}</p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );
};