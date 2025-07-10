import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, EyeOff } from 'lucide-react';
import { ResumeData, PersonalInfo, Education, Experience } from './types/resume';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { EducationForm } from './components/EducationForm';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsForm } from './components/SkillsForm';
import { ResumePreview } from './components/ResumePreview';
import { validateResumeData, hasValidationErrors, ValidationErrors } from './utils/validation';
import { exportToPDF } from './utils/pdfExport';

const initialPersonalInfo: PersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  summary: ''
};

const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  education: [],
  experience: [],
  skills: []
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    personalInfo: {},
    education: {},
    experience: {}
  });
  const [showPreview, setShowPreview] = useState(true);

  // Validate data whenever it changes
  useEffect(() => {
    const errors = validateResumeData(resumeData);
    setValidationErrors(errors);
  }, [resumeData]);

  const updatePersonalInfo = (personalInfo: PersonalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateExperience = (experience: Experience[]) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateSkills = (skills: string[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const handleExportPDF = () => {
    if (hasValidationErrors(validationErrors)) {
      alert('Please fix all validation errors before exporting.');
      return;
    }
    exportToPDF(resumeData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`space-y-8 ${showPreview ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PersonalInfoForm
                data={resumeData.personalInfo}
                onChange={updatePersonalInfo}
                errors={validationErrors.personalInfo}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <EducationForm
                data={resumeData.education}
                onChange={updateEducation}
                errors={validationErrors.education}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <ExperienceForm
                data={resumeData.experience}
                onChange={updateExperience}
                errors={validationErrors.experience}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <SkillsForm
                data={resumeData.skills}
                onChange={updateSkills}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${showPreview ? '' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Resume Preview
                </h2>
                <div className="border rounded-lg overflow-hidden">
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;