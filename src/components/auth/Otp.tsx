import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Clock, RefreshCw, Mail, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/lib/graphql/generated";
import router from "next/router";
import OuterLayout from "../layouts/OuterLayout";
import { toast } from "sonner";

export function Otp() {
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [canResend, setCanResend] = useState(false);

  const [resendOtp, { loading: resendLoading }] = useResendOtpMutation();
  const [otp, { loading, error }] = useVerifyOtpMutation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await otp({
        variables: {
          input: {
            otp: otpCode,
          },
        },
      });

      const isValid = res.data?.verifyOtp;
      if (isValid) {
        router.push("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.message) {
        toast.error(error?.message ?? "Unknown error");
      }
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setCountdown(60);

    resendOtp();
  };

  return (
    <OuterLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&crop=center"
              alt="DealGo Logo"
              className="mx-auto h-12 w-12 rounded-lg"
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              OTP Verification
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter the 6-digit OTP sent to your email address to
              complete your registration.
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Enter verification code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otpCode}
                      onChange={setOtpCode}
                      disabled={loading}
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
                        {canResend
                          ? "Code expired"
                          : `Resend code in ${countdown}s`}
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
                  disabled={otpCode.length !== 6 || loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </form>

              <Alert>
                <MessageSquare className="h-4 w-4" />
                <AlertDescription>
                  Didn't receive the code? Check your spam folder or contact
                  support if the issue persists.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </OuterLayout>
  );
}
