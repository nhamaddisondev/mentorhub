// Helper function for URL validation
export const isValidUrl = (string) => {
  if (!string) return false;
  return string.startsWith('http://') || string.startsWith('https://');
};

// Validation rules for mentee profile
export const menteeProfileValidation = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 30,
    message: 'First name'
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 30,
    message: 'Last name'
  },
  email: {
    required: true,
    message: 'Email'
  },
  phone: {
    required: false,
    message: 'Phone'
  },
  location: {
    required: false,
    message: 'Location'
  },
  jobTitle: {
    required: false,
    message: 'Job title'
  },
  linkedinUrl: {
    required: false,
    isUrl: true,
    message: 'LinkedIn URL'
  },
  education: {
    required: false,
    message: 'Education'
  },
  skills: {
    required: false,
    message: 'Skills'
  },
  careerInterests: {
    required: false,
    message: 'Career interests'
  },
  goal: {
    required: false,
    message: 'Goal'
  },
  bio: {
    required: false,
    message: 'Bio'
  }
};

// Required fields
export const requiredFields = ['firstName', 'lastName', 'email'];