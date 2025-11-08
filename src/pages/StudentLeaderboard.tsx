import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  attendance: number;
  prediction: number;
  initials: string;
}

const StudentLeaderboard = () => {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "LAKSHMI", score: 87, attendance: 90, prediction: 89, initials: "LM" },
    { rank: 2, name: "GNAVEEKA", score: 85.5, attendance: 92, prediction: 87, initials: "GK" },
    { rank: 3, name: "SIRI", score: 85, attendance: 88, prediction: 86, initials: "SR" },
    { rank: 4, name: "LUCKY", score: 83, attendance: 87, prediction: 84, initials: "LK" },
    { rank: 5, name: "KARAN", score: 80.8, attendance: 85, prediction: 82, initials: "KR" },
    { rank: 6, name: "SRI", score: 78, attendance: 82, prediction: 79, initials: "SR" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-accent" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-accent/20 to-accent/5";
      case 2:
        return "from-muted/40 to-muted/10";
      case 3:
        return "from-amber-500/20 to-amber-500/5";
      default:
        return "from-card to-card";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar variant="student" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank among your peers</p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Rankings based on overall performance and attendance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`p-6 bg-gradient-to-r ${getRankColor(entry.rank)} hover:bg-muted/20 transition-smooth animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-6">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(entry.rank)}
                    </div>

                    {/* Avatar */}
                    <Avatar className="h-14 w-14 border-2 border-primary">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
                        {entry.initials}
                      </AvatarFallback>
                    </Avatar>

                    {/* Name */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{entry.name}</h3>
                      <p className="text-sm text-muted-foreground">Student</p>
                    </div>

                    {/* Metrics */}
                    <div className="hidden md:flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Score</p>
                        <Badge variant="default" className="text-base px-3">
                          {entry.score}%
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                        <Badge variant="secondary" className="text-base px-3">
                          {entry.attendance}%
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Predicted
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-base px-3 ${
                            entry.prediction >= 85 ? "border-success text-success" : ""
                          }`}
                        >
                          {entry.prediction}%
                        </Badge>
                      </div>
                    </div>

                    {/* Mobile Metrics */}
                    <div className="md:hidden text-right">
                      <Badge variant="default" className="text-base mb-1">
                        {entry.score}%
                      </Badge>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>

                  {/* Mobile Additional Info */}
                  <div className="md:hidden mt-4 flex gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Attendance: </span>
                      <span className="font-semibold">{entry.attendance}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Predicted: </span>
                      <span className="font-semibold">{entry.prediction}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLeaderboard;
