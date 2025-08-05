import { ProtectedRoute } from "../components/ProtectedRoute";
import { ManageDeals } from "../components/ManageDeals";

export default function ManageDealsPage() {
  return (
    <ProtectedRoute>
      <ManageDeals />
    </ProtectedRoute>
  );
}