import { mentorFormValidation, isValidUrl, step1Fields, step2Fields } from './mentorFormValidation';

// Step 1 validation
export const validateStep1 = (formData, photoFile) => {
  const newErrors = {};

  // Validate photo
  if (!photoFile) {
    newErrors.photo = 'Profile photo is required';
  }

  // Validate other step 1 fields
  step1Fields.forEach(field => {
    if (field === 'photo') return; // Already handled above
    
    const rules = mentorFormValidation[field];
    if (!rules) return;

    const value = formData[field]?.trim();
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

    // Special validation for confirmPassword
    if (field === 'confirmPassword' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Email validation
    if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
  });

  return newErrors;
};

// Step 2 validation
export const validateStep2 = (formData) => {
  const newErrors = {};

  step2Fields.forEach(field => {
    const rules = mentorFormValidation[field];
    if (!rules) return;

    const value = formData[field]?.trim();
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

      // URL validation
      if (rules.isUrl && !isValidUrl(value)) {
        newErrors[field] = `${fieldName} must be a valid URL starting with http:// or https://`;
      }

      // LinkedIn specific validation
      if (field === 'linkedin' && value) {
        const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
        if (!linkedinRegex.test(value)) {
          newErrors.linkedin = 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)';
        }
      }
    }
  });

  // Website validation (optional)
  if (formData.website?.trim()) {
    const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    if (!websiteRegex.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (e.g., https://example.com)';
    }
  }

  return newErrors;
};

// Real-time field validation
export const validateField = (name, value, formData, photoFile, currentErrors = {}) => {
  const fieldErrors = { ...currentErrors };
  const rules = mentorFormValidation[name];
  
  if (!rules) return fieldErrors;

  const fieldName = rules.message;
  const trimmedValue = value?.trim();

  // Clear error if field is valid
  if (name === 'photo') {
    if (!photoFile) {
      fieldErrors.photo = `${fieldName} is required`;
    } else {
      delete fieldErrors.photo;
    }
  } else if (trimmedValue) {
    if (rules.minLength && trimmedValue.length < rules.minLength) {
      fieldErrors[name] = `${fieldName} must be at least ${rules.minLength} characters`;
    } else if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      fieldErrors[name] = `${fieldName} must be at most ${rules.maxLength} characters`;
    } else if (rules.isUrl && !isValidUrl(trimmedValue)) {
      fieldErrors[name] = `${fieldName} must be a valid URL starting with http:// or https://`;
    } else if (name === 'linkedin' && trimmedValue) {
      const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-]+\/?$/;
      if (!linkedinRegex.test(trimmedValue)) {
        fieldErrors.linkedin = 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)';
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
    } else if (name === 'website' && trimmedValue) {
      const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
      if (!websiteRegex.test(trimmedValue)) {
        fieldErrors.website = 'Please enter a valid website URL (e.g., https://example.com)';
      } else {
        delete fieldErrors[name];
      }
    } else if (name === 'confirmPassword' && formData.password !== formData.confirmPassword) {
      fieldErrors.confirmPassword = 'Passwords do not match';
    } else {
      delete fieldErrors[name];
    }
  } else {
    // Only set required error for fields that are required and currently empty
    const allRequiredFields = [...step1Fields, ...step2Fields];
    if (allRequiredFields.includes(name) && name !== 'photo') {
      fieldErrors[name] = `${fieldName} is required`;
    } else {
      delete fieldErrors[name];
    }
  }

  return fieldErrors;
};

// Check if step is valid
export const isStepValid = (errors, step) => {
  const stepFields = step === 1 ? step1Fields : step2Fields;
  return !stepFields.some(field => errors[field]);
};