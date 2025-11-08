import { Navbar } from "@/components/Navbar";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, BookOpen, Award, Search } from "lucide-react";
import { useState } from "react";

interface Student {
  name: string;
  dbms: number;
  fedf: number;
  oops: number;
  os: number;
  aiml: number;
  ps: number;
  avgScore: number;
  avgAttendance: number;
  prediction: number;
}

const FacultyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<Student[]>([
    { name: "SRI", dbms: 85, fedf: 90, oops: 78, os: 92, aiml: 80, ps: 88, avgScore: 85.5, avgAttendance: 92, prediction: 87 },
    { name: "LAKSHMI", dbms: 88, fedf: 85, oops: 82, os: 90, aiml: 88, ps: 90, avgScore: 87, avgAttendance: 90, prediction: 89 },
    { name: "KARAN", dbms: 78, fedf: 82, oops: 85, os: 80, aiml: 75, ps: 85, avgScore: 80.8, avgAttendance: 85, prediction: 82 },
    { name: "GNAVEEKA", dbms: 90, fedf: 88, oops: 85, os: 92, aiml: 85, ps: 87, avgScore: 87.8, avgAttendance: 88, prediction: 89 },
    { name: "SIRI", dbms: 82, fedf: 87, oops: 80, os: 88, aiml: 83, ps: 90, avgScore: 85, avgAttendance: 87, prediction: 86 },
    { name: "LUCKY", dbms: 85, fedf: 80, oops: 78, os: 82, aiml: 80, ps: 85, avgScore: 81.7, avgAttendance: 84, prediction: 83 },
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const classAvgScore = Math.round(students.reduce((acc, s) => acc + s.avgScore, 0) / students.length);
  const classAvgAttendance = Math.round(students.reduce((acc, s) => acc + s.avgAttendance, 0) / students.length);
  const topPerformer = students.reduce((prev, current) => 
    (prev.avgScore > current.avgScore) ? prev : current
  );

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-accent";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen">
      <Navbar variant="faculty" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Faculty Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive student management and analytics</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Students"
            value={students.length}
            icon={Users}
            trend="neutral"
            subtitle="Active students"
          />
          <MetricCard
            title="Class Average"
            value={`${classAvgScore}%`}
            icon={Award}
            trend={classAvgScore >= 80 ? "up" : "down"}
            subtitle="Overall performance"
          />
          <MetricCard
            title="Attendance"
            value={`${classAvgAttendance}%`}
            icon={TrendingUp}
            trend={classAvgAttendance >= 85 ? "up" : "down"}
            subtitle="Class average"
          />
          <MetricCard
            title="Subjects"
            value={6}
            icon={BookOpen}
            trend="neutral"
            subtitle="Active courses"
          />
        </div>

        {/* Top Performer Alert */}
        <Card className="mb-6 gradient-card shadow-elegant animate-scale-in">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <p className="font-semibold">Top Performer</p>
                  <p className="text-sm text-muted-foreground">
                    {topPerformer.name} is leading with {topPerformer.avgScore}% average score
                  </p>
                </div>
              </div>
              <Badge variant="default" className="text-base px-4 py-2">
                {topPerformer.avgScore}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Student Table */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Detailed view of all students and their scores</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Name</TableHead>
                    <TableHead className="text-center">DBMS</TableHead>
                    <TableHead className="text-center">FEDF</TableHead>
                    <TableHead className="text-center">OOPS</TableHead>
                    <TableHead className="text-center">OS</TableHead>
                    <TableHead className="text-center">AIML</TableHead>
                    <TableHead className="text-center">P&S</TableHead>
                    <TableHead className="text-center">Avg Score</TableHead>
                    <TableHead className="text-center">Attendance</TableHead>
                    <TableHead className="text-center">Prediction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student, index) => (
                    <TableRow key={index} className="hover:bg-muted/50 transition-smooth">
                      <TableCell className="font-semibold">{student.name}</TableCell>
                      <TableCell className={`text-center ${getScoreColor(student.dbms)}`}>
                        {student.dbms}
                      </TableCell>
                      <TableCell className={`text-center ${getScoreColor(student.fedf)}`}>
                        {student.fedf}
                      </TableCell>
                      <TableCell className={`text-center ${getScoreColor(student.oops)}`}>
                        {student.oops}
                      </TableCell>
                      <TableCell className={`text-center ${getScoreColor(student.os)}`}>
                        {student.os}
                      </TableCell>
                      <TableCell className={`text-center ${getScoreColor(student.aiml)}`}>
                        {student.aiml}
                      </TableCell>
                      <TableCell className={`text-center ${getScoreColor(student.ps)}`}>
                        {student.ps}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={student.avgScore >= 85 ? "default" : "secondary"}>
                          {student.avgScore}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={student.avgAttendance >= 85 ? "default" : "outline"}>
                          {student.avgAttendance}%
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-center font-semibold ${getScoreColor(student.prediction)}`}>
                        {student.prediction}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
