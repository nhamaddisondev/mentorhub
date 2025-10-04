import { menteeProfileValidation, isValidUrl, requiredFields } from './menteeProfileValidation';

// Main form validation
export const validateForm = (tempData) => {
  const newErrors = {};

  // Validate required fields
  requiredFields.forEach(field => {
    const rules = menteeProfileValidation[field];
    if (!rules) return;

    const value = tempData[field]?.trim();
    const fieldName = rules.message;

    if (rules.required && !value) {
      newErrors[field] = `${fieldName} is required`;
      return;
    }

    if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `${fieldName} must be at least ${rules.minLength} characters`;
      } else if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[field] = `${fieldName} must be at most ${rules.maxLength} characters`;
      }
    }

    // Email validation
    if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
  });

  // Validate optional URL fields
  const optionalUrlFields = ['linkedinUrl'];
  
  optionalUrlFields.forEach(field => {
    const rules = menteeProfileValidation[field];
    if (!rules) return;

    const value = tempData[field]?.trim();
    const fieldName = rules.message;

    if (value && rules.isUrl && !isValidUrl(value)) {
      newErrors[field] = `${fieldName} must be a valid URL starting with http:// or https://`;
    }

    // LinkedIn specific validation
    if (field === 'linkedinUrl' && value) {
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
      if (!linkedinRegex.test(value)) {
        newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)';
      }
    }
  });

  return newErrors;
};

// Real-time field validation
export const validateField = (name, value, currentErrors = {}) => {
  const fieldErrors = { ...currentErrors };
  const rules = menteeProfileValidation[name];
  
  if (!rules) return fieldErrors;

  const fieldName = rules.message;
  const trimmedValue = value?.trim();

  // Clear error if field is valid
  if (trimmedValue) {
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      fieldErrors[name] = `${fieldName} must be at least ${rules.minLength} characters`;
    } else if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      fieldErrors[name] = `${fieldName} must be at most ${rules.maxLength} characters`;
    } else if (rules.isUrl && !isValidUrl(trimmedValue)) {
      fieldErrors[name] = `${fieldName} must be a valid URL starting with http:// or https://`;
    } else if (name === 'linkedinUrl' && trimmedValue) {
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
      if (!linkedinRegex.test(trimmedValue)) {
        fieldErrors.linkedinUrl = 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)';
      } else {
        delete fieldErrors[name];
      }
    } else if (name === 'email' && trimmedValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedValue)) {
        fieldErrors.email = 'Please enter a valid email address';
      } else {
        delete fieldErrors[name];
      }
    } else {
      delete fieldErrors[name];
    }
  } else {
    // Only set required error for fields that are required and currently empty
    if (requiredFields.includes(name)) {
      fieldErrors[name] = `${fieldName} is required`;
    } else {
      delete fieldErrors[name];
    }
  }

  return fieldErrors;
};

// Check if form is valid
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};