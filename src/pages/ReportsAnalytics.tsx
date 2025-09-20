import { useState } from "react";
import { BarChart3, Download, Search, TrendingUp, Users, AlertTriangle, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import AdminSidebar from "@/components/AdminSidebar";
import StatsCard from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";

const ReportsAnalytics = () => {
  const { toast } = useToast();
  const [searchUVID, setSearchUVID] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const stats = [
    {
      title: "Total Tourists Today",
      value: 47,
      description: "Registered visitors",
      icon: Users,
      variant: "default" as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Active Tourists",
      value: 28,
      description: "Currently in system",
      icon: MapPin,
      variant: "success" as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "SOS Alerts Today",
      value: 5,
      description: "Emergency notifications",
      icon: AlertTriangle,
      variant: "warning" as const,
      trend: { value: 2, isPositive: false }
    },
    {
      title: "Avg Response Time",
      value: "1.4min",
      description: "Emergency response",
      icon: TrendingUp,
      variant: "success" as const,
      trend: { value: 15, isPositive: true }
    }
  ];

  const chartData = {
    touristsPerDay: [
      { day: "Jan 10", tourists: 32 },
      { day: "Jan 11", tourists: 45 },
      { day: "Jan 12", tourists: 38 },
      { day: "Jan 13", tourists: 52 },
      { day: "Jan 14", tourists: 41 },
      { day: "Jan 15", tourists: 47 },
      { day: "Jan 16", tourists: 39 }
    ],
    incidentsByType: [
      { type: "Minor", count: 15, color: "#10b981" },
      { type: "Severe", count: 8, color: "#f59e0b" },
      { type: "Resolved", count: 32, color: "#3b82f6" }
    ],
    alertsByZone: [
      { zone: "Beach Area", alerts: 12 },
      { zone: "Mountain Trail", alerts: 8 },
      { zone: "City Center", alerts: 15 },
      { zone: "Harbor View", alerts: 6 },
      { zone: "Shopping District", alerts: 9 }
    ]
  };

  const aiInsights = [
    {
      type: "warning",
      title: "Increased Activity in Beach Area",
      description: "25% more incidents reported in Beach Area compared to last month. Consider increasing patrol coverage.",
      action: "Deploy additional safety personnel during peak hours (10 AM - 4 PM)"
    },
    {
      type: "success",
      title: "Improved Response Times",
      description: "Average response time decreased by 15% this month, now at 1.4 minutes.",
      action: "Current protocols are effective. Maintain current staffing levels."
    },
    {
      type: "info",
      title: "Popular Tourist Zones",
      description: "City Center and Beach Area account for 60% of all tourist registrations.",
      action: "Consider expanding safety infrastructure in these high-traffic areas"
    }
  ];

  const handleDownloadReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report is being prepared for download.`,
      variant: "default"
    });
  };

  const handleSearchUVID = () => {
    if (!searchUVID) {
      toast({
        title: "Please enter a UVID",
        description: "Enter a valid UVID to search for tourist history.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Tourist History Retrieved",
      description: `Displaying complete visit history for ${searchUVID}`,
      variant: "default"
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="charts">Charts & Graphs</TabsTrigger>
              <TabsTrigger value="search">UVID Search</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Reports */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="h-5 w-5 text-primary" />
                      <span>Quick Reports</span>
                    </CardTitle>
                    <CardDescription>
                      Generate and download reports instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("Daily Summary")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Daily Summary Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("Tourist Activity")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Tourist Activity Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("SOS Incidents")}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      SOS Incidents Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => handleDownloadReport("Monthly Analytics")}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Monthly Analytics
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Summary</CardTitle>
                    <CardDescription>
                      Key metrics from the last 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                      <div>
                        <div className="font-medium text-success">New Registrations</div>
                        <div className="text-sm text-muted-foreground">Today</div>
                      </div>
                      <div className="text-2xl font-bold text-success">47</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                      <div>
                        <div className="font-medium text-warning">Active Alerts</div>
                        <div className="text-sm text-muted-foreground">Currently</div>
                      </div>
                      <div className="text-2xl font-bold text-warning">2</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                      <div>
                        <div className="font-medium text-primary">Peak Hour</div>
                        <div className="text-sm text-muted-foreground">Most active time</div>
                      </div>
                      <div className="text-lg font-bold text-primary">2:00 PM</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="charts" className="space-y-4">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Tourists per Day Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tourist Registrations (Last 7 Days)</CardTitle>
                    <CardDescription>
                      Daily registration trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Line Chart: Tourist Registrations</p>
                        <p className="text-sm">Interactive chart showing daily trends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Incidents by Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>SOS Incidents by Type</CardTitle>
                    <CardDescription>
                      Distribution of incident severity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Pie Chart: Incident Types</p>
                        <p className="text-sm">Visual breakdown of alert categories</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts by Location */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Alerts by Location/Zone</CardTitle>
                    <CardDescription>
                      Geographic distribution of SOS alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Bar Chart: Alerts by Zone</p>
                        <p className="text-sm">Comparative view of incident hotspots</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="search" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-primary" />
                    <span>Tourist History Search</span>
                  </CardTitle>
                  <CardDescription>
                    Search for complete visit history using Unique Visit ID (UVID)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Enter UVID (e.g., UV-2024-001)"
                      value={searchUVID}
                      onChange={(e) => setSearchUVID(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="hero"
                      onClick={handleSearchUVID}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search History
                    </Button>
                  </div>
                  
                  {/* Example search result */}
                  <div className="bg-secondary/30 rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">John Smith</span>
                        <Badge variant="outline">UV-2024-001</Badge>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Entry Time:</span>
                        <div>Jan 15, 2024 09:30 AM</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current Zone:</span>
                        <div>Beach Area</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Band ID:</span>
                        <div>SB-001</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SOS Events:</span>
                        <div>1 (Resolved)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>AI-Powered Insights</span>
                  </CardTitle>
                  <CardDescription>
                    Smart recommendations based on data analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      insight.type === 'warning' ? 'bg-warning/5 border-warning/20' :
                      insight.type === 'success' ? 'bg-success/5 border-success/20' :
                      'bg-primary/5 border-primary/20'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-1 rounded-full ${
                          insight.type === 'warning' ? 'bg-warning' :
                          insight.type === 'success' ? 'bg-success' :
                          'bg-primary'
                        }`}>
                          {insight.type === 'warning' ? <AlertTriangle className="h-3 w-3 text-white" /> :
                           insight.type === 'success' ? <TrendingUp className="h-3 w-3 text-white" /> :
                           <BarChart3 className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <p className="text-sm font-medium text-foreground">
                            <span className="text-muted-foreground">Recommendation:</span> {insight.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ReportsAnalytics;