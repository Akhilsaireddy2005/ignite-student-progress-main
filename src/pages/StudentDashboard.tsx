import { Navbar } from "@/components/Navbar";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, TrendingUp, Award, Target, Brain } from "lucide-react";
import { useState } from "react";

interface Subject {
  name: string;
  score: number;
  attendance: number;
  prediction: number;
}

const StudentDashboard = () => {
  const [subjects] = useState<Subject[]>([
    { name: "DBMS", score: 85, attendance: 92, prediction: 87 },
    { name: "FEDF", score: 90, attendance: 95, prediction: 92 },
    { name: "OOPS", score: 78, attendance: 88, prediction: 80 },
    { name: "OS", score: 92, attendance: 90, prediction: 91 },
    { name: "AIML", score: 80, attendance: 85, prediction: 82 },
    { name: "P&S", score: 88, attendance: 93, prediction: 90 },
  ]);

  const avgScore = Math.round(subjects.reduce((acc, s) => acc + s.score, 0) / subjects.length);
  const avgAttendance = Math.round(subjects.reduce((acc, s) => acc + s.attendance, 0) / subjects.length);
  const avgPrediction = Math.round(subjects.reduce((acc, s) => acc + s.prediction, 0) / subjects.length);

  const getPredictionColor = (prediction: number) => {
    if (prediction >= 90) return "text-success";
    if (prediction >= 75) return "text-accent";
    return "text-destructive";
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return "bg-success";
    if (value >= 75) return "bg-accent";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen">
      <Navbar variant="student" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Here's your academic performance overview</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Average Score"
            value={`${avgScore}%`}
            icon={Award}
            trend={avgScore >= 85 ? "up" : "down"}
            subtitle={avgScore >= 85 ? "Excellent!" : "Keep improving"}
          />
          <MetricCard
            title="Attendance"
            value={`${avgAttendance}%`}
            icon={Calendar}
            trend={avgAttendance >= 90 ? "up" : "down"}
            subtitle={avgAttendance >= 90 ? "Great attendance" : "Needs attention"}
          />
          <MetricCard
            title="Predicted Score"
            value={`${avgPrediction}%`}
            icon={Brain}
            trend="neutral"
            subtitle="AI Prediction"
          />
          <MetricCard
            title="Subjects"
            value={subjects.length}
            icon={BookOpen}
            trend="neutral"
            subtitle="Active courses"
          />
        </div>

        {/* Subject Performance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className="shadow-elegant hover:shadow-lg transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {subject.name}
                  </CardTitle>
                  <Badge variant={subject.score >= 85 ? "default" : "secondary"}>
                    {subject.score}%
                  </Badge>
                </div>
                <CardDescription>Current Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Score</span>
                    <span className="font-semibold">{subject.score}%</span>
                  </div>
                  <Progress value={subject.score} className={getProgressColor(subject.score)} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className="font-semibold">{subject.attendance}%</span>
                  </div>
                  <Progress value={subject.attendance} className={getProgressColor(subject.attendance)} />
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Predicted Next Score
                    </span>
                    <span className={`font-bold text-lg ${getPredictionColor(subject.prediction)}`}>
                      {subject.prediction}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insights Card */}
        <Card className="gradient-card shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>Personalized recommendations for improvement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10">
              <div className="h-2 w-2 rounded-full bg-success mt-2" />
              <div>
                <p className="font-medium">Excellent progress in FEDF and OS</p>
                <p className="text-sm text-muted-foreground">Keep up the great work! Your consistency is paying off.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10">
              <div className="h-2 w-2 rounded-full bg-accent mt-2" />
              <div>
                <p className="font-medium">Focus on OOPS improvement</p>
                <p className="text-sm text-muted-foreground">Consider extra practice sessions to boost your score.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium">Attendance goal achieved</p>
                <p className="text-sm text-muted-foreground">Maintain your {avgAttendance}% attendance rate for optimal learning.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
