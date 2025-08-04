import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ArrowLeft, CheckCircle, Clock, RefreshCw, Mail, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface OTPVerificationProps {
  type: "registration" | "forgot-password";
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResendOTP?: () => void;
  isLoading?: boolean;
}

export function OTPVerification({ 
  type, 
  email, 
  onVerify, 
  onBack, 
  onResendOTP,
  isLoading = false 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  const handleResend = async () => {
    if (!canResend || !onResendOTP) return;
    
    setResendLoading(true);
    setCanResend(false);
    setCountdown(60);
    
    // Simulate API call
    setTimeout(() => {
      setResendLoading(false);
      if (onResendOTP) onResendOTP();
    }, 1000);
  };

  const getTitle = () => {
    switch (type) {
      case "registration":
        return "Verify your email";
      case "forgot-password":
        return "Enter verification code";
      default:
        return "Verify your account";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "registration":
        return "We've sent a 6-digit verification code to your email address to complete your account setup.";
      case "forgot-password":
        return "We've sent a 6-digit verification code to your email address to reset your password.";
      default:
        return "Enter the verification code we sent to your email.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&crop=center"
            alt="DealHub Logo"
            className="mx-auto h-12 w-12 rounded-lg"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{getTitle()}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {getDescription()}
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Enter verification code</CardTitle>
            <CardDescription className="text-center">
              Code sent to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={setOtp}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-3">
                    <Clock className="h-4 w-4" />
                    <span>
                      {canResend ? "Code expired" : `Resend code in ${countdown}s`}
                    </span>
                  </div>
                  
                  <Button
                    type="button"
                    variant="link"
                    className="px-0"
                    onClick={handleResend}
                    disabled={!canResend || resendLoading}
                  >
                    {resendLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Resend code
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </form>

            <Alert>
              <MessageSquare className="h-4 w-4" />
              <AlertDescription>
                Didn't receive the code? Check your spam folder or contact support if the issue persists.
              </AlertDescription>
            </Alert>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}