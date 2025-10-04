// Helper function for URL validation
export const isValidUrl = (string) => {
  if (!string) return false;
  return string.startsWith('http://') || string.startsWith('https://');
};

// Validation rules for mentor form
export const mentorFormValidation = {
  photo: {
    required: true,
    message: 'Profile photo'
  },
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
  password: {
    required: true,
    minLength: 6,
    message: 'Password'
  },
  confirmPassword: {
    required: true,
    message: 'Confirm password'
  },
  jobTitle: {
    required: true,
    message: 'Job title'
  },
  email: {
    required: true,
    message: 'Email'
  },
  location: {
    required: true,
    message: 'Location'
  },
  category: {
    required: true,
    message: 'Category'
  },
  skills: {
    required: true,
    message: 'Skills'
  },
  bio: {
    required: true,
    minLength: 10,
    message: 'Bio'
  },
  linkedin: {
    required: true,
    isUrl: true,
    message: 'LinkedIn URL'
  },
  website: {
    required: false,
    isUrl: true,
    message: 'Personal website'
  }
};

// Required fields for each step
export const step1Fields = ['photo', 'firstName', 'lastName', 'password', 'confirmPassword', 'jobTitle', 'email', 'location'];
export const step2Fields = ['category', 'skills', 'bio', 'linkedin'];