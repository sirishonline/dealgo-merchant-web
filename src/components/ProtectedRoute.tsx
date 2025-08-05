import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { getStorage } from "../utils/localstorage";
import { MerchantLayout } from "./layouts/MerchantLayout";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const token = getStorage("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
  //         <p className="mt-4 text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!token) {
    return null;
  }

  return <MerchantLayout>{children}</MerchantLayout>;
}
