import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Pause,
  Play,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Deal {
  id: string;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  status: "active" | "paused" | "expired" | "draft" | "sent_for_approval" | "rejected";
  views: number;
  sold: number;
  maxQuantity: number;
  validUntil: string;
  image: string;
  rejectionReason?: string;
}

export function ManageDeals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const deals: Deal[] = [
    {
      id: "1",
      title: "50% Off Premium Spa Treatment Package",
      category: "Beauty & Spa",
      originalPrice: 200,
      discountedPrice: 100,
      discount: 50,
      status: "active",
      views: 1247,
      sold: 23,
      maxQuantity: 50,
      validUntil: "2025-08-15",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Buy 1 Get 1 Free Gourmet Pizza",
      category: "Food & Dining",
      originalPrice: 25,
      discountedPrice: 25,
      discount: 50,
      status: "active",
      views: 2156,
      sold: 45,
      maxQuantity: 100,
      validUntil: "2025-08-20",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      title: "Professional Photography Session",
      category: "Services",
      originalPrice: 300,
      discountedPrice: 150,
      discount: 50,
      status: "sent_for_approval",
      views: 0,
      sold: 0,
      maxQuantity: 20,
      validUntil: "2025-08-25",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      title: "Yoga Class Package - 10 Sessions",
      category: "Health & Fitness",
      originalPrice: 150,
      discountedPrice: 90,
      discount: 40,
      status: "paused",
      views: 834,
      sold: 12,
      maxQuantity: 30,
      validUntil: "2025-08-30",
      image: "https://images.unsplash.com/photo-1506629905738-4e1f65fcbde0?w=400&h=300&fit=crop"
    },
    {
      id: "5",
      title: "Weekend Getaway Special",
      category: "Travel",
      originalPrice: 400,
      discountedPrice: 250,
      discount: 38,
      status: "expired",
      views: 3421,
      sold: 18,
      maxQuantity: 25,
      validUntil: "2025-07-31",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
    },
    {
      id: "6",
      title: "Luxury Car Detailing Service",
      category: "Services",
      originalPrice: 180,
      discountedPrice: 90,
      discount: 50,
      status: "rejected",
      views: 0,
      sold: 0,
      maxQuantity: 15,
      validUntil: "2025-08-28",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      rejectionReason: "Deal description needs more detail about services included"
    },
    {
      id: "7",
      title: "Wine Tasting Experience",
      category: "Food & Dining",
      originalPrice: 80,
      discountedPrice: 40,
      discount: 50,
      status: "draft",
      views: 0,
      sold: 0,
      maxQuantity: 25,
      validUntil: "2025-09-01",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8b?w=400&h=300&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "paused": return "secondary";
      case "expired": return "destructive";
      case "draft": return "outline";
      case "sent_for_approval": return "secondary";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Play className="h-3 w-3" />;
      case "paused": return <Pause className="h-3 w-3" />;
      case "expired": return <Calendar className="h-3 w-3" />;
      case "draft": return <Edit className="h-3 w-3" />;
      case "sent_for_approval": return <Clock className="h-3 w-3" />;
      case "rejected": return <XCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "sent_for_approval": return "Pending Review";
      case "rejected": return "Rejected";
      default: return status;
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || deal.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getTabCounts = () => {
    return {
      all: deals.length,
      active: deals.filter(d => d.status === "active").length,
      draft: deals.filter(d => d.status === "draft").length,
      paused: deals.filter(d => d.status === "paused").length,
      expired: deals.filter(d => d.status === "expired").length,
      sent_for_approval: deals.filter(d => d.status === "sent_for_approval").length,
      rejected: deals.filter(d => d.status === "rejected").length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">My Deals</h1>
          <p className="text-muted-foreground">Manage and monitor your deal performance.</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Create New Deal
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals by title or category..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value="active">Active ({tabCounts.active})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({tabCounts.draft})</TabsTrigger>
          <TabsTrigger value="sent_for_approval">Pending ({tabCounts.sent_for_approval})</TabsTrigger>
          <TabsTrigger value="paused">Paused ({tabCounts.paused})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({tabCounts.rejected})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({tabCounts.expired})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={getStatusColor(deal.status)} className="flex items-center gap-1">
                      {getStatusIcon(deal.status)}
                      {getStatusLabel(deal.status)}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {deal.status !== "sent_for_approval" && deal.status !== "rejected" && (
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Deal
                          </DropdownMenuItem>
                        )}
                        {deal.status === "active" && (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause Deal
                          </DropdownMenuItem>
                        )}
                        {deal.status === "paused" && (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Resume Deal
                          </DropdownMenuItem>
                        )}
                        {(deal.status === "draft" || deal.status === "rejected") && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Submit for Review
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Deal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-2">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground">{deal.category}</p>
                    </div>

                    {/* Rejection reason for rejected deals */}
                    {deal.status === "rejected" && deal.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-sm text-red-800">
                          <strong>Rejection reason:</strong> {deal.rejectionReason}
                        </p>
                      </div>
                    )}

                    {/* Pending message for deals under review */}
                    {deal.status === "sent_for_approval" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          Your deal is being reviewed by our team. You'll be notified once it's approved.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold">${deal.discountedPrice}</span>
                          <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                          <Badge variant="secondary" className="text-xs">
                            {deal.discount}% off
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-sm font-medium">{deal.views}</p>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{deal.sold}</p>
                        <p className="text-xs text-muted-foreground">Sold</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{deal.maxQuantity - deal.sold}</p>
                        <p className="text-xs text-muted-foreground">Left</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Expires {deal.validUntil}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No deals found</h3>
              <p className="mt-2 text-muted-foreground">
                {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first deal"}
              </p>
              {!searchQuery && (
                <Button className="mt-4">
                  Create Your First Deal
                </Button>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}