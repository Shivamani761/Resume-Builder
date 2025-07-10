import { ResumeData, PersonalInfo, Education, Experience } from '../types/resume';

export interface ValidationErrors {
  personalInfo: Partial<PersonalInfo>;
  education: { [key: string]: Partial<Education> };
  experience: { [key: string]: Partial<Experience> };
}

export const validateResumeData = (data: ResumeData): ValidationErrors => {
  const errors: ValidationErrors = {
    personalInfo: {},
    education: {},
    experience: {}
  };

  // Validate personal info
  if (!data.personalInfo.fullName.trim()) {
    errors.personalInfo.fullName = 'Full name is required';
  }

  if (!data.personalInfo.email.trim()) {
    errors.personalInfo.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    errors.personalInfo.email = 'Please enter a valid email address';
  }

  if (!data.personalInfo.phone.trim()) {
    errors.personalInfo.phone = 'Phone number is required';
  }

  if (!data.personalInfo.address.trim()) {
    errors.personalInfo.address = 'Address is required';
  }

  // Validate education
  data.education.forEach(edu => {
    const eduErrors: Partial<Education> = {};

    if (!edu.school.trim()) {
      eduErrors.school = 'School name is required';
    }

    if (!edu.degree.trim()) {
      eduErrors.degree = 'Degree is required';
    }

    if (!edu.field.trim()) {
      eduErrors.field = 'Field of study is required';
    }

    if (!edu.startDate) {
      eduErrors.startDate = 'Start date is required';
    }

    if (!edu.endDate) {
      eduErrors.endDate = 'End date is required';
    }

    if (edu.startDate && edu.endDate && new Date(edu.startDate) > new Date(edu.endDate)) {
      eduErrors.endDate = 'End date must be after start date';
    }

    if (Object.keys(eduErrors).length > 0) {
      errors.education[edu.id] = eduErrors;
    }
  });

  // Validate experience
  data.experience.forEach(exp => {
    const expErrors: Partial<Experience> = {};

    if (!exp.company.trim()) {
      expErrors.company = 'Company name is required';
    }

    if (!exp.position.trim()) {
      expErrors.position = 'Position is required';
    }

    if (!exp.startDate) {
      expErrors.startDate = 'Start date is required';
    }

    if (!exp.endDate) {
      expErrors.endDate = 'End date is required';
    }

    if (exp.startDate && exp.endDate && new Date(exp.startDate) > new Date(exp.endDate)) {
      expErrors.endDate = 'End date must be after start date';
    }

    if (Object.keys(expErrors).length > 0) {
      errors.experience[exp.id] = expErrors;
    }
  });

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return (
    Object.keys(errors.personalInfo).length > 0 ||
    Object.keys(errors.education).length > 0 ||
    Object.keys(errors.experience).length > 0
  );
};