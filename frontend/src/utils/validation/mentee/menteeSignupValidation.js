// Validation rules for mentee signup
export const menteeSignupValidation = {
  firstName: {
    required: true,
    minLength: 2,
    message: 'First name'
  },
  lastName: {
    required: true,
    minLength: 2,
    message: 'Last name'
  },
  email: {
    required: true,
    message: 'Email'
  },
  password: {
    required: true,
    minLength: 6,
    message: 'Password'
  },
  confirmPassword: {
    required: true,
    message: 'Confirm password'
  }
};

// Required fields
export const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];