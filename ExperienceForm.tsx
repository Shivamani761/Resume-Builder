import React from 'react';
import { Briefcase, Plus, X } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
  errors: { [key: string]: Partial<Experience> };
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange, errors }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addResponsibility = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'responsibilities', [...experience.responsibilities, '']);
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(id, 'responsibilities', newResponsibilities);
    }
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(id, 'responsibilities', newResponsibilities);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </button>
      </div>
      
      {data.map((experience) => (
        <div key={experience.id} className="border rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-start mb-3">
            <Briefcase className="w-5 h-5 text-blue-500 mt-1" />
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[experience.id]?.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ABC Company"
              />
              {errors[experience.id]?.company && (
                <p className="text-red-500 text-sm mt-1">{errors[experience.id]?.company}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[experience.id]?.position ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Software Engineer"
              />
              {errors[experience.id]?.position && (
                <p className="text-red-500 text-sm mt-1">{errors[experience.id]?.position}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[experience.id]?.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[experience.id]?.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors[experience.id]?.startDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[experience.id]?.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[experience.id]?.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors[experience.id]?.endDate}</p>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Key Responsibilities</label>
              <button
                onClick={() => addResponsibility(experience.id)}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                + Add Responsibility
              </button>
            </div>
            
            {experience.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={responsibility}
                  onChange={(e) => updateResponsibility(experience.id, index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe a key responsibility or achievement..."
                />
                {experience.responsibilities.length > 1 && (
                  <button
                    onClick={() => removeResponsibility(experience.id, index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No work experience entries yet. Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );
};