import { Bell, Search, User, Shield, MapPin, AlertTriangle, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import StatsCard from "@/components/StatsCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Tourists",
      value: 127,
      description: "Currently in monitored areas",
      icon: Users,
      variant: "success" as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "SOS Alerts Today",
      value: 3,
      description: "2 resolved, 1 in progress",
      icon: AlertTriangle,
      variant: "warning" as const,
      trend: { value: 5, isPositive: false }
    },
    {
      title: "Resolved Alerts",
      value: 45,
      description: "This month",
      icon: Shield,
      variant: "success" as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Avg Response Time",
      value: "1.8min",
      description: "Under target of 2 minutes",
      icon: Clock,
      variant: "default" as const,
      trend: { value: 15, isPositive: true }
    }
  ];

  const recentAlerts = [
    {
      id: "SOS-001",
      tourist: "John Smith",
      uvid: "UV-2024-001",
      zone: "Beach Area",
      time: "2 minutes ago",
      priority: "High",
      status: "In Progress"
    },
    {
      id: "SOS-002",
      tourist: "Maria Garcia",
      uvid: "UV-2024-002",
      zone: "Mountain Trail",
      time: "15 minutes ago",
      priority: "Medium",
      status: "Resolved"
    },
    {
      id: "SOS-003",
      tourist: "David Chen",
      uvid: "UV-2024-003",
      zone: "City Center",
      time: "1 hour ago",
      priority: "Low",
      status: "Resolved"
    }
  ];

  const activeTourists = [
    { name: "Alice Johnson", uvid: "UV-2024-004", zone: "Museum District", status: "Active" },
    { name: "Bob Wilson", uvid: "UV-2024-005", zone: "Harbor View", status: "Active" },
    { name: "Carol Brown", uvid: "UV-2024-006", zone: "Shopping District", status: "Active" },
    { name: "Daniel Kim", uvid: "UV-2024-007", zone: "Beach Area", status: "Active" }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tourists, alerts..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-danger rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Map Placeholder */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Real-time Tourist Locations</span>
                </CardTitle>
                <CardDescription>
                  Current positions of active tourists in monitored zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/20 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Interactive Map Integration</p>
                    <p className="text-sm">Real-time tourist tracking visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent SOS Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span>Recent SOS Alerts</span>
                </CardTitle>
                <CardDescription>
                  Latest emergency alerts and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{alert.tourist}</span>
                          <Badge variant="outline" className="text-xs">
                            {alert.uvid}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {alert.zone} • {alert.time}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={alert.priority === "High" ? "destructive" : alert.priority === "Medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {alert.priority}
                        </Badge>
                        <Badge 
                          variant={alert.status === "Resolved" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Tourists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-success" />
                  <span>Active Tourists</span>
                </CardTitle>
                <CardDescription>
                  Currently tracked tourists in system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeTourists.map((tourist, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{tourist.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {tourist.uvid} • {tourist.zone}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                        {tourist.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;