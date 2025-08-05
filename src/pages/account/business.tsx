import { ProtectedRoute } from "../../components/ProtectedRoute";
import { BusinessProfile } from "../../components/profile/BusinessProfile";

export default function BusinessAccountPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Business Profile</h1>
          <p className="text-muted-foreground">Update your business information and contact details.</p>
        </div>
        <BusinessProfile />
      </div>
    </ProtectedRoute>
  );
}