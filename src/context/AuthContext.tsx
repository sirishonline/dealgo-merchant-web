import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from "../graphql/auth";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  business?: {
    id: string;
    name: string;
    type: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);
  const [getMe] = useLazyQuery(ME_QUERY);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const { data } = await getMe();
        if (data?.me) {
          setUser(data.me);
        } else {
          localStorage.removeItem("auth_token");
        }
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
      localStorage.removeItem("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await loginMutation({
        variables: {
          input: { email, password },
        },
      });

      if (data?.login) {
        const { user, token } = data.login;
        setUser(user);
        localStorage.setItem("auth_token", token);
        router.push("/dashboard");
      }
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const { data } = await registerMutation({
        variables: {
          input: {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            businessName: userData.businessName,
            businessType: userData.businessType,
            businessEmail: userData.businessEmail,
            businessPhone: userData.businessPhone,
            businessAddress: userData.businessAddress,
            website: userData.website,
          },
        },
      });

      if (data?.register) {
        const { user, token } = data.register;
        setUser(user);
        localStorage.setItem("auth_token", token);
        router.push("/dashboard");
      }
    } catch (error: any) {
      throw new Error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
