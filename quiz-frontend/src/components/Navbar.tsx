import { Button } from "@/components/ui/button";
import { Brain, User } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">QuizMaster</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/browse">
            <Button variant="ghost">Browse Quizzes</Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost">Admin</Button>
          </Link>
          <Link to="/login">
            <Button className="bg-gradient-primary">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
