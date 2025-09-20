import { useState } from "react";
import { AlertTriangle, Clock, MapPin, Phone, CheckCircle, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/AdminSidebar";
import StatsCard from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";

const SOSMonitoring = () => {
  const { toast } = useToast();
  
  const stats = [
    {
      title: "Active Alerts",
      value: 2,
      description: "Currently being handled",
      icon: AlertTriangle,
      variant: "warning" as const
    },
    {
      title: "Resolved Today",
      value: 8,
      description: "Successfully handled",
      icon: CheckCircle,
      variant: "success" as const
    },
    {
      title: "Avg Response Time",
      value: "1.2min",
      description: "Below 2min target",
      icon: Clock,
      variant: "default" as const
    },
    {
      title: "Escalated to Police",
      value: 1,
      description: "Level 2 alerts today",
      icon: Phone,
      variant: "danger" as const
    }
  ];

  const activeAlerts = [
    {
      id: "SOS-2024-001",
      tourist: "John Smith",
      uvid: "UV-2024-001",
      bandId: "SB-001",
      zone: "Beach Area",
      alertTime: "2 minutes ago",
      priority: "High",
      level: 2,
      description: "Extended SOS activation - Both manager and police notified",
      responder: "Emergency Team Alpha",
      coordinates: "12.9716°N, 77.5946°E"
    },
    {
      id: "SOS-2024-002",
      tourist: "Maria Garcia",
      uvid: "UV-2024-002",
      bandId: "SB-002",
      zone: "Mountain Trail",
      alertTime: "8 minutes ago",
      priority: "Medium",
      level: 1,
      description: "Initial 5-second hold detected - Manager notified",
      responder: "Safety Officer Beta",
      coordinates: "12.9845°N, 77.6108°E"
    }
  ];

  const recentIncidents = [
    {
      id: "SOS-2024-050",
      tourist: "David Chen",
      uvid: "UV-2024-003",
      zone: "City Center",
      resolvedTime: "15 minutes ago",
      priority: "Low",
      level: 1,
      resolution: "False alarm - Tourist accidentally triggered device",
      responseTime: "45 seconds"
    },
    {
      id: "SOS-2024-049",
      tourist: "Alice Johnson",
      uvid: "UV-2024-004",
      zone: "Harbor View",
      resolvedTime: "1 hour ago",
      priority: "High",
      level: 2,
      resolution: "Medical assistance provided - Tourist recovered safely",
      responseTime: "2.1 minutes"
    },
    {
      id: "SOS-2024-048",
      tourist: "Bob Wilson",
      uvid: "UV-2024-005",
      zone: "Shopping District",
      resolvedTime: "2 hours ago",
      priority: "Medium",
      level: 1,
      resolution: "Tourist got lost - Guided back to main area",
      responseTime: "1.8 minutes"
    }
  ];

  const handleResolveAlert = (alertId: string, touristName: string) => {
    toast({
      title: "Alert Resolved",
      description: `SOS alert for ${touristName} has been marked as resolved.`,
      variant: "default"
    });
  };

  const handleEscalateAlert = (alertId: string, touristName: string) => {
    toast({
      title: "Alert Escalated",
      description: `SOS alert for ${touristName} has been escalated to authorities.`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
          <h1 className="text-2xl font-bold text-foreground">SOS Alerts & Incident Monitoring</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Two-Level Trigger System Explanation */}
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Two-Level SOS Trigger System</span>
              </CardTitle>
              <CardDescription>
                Understanding our escalation protocol for emergency situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-warning/20 rounded-lg border border-warning/40 shadow-soft">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-gradient-warning rounded-full shadow-sm"></div>
                    <span className="font-semibold text-warning">Level 1: Manager Alert</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    First 5-second hold triggers manager notification only. Suitable for minor issues or assistance requests.
                  </p>
                </div>
                <div className="p-4 bg-gradient-danger/20 rounded-lg border border-danger/40 shadow-soft">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-gradient-danger rounded-full shadow-sm animate-pulse"></div>
                    <span className="font-semibold text-danger">Level 2: Police + Manager</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Second 5-second hold (or continued press) escalates to both manager and police. For emergencies requiring immediate response.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Alerts</TabsTrigger>
              <TabsTrigger value="history">Incident History</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {/* Active Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-danger animate-pulse" />
                    <span>Active SOS Alerts</span>
                    <Badge variant="destructive" className="ml-2">
                      {activeAlerts.length} Active
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Real-time emergency alerts requiring immediate attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 border-2 border-danger/30 bg-gradient-to-r from-danger/10 to-danger/5 rounded-lg shadow-medium backdrop-blur-sm">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-lg">{alert.tourist}</span>
                              <Badge variant="outline">{alert.uvid}</Badge>
                               <Badge 
                                variant={alert.level === 2 ? "destructive" : "default"}
                                className={alert.level === 1 ? "bg-gradient-warning text-warning-foreground border-warning/50 shadow-md" : "bg-gradient-danger text-danger-foreground shadow-md"}
                              >
                                Level {alert.level}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{alert.zone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.alertTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{alert.responder}</span>
                              </div>
                              <div className="text-xs font-mono">
                                {alert.coordinates}
                              </div>
                            </div>
                            <p className="text-sm text-foreground mb-3">{alert.description}</p>
                          </div>
                           <Badge 
                             variant={alert.priority === "High" ? "destructive" : "default"}
                             className={alert.priority === "Medium" ? "bg-gradient-warning text-warning-foreground border-warning/50 shadow-md" : alert.priority === "High" ? "bg-gradient-danger text-danger-foreground shadow-md" : "bg-gradient-card border-primary/30 shadow-sm"}
                           >
                            {alert.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleResolveAlert(alert.id, alert.tourist)}
                            className="border-success text-success hover:bg-success hover:text-success-foreground"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Resolved
                          </Button>
                          {alert.level === 1 && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleEscalateAlert(alert.id, alert.tourist)}
                            >
                              <Phone className="h-4 w-4 mr-1" />
                              Escalate to Police
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <MapPin className="h-4 w-4 mr-1" />
                            View Location
                          </Button>
                        </div>
                      </div>
                    ))}
                    {activeAlerts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No active SOS alerts</p>
                        <p className="text-sm">All tourists are safe</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {/* Incident History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>Recent Incident History</span>
                  </CardTitle>
                  <CardDescription>
                    Previously resolved alerts and their outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentIncidents.map((incident) => (
                      <div key={incident.id} className="p-4 bg-secondary/30 rounded-lg border">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-medium">{incident.tourist}</span>
                              <Badge variant="outline">{incident.uvid}</Badge>
                              <Badge variant="secondary">Resolved</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{incident.zone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>Resolved {incident.resolvedTime}</span>
                              </div>
                            </div>
                            <p className="text-sm text-foreground">{incident.resolution}</p>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={incident.priority === "High" ? "destructive" : incident.priority === "Medium" ? "default" : "secondary"}
                              className={incident.priority === "Medium" ? "bg-warning/20 text-warning border-warning/30" : ""}
                            >
                              Level {incident.level}
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              Response: {incident.responseTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SOSMonitoring;