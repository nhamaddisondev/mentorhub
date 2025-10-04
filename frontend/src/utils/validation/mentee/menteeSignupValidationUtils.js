import { menteeSignupValidation, requiredFields } from './menteeSignupValidation';

// Main form validation
export const validateForm = (formData) => {
  const newErrors = {};

  requiredFields.forEach(field => {
    const rules = menteeSignupValidation[field];
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
        return;
      }
    }

    // Special validations
    if (field === 'email' && value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        newErrors.email = 'Email is invalid';
      }
    }

    if (field === 'confirmPassword' && formData.password !== value) { 
      newErrors.confirmPassword = 'Passwords do not match';
    }
  });

  return newErrors;
};

/// Real-time field validation
export const validateField = (name, value, formData, currentErrors = {}) => {
  const fieldErrors = { ...currentErrors };
  const rules = menteeSignupValidation[name];
  
  if (!rules) {
    delete fieldErrors[name];
    return fieldErrors;
  }

  const fieldName = rules.message;
  const trimmedValue = value?.trim();

  // Clear existing error for this field
  delete fieldErrors[name];

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
    return fieldErrors;
  }

  // Email validation
  if (name === 'email') {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(trimmedValue)) {
      fieldErrors.email = 'Email is invalid';
    }
    return fieldErrors;
  }

  // Password match validation - FIXED: Use trimmedValue instead of formData.confirmPassword
  if (name === 'confirmPassword') {
    if (formData.password !== trimmedValue) {  // Use trimmedValue (current input)
      fieldErrors.confirmPassword = 'Passwords do not match';
    }
    return fieldErrors;
  }

  return fieldErrors;
};

// Check if form is valid
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};