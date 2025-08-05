import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { CheckCircle, Shield } from "lucide-react";
import { SECURITY_TIPS, PASSWORD_REQUIREMENTS } from "../constants/securityConstants";

interface SecurityTipsSidebarProps {
  currentPassword?: string;
}

export function SecurityTipsSidebar({ currentPassword = "" }: SecurityTipsSidebarProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Security Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {SECURITY_TIPS.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{tip.title}</p>
                  <p className="text-xs text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Password Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            {PASSWORD_REQUIREMENTS.map((requirement) => (
              <div key={requirement.key} className="flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  currentPassword && requirement.test(currentPassword) ? 'bg-green-500' : 'bg-muted'
                }`} />
                <span className={
                  currentPassword && requirement.test(currentPassword) 
                    ? 'text-green-600' 
                    : 'text-muted-foreground'
                }>
                  {requirement.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}