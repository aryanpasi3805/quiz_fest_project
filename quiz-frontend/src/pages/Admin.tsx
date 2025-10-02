import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, BookOpen, BarChart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { toast } from "sonner";

const Admin = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      category: "Geography",
      difficulty: "Easy",
    },
  ]);

  const handleAddQuestion = () => {
    toast.success("Question added successfully!");
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast.success("Question deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage quizzes and question bank</p>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="questions">
              <BookOpen className="h-4 w-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="add">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
          </TabsList>

          {/* Question Bank */}
          <TabsContent value="questions" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Question Bank</h2>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <Card key={q.id} className="p-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary">
                            {q.category}
                          </span>
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-secondary">
                            {q.difficulty}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-2">{q.question}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {q.options.map((option, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded ${
                                idx === q.correctAnswer ? 'bg-green-100 dark:bg-green-900/30 font-medium' : 'bg-secondary'
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteQuestion(q.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Add New Question */}
          <TabsContent value="add">
            <Card className="p-6 max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Add New Question</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAddQuestion(); }}>
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter your question..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="option1">Option 1</Label>
                    <Input id="option1" placeholder="First option" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option2">Option 2</Label>
                    <Input id="option2" placeholder="Second option" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option3">Option 3</Label>
                    <Input id="option3" placeholder="Third option" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option4">Option 4</Label>
                    <Input id="option4" placeholder="Fourth option" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correct">Correct Answer</Label>
                    <Select>
                      <SelectTrigger id="correct">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Option 1</SelectItem>
                        <SelectItem value="1">Option 2</SelectItem>
                        <SelectItem value="2">Option 3</SelectItem>
                        <SelectItem value="3">Option 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Statistics */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 animate-fade-in">
                <div className="text-3xl font-bold text-primary mb-2">150</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </Card>
              <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl font-bold text-accent mb-2">1,234</div>
                <div className="text-sm text-muted-foreground">Quiz Attempts</div>
              </Card>
              <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-foreground mb-2">78%</div>
                <div className="text-sm text-muted-foreground">Avg Success Rate</div>
              </Card>
            </div>

            <Card className="p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div>
                      <div className="font-medium">User completed "General Knowledge Quiz"</div>
                      <div className="text-sm text-muted-foreground">Score: 85% • 2 hours ago</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">17/20</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
