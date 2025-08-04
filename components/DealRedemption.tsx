import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { 
  Gift, 
  Search, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  DollarSign,
  AlertCircle,
  Ticket
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Deal {
  id: string;
  title: string;
  businessName: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  description: string;
  validUntil: string;
  location: string;
  phone: string;
  image: string;
  terms: string[];
  isRedeemed?: boolean;
  redeemedAt?: string;
}

export function DealRedemption() {
  const [dealCode, setDealCode] = useState("");
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock deal data
  const mockDeal: Deal = {
    id: "DEAL123",
    title: "50% Off Premium Spa Treatment Package",
    businessName: "Serenity Spa & Wellness",
    originalPrice: 200,
    discountedPrice: 100,
    discount: 50,
    description: "Indulge in our premium spa package including a 60-minute Swedish massage, facial treatment, and access to our relaxation lounge. Perfect for unwinding and rejuvenating your mind and body.",
    validUntil: "2025-08-15",
    location: "123 Wellness Street, Downtown, CA 90210",
    phone: "+1 (555) 987-6543",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop",
    terms: [
      "Valid for new customers only",
      "Must book appointment 24 hours in advance",
      "Cannot be combined with other offers",
      "Valid Monday-Thursday only",
      "Subject to availability"
    ]
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealCode.trim()) return;

    setIsLoading(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock validation - check if code matches
      if (dealCode.toUpperCase() === "DEAL123" || dealCode.toUpperCase() === "SPA50OFF") {
        setDeal(mockDeal);
      } else {
        setError("Invalid deal code. Please check your code and try again.");
        setDeal(null);
      }
    }, 1000);
  };

  const handleRedeem = async () => {
    if (!deal) return;
    
    setIsLoading(true);
    
    // Simulate redemption API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setDeal({
        ...deal,
        isRedeemed: true,
        redeemedAt: new Date().toISOString()
      });
    }, 1000);
  };

  const resetForm = () => {
    setDealCode("");
    setDeal(null);
    setError("");
    setShowSuccess(false);
  };

  if (showSuccess && deal?.isRedeemed) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Deal Redemption</h1>
          <p className="text-muted-foreground">Customer deal redemption portal</p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                  <div>
                    <h2 className="text-xl font-semibold">Deal Redeemed Successfully!</h2>
                    <p className="text-muted-foreground mt-2">
                      Your deal has been activated. Show this confirmation to the merchant.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                    <div className="space-y-2">
                      <p className="font-medium text-green-900">{deal.title}</p>
                      <p className="text-sm text-green-800">{deal.businessName}</p>
                      <p className="text-sm text-green-700">
                        Redeemed: {new Date(deal.redeemedAt!).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={resetForm} className="w-full">
                      Redeem Another Deal
                    </Button>
                    <Button variant="outline" className="w-full">
                      Print Confirmation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Deal Redemption</h1>
        <p className="text-muted-foreground">Help customers redeem their deal codes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Search Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ticket className="mr-2 h-5 w-5" />
                Enter Deal Code
              </CardTitle>
              <CardDescription>
                Enter the customer's unique deal code to validate and redeem their offer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dealCode">Deal Code</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dealCode"
                      placeholder="Enter deal code (e.g., DEAL123)"
                      className="pl-10 uppercase"
                      value={dealCode}
                      onChange={(e) => setDealCode(e.target.value.toUpperCase())}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading || !dealCode.trim()}>
                  {isLoading ? "Validating..." : "Validate Deal"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sample Codes for Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Demo Codes</CardTitle>
              <CardDescription>
                Use these sample codes for testing the redemption system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="font-mono text-sm">DEAL123</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setDealCode("DEAL123")}
                  >
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="font-mono text-sm">SPA50OFF</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setDealCode("SPA50OFF")}
                  >
                    Use
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deal Details Section */}
        <div>
          {deal ? (
            <Card>
              <div className="relative">
                <ImageWithFallback
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-600 text-white">
                    {deal.discount}% OFF
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{deal.title}</h3>
                    <p className="text-muted-foreground">{deal.businessName}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold">${deal.discountedPrice}</span>
                      <span className="text-muted-foreground line-through">${deal.originalPrice}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{deal.description}</p>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Valid Until</p>
                        <p className="text-sm text-muted-foreground">{deal.validUntil}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{deal.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Contact</p>
                        <p className="text-sm text-muted-foreground">{deal.phone}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Terms & Conditions</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {deal.terms.map((term, index) => (
                        <li key={index}>• {term}</li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleRedeem}
                    disabled={isLoading || deal.isRedeemed}
                  >
                    {isLoading ? "Processing..." : deal.isRedeemed ? "Already Redeemed" : "Redeem Deal"}
                  </Button>

                  {!deal.isRedeemed && (
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        Once redeemed, this deal cannot be used again. Confirm with the customer before processing.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Gift className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No deal selected</h3>
                <p className="mt-2 text-muted-foreground">
                  Enter a valid deal code to see the details and process the redemption.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}