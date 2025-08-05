import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export default function OuterLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      <Toaster position="top-center" />
    </div>
  );
}
