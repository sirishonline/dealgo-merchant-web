import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ArrowLeft, Mail, CheckCircle, Lock, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Otp } from "./Otp";

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

interface EmailFormData {
  email: string;
}

interface PasswordResetFormData {
  newPassword: string;
  confirmPassword: string;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [currentStep, setCurrentStep] = useState<
    "email" | "otp" | "reset" | "success"
  >("email");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<EmailFormData>({
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<PasswordResetFormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setEmail(data.email);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("otp");
    }, 1000);
  };

  const handleOTPVerify = async (otp: string) => {
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("reset");
    }, 1000);
  };

  const handlePasswordReset = async (data: PasswordResetFormData) => {
    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep("success");
    }, 1000);
  };

  const handleResendOTP = () => {
    // Simulate resend OTP
    console.log("Resending OTP to:", email);
  };

  // Email step
  if (currentStep === "email") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&crop=center"
              alt="DealGo Logo"
              className="mx-auto h-12 w-12 rounded-lg"
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              No worries, we'll send you reset instructions
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Reset password
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email address and we'll send you a verification code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending code..." : "Send verification code"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={onBackToLogin}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to sign in
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // OTP verification step
  if (currentStep === "otp") {
    return (
      <Otp
        type="forgot-password"
        email={email}
        onVerify={handleOTPVerify}
        onBack={() => setCurrentStep("email")}
        onResendOTP={handleResendOTP}
        isLoading={isLoading}
      />
    );
  }

  // Password reset step
  if (currentStep === "reset") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&crop=center"
              alt="DealGo Logo"
              className="mx-auto h-12 w-12 rounded-lg"
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Set new password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create a strong password for your account
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                New password
              </CardTitle>
              <CardDescription className="text-center">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordReset)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    rules={{
                      required: "Please confirm your password",
                      validate: (val: string) => {
                        if (passwordForm.watch("newPassword") !== val) {
                          return "Passwords do not match";
                        }
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              className="pl-10 pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Updating password..." : "Update password"}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setCurrentStep("otp")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Success step
  if (currentStep === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&crop=center"
              alt="DealGo Logo"
              className="mx-auto h-12 w-12 rounded-lg"
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Password updated
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your password has been successfully updated
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <div>
                  <h3 className="font-medium">Password reset successful</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can now sign in with your new password
                  </p>
                </div>

                <Button onClick={onBackToLogin} className="w-full">
                  Continue to sign in
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
