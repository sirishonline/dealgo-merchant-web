import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Active Deals",
      value: "12",
      change: "+2 from last month",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Total Views",
      value: "3,247",
      change: "+12% from last week",
      icon: Eye,
      color: "text-blue-600"
    },
    {
      title: "Revenue",
      value: "$8,432",
      change: "+5% from last month",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Customers",
      value: "156",
      change: "+8 new this week",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const recentDeals = [
    {
      id: 1,
      title: "50% Off Spa Treatment",
      status: "active",
      views: 234,
      sold: 12,
      expires: "2025-08-15"
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Pizza",
      status: "active",
      views: 567,
      sold: 28,
      expires: "2025-08-20"
    },
    {
      id: 3,
      title: "Photography Session Deal",
      status: "draft",
      views: 0,
      sold: 0,
      expires: "2025-08-25"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{deal.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {deal.views} views
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {deal.sold} sold
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {deal.expires}
                    </span>
                  </div>
                </div>
                <Badge variant={deal.status === "active" ? "default" : "secondary"}>
                  {deal.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Create New Deal
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Eye className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Customer Reviews
            </Button>
            
            {/* Performance indicator */}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Goal Progress</span>
                <span>68%</span>
              </div>
              <Progress value={68} />
              <p className="text-xs text-muted-foreground mt-2">
                $6,800 of $10,000 monthly revenue goal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}