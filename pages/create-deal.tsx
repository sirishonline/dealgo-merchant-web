import { ProtectedRoute } from "../components/ProtectedRoute";
import { CreateDeal } from "../components/CreateDeal";

export default function CreateDealPage() {
  return (
    <ProtectedRoute>
      <CreateDeal />
    </ProtectedRoute>
  );
}