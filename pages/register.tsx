import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Register } from "../components/auth/Register";

export default function RegisterPage() {
  const { register } = useAuth();

  const handleRegister = () => {
    // The Register component handles the actual registration
    // The redirect is handled in the AuthContext
  };

  return (
    <Register
      onRegister={handleRegister}
      onSwitchToLogin={() => window.location.href = '/login'}
    />
  );
}