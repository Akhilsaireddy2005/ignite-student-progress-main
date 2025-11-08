import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Users, BarChart3, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI-powered predictions for student performance and attendance trends",
    },
    {
      icon: Users,
      title: "Student Management",
      description: "Comprehensive student profiles with detailed academic tracking",
    },
    {
      icon: BarChart3,
      title: "Visual Reports",
      description: "Beautiful charts and insights to track progress over time",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security to protect your educational data",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live synchronization across all devices and users",
    },
    {
      icon: GraduationCap,
      title: "Subject Tracking",
      description: "Monitor performance across multiple subjects with ease",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar variant="landing" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center animate-fade-in">
            <h1 className="mb-6 text-5xl md:text-7xl font-bold leading-tight">
              Transform Educational
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Analytics & Insights
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg md:text-xl text-muted-foreground">
              Empower students and faculty with intelligent performance tracking, predictive analytics,
              and comprehensive reporting tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/student/dashboard")}
                className="transition-smooth hover:scale-105 shadow-elegant"
              >
                Student Sign In
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/faculty/dashboard")}
                className="transition-smooth hover:scale-105"
              >
                Faculty Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features designed for modern education management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="gradient-card shadow-elegant hover:shadow-lg transition-smooth hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="gradient-hero text-primary-foreground shadow-elegant">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of students and educators using EduInsight to achieve academic excellence
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="transition-smooth hover:scale-105"
              >
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-semibold">EduInsight</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EduInsight. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
