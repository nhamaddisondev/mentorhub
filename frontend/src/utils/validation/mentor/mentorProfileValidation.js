// validationSchemas.js

// Helper function for URL validation
export const isValidUrl = (string) => {
  if (!string) return false;
  return string.startsWith('http://') || string.startsWith('https://');
};

// Validation rules for mentor profile
export const mentorProfileValidation = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 30,
    message: 'First Name'
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 30,
    message: 'Last Name'
  },
  jobTitle: {
    required: true,
    message: 'Job Title'
  },
  company: {
    required: false,
    message: 'Company'
  },
  skills: {
    required: true,
    message: 'Skills'
  },
  location: {
    required: true,
    message: 'Location'
  },
  category: {
    required: true,
    message: 'Category'
  },
  bio: {
    required: true,
    minLength: 10,
    message: 'Bio'
  },
  linkedinUrl: {
    required: true,
    isUrl: true,
    message: 'LinkedIn URL'
  },
  personalWebsite: {
    required: false,
    isUrl: true,
    message: 'Personal Website'
  },
  introVideoUrl: {
    required: false,
    isUrl: true,
    message: 'Introduction Video URL'
  },
  featuredArticleUrl: {
    required: false,
    isUrl: true,
    message: 'Featured Article URL'
  }
};

// Required fields for real-time validation
export const requiredFields = ['firstName', 'lastName', 'jobTitle', 'skills', 'location', 'category', 'bio', 'linkedinUrl'];
// Removed 'company' from requiredFields since it's optional