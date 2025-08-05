import { ProtectedRoute } from "../../components/ProtectedRoute";
import { MyAccount } from "../../components/profile/MyAccount";

export default function PersonalAccountPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Personal Information</h1>
          <p className="text-muted-foreground">Manage your personal account details and preferences.</p>
        </div>
        <MyAccount />
      </div>
    </ProtectedRoute>
  );
}