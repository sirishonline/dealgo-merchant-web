import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  BarChart3,
  PlusCircle,
  Package,
  TrendingUp,
  Search,
  Bell,
  Settings,
  User,
  Building,
  Lock,
  LogOut,
  ChevronDown,
  Gift,
  Home,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Create Deal",
    icon: PlusCircle,
    href: "/create-deal",
  },
  {
    title: "Manage Deals",
    icon: Package,
    href: "/manage-deals",
  },
  {
    title: "Analytics",
    icon: TrendingUp,
    href: "/analytics",
  },
  {
    title: "Deal Redemption",
    icon: Gift,
    href: "/deal-redemption",
  },
];

const accountMenuItems = [
  {
    title: "Personal Info",
    href: "/account/personal",
  },
  {
    title: "Business",
    href: "/account/business",
  },
  {
    title: "Password",
    href: "/account/password",
  },
  {
    title: "General",
    href: "/account/general",
  },
];

interface MerchantLayoutProps {
  children: React.ReactNode;
}

export function MerchantLayout({ children }: MerchantLayoutProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  const isActive = (href: string) => {
    return router.pathname === href;
  };

  const isAccountActive = () => {
    return router.pathname.startsWith("/account");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-3">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560472355-536de3962603?w=40&h=40&fit=crop&crop=center"
                alt="DealHub Logo"
                className="h-8 w-8 rounded"
              />
              <div>
                <h2 className="font-semibold">DealHub</h2>
                <p className="text-xs text-muted-foreground">Merchant Portal</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive(item.href)}>
                        <button
                          onClick={() => router.push(item.href)}
                          className="w-full flex items-center"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible open={accountOpen} onOpenChange={setAccountOpen}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full justify-between"
                          isActive={isAccountActive()}
                        >
                          <div className="flex items-center">
                            <User className="h-4 w-4" />
                            <span>My Account</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              accountOpen ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                    </SidebarMenuItem>
                    <CollapsibleContent>
                      <SidebarMenu className="ml-4 mt-1">
                        {accountMenuItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(item.href)}
                              size="sm"
                            >
                              <button
                                onClick={() => router.push(item.href)}
                                className="w-full text-left"
                              >
                                {item.title}
                              </button>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="justify-start h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                    <AvatarFallback>
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2 text-left flex-1">
                    <p className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.business?.name}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/account/personal")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/account/business")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  <span>Business</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/account/general")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 bg-background border-b flex items-center justify-between px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="md:hidden" />
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search deals, customers..."
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
