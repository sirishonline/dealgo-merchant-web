import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter
} from "lucide-react";

export function Analytics() {
  const overallStats = [
    {
      title: "Total Revenue",
      value: "$12,847",
      change: "+15.3%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Total Views",
      value: "8,234",
      change: "+23.1%",
      trend: "up",
      period: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.4%",
      trend: "down",
      period: "vs last month"
    },
    {
      title: "Avg Deal Value",
      value: "$67",
      change: "+8.7%",
      trend: "up",
      period: "vs last month"
    }
  ];

  const topPerformingDeals = [
    {
      title: "Buy 1 Get 1 Free Gourmet Pizza",
      category: "Food & Dining",
      revenue: "$1,125",
      views: 2156,
      sold: 45,
      conversionRate: 2.1
    },
    {
      title: "50% Off Premium Spa Treatment",
      category: "Beauty & Spa",
      revenue: "$2,300",
      views: 1247,
      sold: 23,
      conversionRate: 1.8
    },
    {
      title: "Yoga Class Package - 10 Sessions",
      category: "Health & Fitness",
      revenue: "$1,080",
      views: 834,
      sold: 12,
      conversionRate: 1.4
    }
  ];

  const recentActivity = [
    { type: "sale", message: "New purchase: 50% Off Spa Treatment", time: "2 minutes ago" },
    { type: "view", message: "Your Pizza deal was viewed 25 times", time: "15 minutes ago" },
    { type: "milestone", message: "Spa Treatment reached 20 sales", time: "1 hour ago" },
    { type: "sale", message: "New purchase: Yoga Class Package", time: "2 hours ago" },
    { type: "view", message: "Photography Session deal was viewed 12 times", time: "3 hours ago" }
  ];

  const monthlyGoals = [
    { goal: "Revenue Target", current: 12847, target: 15000, percentage: 86 },
    { goal: "New Customers", current: 156, target: 200, percentage: 78 },
    { goal: "Deal Views", current: 8234, target: 10000, percentage: 82 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-muted-foreground">Track your deal performance and business metrics.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingDeals.map((deal, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium line-clamp-1">{deal.title}</p>
                    <p className="text-sm text-muted-foreground">{deal.category}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {deal.views}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {deal.sold} sold
                      </span>
                      <span>{deal.conversionRate}% CR</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{deal.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {monthlyGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={goal.percentage} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{goal.percentage}% complete</span>
                    <span>{goal.target - goal.current} remaining</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "sale" ? "bg-green-500" :
                  activity.type === "view" ? "bg-blue-500" :
                  "bg-purple-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}