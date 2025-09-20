import { Shield, MapPin, AlertTriangle, BarChart3, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Monitor tourist locations in real-time with secure zone-based tracking"
    },
    {
      icon: AlertTriangle,
      title: "SOS Alerts",
      description: "Two-level emergency alert system with automatic escalation to authorities"
    },
    {
      icon: Users,
      title: "Tourist Entry & Exit Management",
      description: "Seamless registration with unique visit IDs and automated exit tracking"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive reports and insights for improved safety management"
    }
  ];

  const stats = [
    { value: "1,200+", label: "Tourists Protected" },
    { value: "99.8%", label: "Response Rate" },
    { value: "< 2 min", label: "Avg Response Time" },
    { value: "24/7", label: "Monitoring" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SafeTour</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Admin Login</Button>
            </Link>
            <Link to="/tourist-management">
              <Button variant="hero">
                Tourist Registration
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Tourist Safety Management" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Smart Safety Bands for Tourists
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Advanced tourist safety management system with real-time tracking, emergency alerts, 
            and comprehensive monitoring to ensure visitor safety and peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                Access Dashboard
              </Button>
            </Link>
            <Link to="/tourist-management">
              <Button size="lg" variant="outline">
                Register Tourists
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our system provides end-to-end safety management with cutting-edge technology 
              and real-time monitoring capabilities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-large transition-all duration-300 border-0 bg-gradient-card">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enhance Tourist Safety?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of destinations already using SafeTour for comprehensive safety management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="hero">
                Start Managing
              </Button>
            </Link>
            <Link to="/reports">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">SafeTour</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 SafeTour. Advanced Tourist Safety Management System.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;