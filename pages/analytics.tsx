import { ProtectedRoute } from "../components/ProtectedRoute";
import { Analytics } from "../components/Analytics";

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  );
}