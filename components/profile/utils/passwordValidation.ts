export interface PasswordStrength {
  score: number;
  feedback: string[];
}

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 20;
  } else {
    feedback.push("At least 8 characters");
  }

  if (/[a-z]/.test(password)) {
    score += 20;
  } else {
    feedback.push("One lowercase letter");
  }

  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push("One uppercase letter");
  }

  if (/\d/.test(password)) {
    score += 20;
  } else {
    feedback.push("One number");
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push("One special character");
  }

  return { score, feedback };
};

export const getStrengthColor = (score: number): string => {
  if (score < 40) return "bg-red-500";
  if (score < 60) return "bg-orange-500";
  if (score < 80) return "bg-yellow-500";
  return "bg-green-500";
};

export const getStrengthText = (score: number): string => {
  if (score < 40) return "Weak";
  if (score < 60) return "Fair";
  if (score < 80) return "Good";
  return "Strong";
};

export const getStrengthTextColor = (score: number): string => {
  if (score < 40) return 'text-red-600';
  if (score < 60) return 'text-orange-600';
  if (score < 80) return 'text-yellow-600';
  return 'text-green-600';
};