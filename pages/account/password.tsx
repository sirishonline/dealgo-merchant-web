import { ProtectedRoute } from "../../components/ProtectedRoute";
import { ChangePassword } from "../../components/profile/ChangePassword";

export default function PasswordPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Change Password</h1>
          <p className="text-muted-foreground">Update your account password for security.</p>
        </div>
        <ChangePassword />
      </div>
    </ProtectedRoute>
  );
}