import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const quizzes = [
  {
    id: 1,
    title: "Mathematics Quiz",
    description: "Test your mathematical skills from basic to advanced",
    questions: 10,
    duration: 10,
    difficulty: "Mixed",
    category: "Math",
    topic: "math"
  },
  {
    id: 2,
    title: "Science Quiz",
    description: "Explore questions about physics, chemistry, and biology",
    questions: 10,
    duration: 10,
    difficulty: "Mixed",
    category: "Science",
    topic: "science"
  },
  {
    id: 3,
    title: "History Quiz",
    description: "Journey through important historical events and figures",
    questions: 10,
    duration: 10,
    difficulty: "Mixed",
    category: "History",
    topic: "history"
  },
  {
    id: 4,
    title: "Geography Quiz",
    description: "Test your knowledge of countries, capitals, and landmarks",
    questions: 10,
    duration: 10,
    difficulty: "Mixed",
    category: "Geography",
    topic: "geography"
  },
  {
    id: 5,
    title: "Technology Quiz",
    description: "Challenge yourself with questions about computers and innovation",
    questions: 10,
    duration: 10,
    difficulty: "Mixed",
    category: "Technology",
    topic: "technology"
  },
  {
    id: 6,
    title: "General Knowledge Quiz",
    description: "Test your knowledge across various topics and subjects",
    questions: 10,
    duration: 10,
    difficulty: "Mixed",
    category: "General",
    topic: "general"
  },
];

const Browse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Available Quizzes</h1>
          <p className="text-muted-foreground">Choose a quiz and test your knowledge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <Card 
              key={quiz.id} 
              className="p-6 hover:shadow-glow transition-all duration-300 border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {quiz.category}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground">{quiz.description}</p>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{quiz.questions} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{quiz.duration} min</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                onClick={() => navigate(`/quiz/${quiz.id}`, { 
                  state: { topic: quiz.topic, difficulty: '' }
                })}
              >
                Start Quiz
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;
