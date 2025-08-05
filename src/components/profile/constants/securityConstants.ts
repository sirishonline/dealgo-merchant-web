export const SECURITY_TIPS = [
  {
    title: "Use a strong password",
    description: "Include uppercase, lowercase, numbers, and symbols"
  },
  {
    title: "Make it unique",
    description: "Don't reuse passwords from other accounts"
  },
  {
    title: "Keep it private",
    description: "Never share your password with anyone"
  },
  {
    title: "Update regularly",
    description: "Change your password every 3-6 months"
  }
];

export const PASSWORD_REQUIREMENTS = [
  { key: 'length', label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
  { key: 'lowercase', label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  { key: 'uppercase', label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { key: 'number', label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
  { key: 'special', label: 'One special character', test: (pwd: string) => /[^a-zA-Z0-9]/.test(pwd) }
];

export const VALIDATION_RULES = {
  currentPassword: {
    required: "Current password is required",
  },
  newPassword: {
    required: "New password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters"
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }
  },
  confirmPassword: {
    required: "Please confirm your new password",
  }
};