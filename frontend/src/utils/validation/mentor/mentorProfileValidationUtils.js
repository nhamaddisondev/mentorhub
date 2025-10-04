import { mentorProfileValidation } from './mentorProfileValidation';

// Helper function for URL validation
export const isValidUrl = (string) => {
  if (!string) return false;
  return string.startsWith('http://') || string.startsWith('https://');
};

// Main form validation function
export const validateForm = (formData, photoFile = null) => {
  const newErrors = {};

  // Validate photo if provided
  if (photoFile !== null && !photoFile) {
    newErrors.photo = 'Profile photo is required';
  }

  // Validate each field
  Object.entries(mentorProfileValidation).forEach(([field, rules]) => {
    // Skip photo validation here (handled above)
    if (field === 'photo') return;
    
    const value = formData[field]?.trim();
    const fieldName = rules.message;

    // Check required fields
    if (rules.required && !value) {
      newErrors[field] = `${fieldName} is required`;
      return;
    }

    // Skip further validation for empty optional fields
    if (!rules.required && !value) {
      return;
    }

    // Check min length
    if (rules.minLength && value.length < rules.minLength) {
      newErrors[field] = `${fieldName} must be at least ${rules.minLength} characters`;
      return;
    }

    // Check max length
    if (rules.maxLength && value.length > rules.maxLength) {
      newErrors[field] = `${fieldName} must be at most ${rules.maxLength} characters`;
      return;
    }

    // Check URL format
    if (rules.isUrl && value && !isValidUrl(value)) {
      newErrors[field] = `${fieldName} must be a valid URL starting with http:// or https://`;
      return;
    }

    // Field-specific validations
    if (field === 'linkedinUrl' && value && isValidUrl(value)) {
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
      if (!linkedinRegex.test(value)) {
        newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)';
      }
    }

    if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if ((field === 'personalWebsite' || field === 'introVideoUrl' || field === 'featuredArticleUrl') && value) {
      const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      if (!websiteRegex.test(value)) {
        newErrors[field] = `Please enter a valid URL (e.g., https://example.com)`;
      }
    }
  });

  return newErrors;
};

// Real-time field validation
export const validateField = (name, value, currentErrors = {}) => {
  const fieldErrors = { ...currentErrors };
  
  const rules = mentorProfileValidation[name];
  if (!rules) {
    delete fieldErrors[name];
    return fieldErrors;
  }

  const fieldName = rules.message;
  const trimmedValue = value?.trim();

  // Clear existing error for this field
  delete fieldErrors[name];

  // Skip validation for optional fields with no value
  if (!trimmedValue && !rules.required) {
    return fieldErrors;
  }

  // Required field validation
  if (rules.required && !trimmedValue) {
    fieldErrors[name] = `${fieldName} is required`;
    return fieldErrors;
  }

  // Skip further validation if no value
  if (!trimmedValue) {
    return fieldErrors;
  }

  // Length validation
  if (rules.minLength && trimmedValue.length < rules.minLength) {
    fieldErrors[name] = `${fieldName} must be at least ${rules.minLength} characters`;
  } else if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    fieldErrors[name] = `${fieldName} must be at most ${rules.maxLength} characters`;
  }

  // URL validation
  if (rules.isUrl && !isValidUrl(trimmedValue)) {
    fieldErrors[name] = `${fieldName} must be a valid URL starting with http:// or https://`;
  }

  // Field-specific validations
  if (name === 'linkedinUrl' && isValidUrl(trimmedValue)) {
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
    if (!linkedinRegex.test(trimmedValue)) {
      fieldErrors.linkedinUrl = 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)';
    }
  }

  if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedValue)) {
      fieldErrors.email = 'Please enter a valid email address';
    }
  }

  if ((name === 'personalWebsite' || name === 'introVideoUrl' || name === 'featuredArticleUrl') && trimmedValue) {
    const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    if (!websiteRegex.test(trimmedValue)) {
      fieldErrors[name] = `Please enter a valid URL (e.g., https://example.com)`;
    }
  }

  return fieldErrors;
};

// Check if form is valid
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

export default { validateForm, validateField, isFormValid };