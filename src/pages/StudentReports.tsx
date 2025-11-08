import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

const StudentReports = () => {
  const performanceData = [
    { month: "Jan", DBMS: 78, FEDF: 82, OOPS: 70, OS: 85, AIML: 75, "P&S": 80 },
    { month: "Feb", DBMS: 80, FEDF: 85, OOPS: 72, OS: 87, AIML: 76, "P&S": 82 },
    { month: "Mar", DBMS: 82, FEDF: 87, OOPS: 75, OS: 90, AIML: 78, "P&S": 85 },
    { month: "Apr", DBMS: 85, FEDF: 90, OOPS: 78, OS: 92, AIML: 80, "P&S": 88 },
  ];

  const comparisonData = [
    { subject: "DBMS", you: 85, average: 78 },
    { subject: "FEDF", you: 90, average: 82 },
    { subject: "OOPS", you: 78, average: 80 },
    { subject: "OS", you: 92, average: 85 },
    { subject: "AIML", you: 80, average: 77 },
    { subject: "P&S", you: 88, average: 83 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar variant="student" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Performance Reports</h1>
          <p className="text-muted-foreground">Detailed analytics and trends</p>
        </div>

        <div className="space-y-6">
          {/* Performance Trend Chart */}
          <Card className="shadow-elegant animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Performance Trend
              </CardTitle>
              <CardDescription>
                Your score progression across all subjects over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="DBMS" stroke="hsl(var(--primary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="FEDF" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  <Line type="monotone" dataKey="OOPS" stroke="hsl(var(--accent))" strokeWidth={2} />
                  <Line type="monotone" dataKey="OS" stroke="hsl(var(--success))" strokeWidth={2} />
                  <Line type="monotone" dataKey="AIML" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  <Line type="monotone" dataKey="P&S" stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Comparison Chart */}
          <Card className="shadow-elegant animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Performance Comparison
              </CardTitle>
              <CardDescription>
                Your scores vs class average
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="subject" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="you" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="average" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentReports;
