import { GraduationCap } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "@/components/ui/button";
import { NavLink } from "./NavLink";

interface NavbarProps {
  variant?: "landing" | "student" | "faculty";
}

export const Navbar = ({ variant = "landing" }: NavbarProps) => {
  return (
    <nav className="glass-effect sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduInsight
            </span>
          </NavLink>

          <div className="flex items-center gap-4">
            {variant === "student" && (
              <>
                <NavLink
                  to="/student/dashboard"
                  className="text-sm font-medium hover:text-primary transition-smooth"
                  activeClassName="text-primary"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/student/leaderboard"
                  className="text-sm font-medium hover:text-primary transition-smooth"
                  activeClassName="text-primary"
                >
                  Leaderboard
                </NavLink>
                <NavLink
                  to="/student/reports"
                  className="text-sm font-medium hover:text-primary transition-smooth"
                  activeClassName="text-primary"
                >
                  Reports
                </NavLink>
              </>
            )}

            {variant === "faculty" && (
              <>
                <NavLink
                  to="/faculty/dashboard"
                  className="text-sm font-medium hover:text-primary transition-smooth"
                  activeClassName="text-primary"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/faculty/students"
                  className="text-sm font-medium hover:text-primary transition-smooth"
                  activeClassName="text-primary"
                >
                  Students
                </NavLink>
                <NavLink
                  to="/faculty/reports"
                  className="text-sm font-medium hover:text-primary transition-smooth"
                  activeClassName="text-primary"
                >
                  Reports
                </NavLink>
              </>
            )}

            <DarkModeToggle />

            {variant === "landing" && (
              <Button variant="default" className="transition-smooth hover:scale-105">
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
