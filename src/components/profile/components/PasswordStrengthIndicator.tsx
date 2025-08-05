import { calculatePasswordStrength, getStrengthColor, getStrengthText, getStrengthTextColor } from "../utils/passwordValidation";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
              style={{ width: `${passwordStrength.score}%` }}
            />
          </div>
        </div>
        <span className={`text-sm font-medium ${getStrengthTextColor(passwordStrength.score)}`}>
          {getStrengthText(passwordStrength.score)}
        </span>
      </div>
      
      {passwordStrength.feedback.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <p>Password should include:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {passwordStrength.feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}