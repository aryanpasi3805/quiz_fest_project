import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, CheckCircle, XCircle, Home, MinusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, answers, questions } = location.state || { 
    score: 0, 
    total: 0, 
    answers: [], 
    questions: [] 
  };

  const percentage = (score / total) * 100;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "Outstanding!", color: "text-green-500" };
    if (percentage >= 75) return { text: "Great Job!", color: "text-blue-500" };
    if (percentage >= 60) return { text: "Good Effort!", color: "text-yellow-500" };
    return { text: "Keep Practicing!", color: "text-orange-500" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-background py-12 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Confetti Effect for High Scores */}
        {percentage >= 75 && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-5%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Results Header */}
        <Card className="p-8 mb-6 text-center animate-bounce-in shadow-glow border-2">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary mb-4 animate-float shadow-glow">
              <Trophy className="h-12 w-12 text-white animate-pulse" />
            </div>
            <h1 className={`text-5xl font-bold mb-2 ${performance.color} animate-scale-in`}>
              {performance.text}
            </h1>
            <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
              You've completed the quiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-secondary rounded-lg animate-slide-in-right hover:scale-105 transition-transform duration-300 border border-primary/20" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl font-bold text-primary mb-1 animate-scale-in" style={{ animationDelay: "0.4s" }}>{score}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
            <div className="p-6 bg-secondary rounded-lg animate-slide-in-right hover:scale-105 transition-transform duration-300 border border-foreground/20" style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl font-bold text-foreground mb-1 animate-scale-in" style={{ animationDelay: "0.5s" }}>{total}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            <div className="p-6 bg-secondary rounded-lg animate-slide-in-right hover:scale-105 transition-transform duration-300 border border-accent/20" style={{ animationDelay: "0.5s" }}>
              <div className="text-4xl font-bold text-accent mb-1 animate-scale-in" style={{ animationDelay: "0.6s" }}>{percentage.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>

          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <div className="relative overflow-hidden rounded-full h-4 mb-2 bg-secondary">
              <Progress 
                value={percentage} 
                className="h-4 transition-all duration-1000 ease-out animate-shimmer"
                style={{
                  background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)`,
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">Overall Performance</p>
          </div>

          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button 
              onClick={() => navigate("/browse")} 
              className="bg-gradient-primary hover:scale-105 transition-transform duration-300 shadow-glow"
            >
              Try Another Quiz
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="hover:scale-105 transition-transform duration-300"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </Card>

        {/* Detailed Answers */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-6 animate-slide-in-right" style={{ animationDelay: "0.9s" }}>
            Answer Review
          </h2>
          {questions.map((question: any, index: number) => {
            const userAnswer = answers[index];
            const isSkipped = userAnswer === null;
            const isCorrect = !isSkipped && userAnswer === question.correctAnswer;

            return (
              <Card 
                key={index} 
                className={`p-6 animate-fade-in hover:shadow-glow transition-all duration-300 hover:scale-[1.02] ${
                  isCorrect 
                    ? 'border-green-500/30' 
                    : isSkipped 
                    ? 'border-yellow-500/30' 
                    : 'border-red-500/30'
                } border-2`}
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-full animate-bounce-in ${
                    isCorrect 
                      ? 'bg-green-100 dark:bg-green-900/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                      : isSkipped
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                      : 'bg-red-100 dark:bg-red-900/30 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  }`}
                  style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                  >
                    {isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : isSkipped ? (
                      <MinusCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-4">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option: string, optIndex: number) => (
                        <div
                          key={optIndex}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            optIndex === question.correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-[0_0_15px_rgba(34,197,94,0.2)] animate-pulse'
                              : optIndex === userAnswer && isSkipped
                              ? 'border-border bg-secondary hover:bg-muted'
                              : optIndex === userAnswer && !isCorrect
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                              : 'border-border bg-secondary hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option}</span>
                            {optIndex === question.correctAnswer && (
                              <span className="text-xs font-bold text-green-600 dark:text-green-400 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/50 animate-slide-in-right">
                                ✓ Correct Answer
                              </span>
                            )}
                            {optIndex === userAnswer && !isCorrect && !isSkipped && (
                              <span className="text-xs font-bold text-red-600 dark:text-red-400 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/50 animate-slide-in-right">
                                ✗ Your Answer
                              </span>
                            )}
                            {isSkipped && optIndex === 0 && index === 0 && null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
