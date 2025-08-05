import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Settings } from "lucide-react";

export default function GeneralSettingsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">General Settings</h1>
          <p className="text-muted-foreground">Configure general application preferences and settings.</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Application Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Email notifications</p>
                        <p className="text-xs text-muted-foreground">Receive email updates about your deals</p>
                      </div>
                      <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Push notifications</p>
                        <p className="text-xs text-muted-foreground">Get instant alerts for deal activities</p>
                      </div>
                      <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Display</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Theme</p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded">Light</button>
                        <button className="px-3 py-1 text-xs bg-muted rounded">Dark</button>
                        <button className="px-3 py-1 text-xs bg-muted rounded">System</button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Language</p>
                      <select className="w-full p-2 text-sm border rounded">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Advanced Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">API Access</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage API keys and integrations for your business.
                    </p>
                    <button className="text-sm text-primary hover:underline">
                      Configure API Settings
                    </button>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">Data Export</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download your deal data and customer information.
                    </p>
                    <button className="text-sm text-primary hover:underline">
                      Export Data
                    </button>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">Billing & Subscriptions</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Manage your subscription and payment methods.
                    </p>
                    <button className="text-sm text-primary hover:underline">
                      View Billing
                    </button>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">Account Security</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Configure two-factor authentication and security settings.
                    </p>
                    <button className="text-sm text-primary hover:underline">
                      Security Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}