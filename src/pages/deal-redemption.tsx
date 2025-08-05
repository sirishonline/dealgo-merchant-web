import { ProtectedRoute } from "../components/ProtectedRoute";
import { DealRedemption } from "../components/DealRedemption";

export default function DealRedemptionPage() {
  return (
    <ProtectedRoute>
      <DealRedemption />
    </ProtectedRoute>
  );
}