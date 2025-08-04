import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
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
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { OTPVerification } from "./OTPVerification";
import Link from "next/link";

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

interface RegisterFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Business Info
  businessName: string;
  businessType: string;
  businessAddress: string;
  businessPhone: string;
  website: string;
  // Agreement
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const { register, isLoading } = useAuth();

  const form = useForm<RegisterFormData>({
    defaultValues: {
      // Personal Info
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      // Business Info
      businessName: "",
      businessType: "",
      businessAddress: "",
      businessPhone: "",
      website: "",
      // Agreement
      agreeToTerms: false,
      agreeToMarketing: false,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  const businessTypes = [
    "Restaurant",
    "Retail Store",
    "Spa & Wellness",
    "Fitness & Gym",
    "Entertainment",
    "Travel & Tourism",
    "Professional Services",
    "Other",
  ];

  const validateStep = async (step: number) => {
    const fieldsToValidate = {
      1: [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ],
      2: ["businessName", "businessType", "businessAddress", "businessPhone"],
      3: ["agreeToTerms"],
    };

    const fields = fieldsToValidate[step as keyof typeof fieldsToValidate];
    const isValid = await trigger(fields as any);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    if (currentStep < 3) {
      handleNext();
      return;
    }

    setShowOTPVerification(true);
  };

  const handleOTPVerify = async (otp: string) => {
    setOtpLoading(true);
    try {
      // Simulate OTP verification and create account
      await register(watchedValues);
      onRegister();
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = () => {
    // Simulate resend OTP API call
    console.log("Resending OTP to:", watchedValues.email);
  };

  // Show OTP verification if account was created
  if (showOTPVerification) {
    return (
      <OTPVerification
        type="registration"
        email={watchedValues.email}
        onVerify={handleOTPVerify}
        onBack={() => setShowOTPVerification(false)}
        onResendOTP={handleResendOTP}
        isLoading={otpLoading}
      />
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="John"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lastName"
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Doe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
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
                        placeholder="john@example.com"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
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
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: (val: string) => {
                  if (watchedValues.password !== val) {
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
                        placeholder="Confirm your password"
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={control}
              name="businessName"
              rules={{ required: "Business name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Your Business Name"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="businessType"
              rules={{ required: "Business type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="businessAddress"
              rules={{ required: "Business address is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="123 Main St, City, State 12345"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="businessPhone"
              rules={{
                required: "Business phone is required",
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="website"
              rules={{
                pattern: {
                  value: /^https?:\/\/.+\..+/,
                  message: "Please enter a valid website URL",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://yourbusiness.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={control}
                name="agreeToTerms"
                rules={{ required: "You must agree to the Terms of Service" }}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm leading-5">
                        I agree to the{" "}
                        <Button
                          variant="link"
                          className="px-0 h-auto text-sm"
                          type="button"
                        >
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button
                          variant="link"
                          className="px-0 h-auto text-sm"
                          type="button"
                        >
                          Privacy Policy
                        </Button>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="agreeToMarketing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm leading-5">
                        I would like to receive marketing emails about new
                        features and promotions
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Account Summary</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Name:</strong> {watchedValues.firstName}{" "}
                  {watchedValues.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {watchedValues.email}
                </p>
                <p>
                  <strong>Business:</strong> {watchedValues.businessName}
                </p>
                <p>
                  <strong>Type:</strong> {watchedValues.businessType}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    Email verification required
                  </h4>
                  <p className="text-sm text-blue-800 mt-1">
                    After creating your account, you'll receive a verification
                    code at <strong>{watchedValues.email}</strong> to complete
                    the setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join DealHub and start offering amazing deals
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Step {currentStep} of 3
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Business Information"}
              {currentStep === 3 && "Terms & Confirmation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {renderStepContent()}

                <div className="flex space-x-3">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {currentStep < 3
                      ? "Continue"
                      : isLoading
                      ? "Creating account..."
                      : "Create account"}
                  </Button>
                </div>
              </form>
            </Form>

            <Separator />

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
