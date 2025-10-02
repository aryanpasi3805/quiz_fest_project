import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Timer } from "@/components/Timer";
import { QuestionCard } from "@/components/QuestionCard";
import { toast } from "sonner";

// Mock question generator with correct answers
const questionsByTopic: Record<string, Array<{text: string, options: string[], correct: number}>> = {
  math: [
    { text: "What is 2+2?", options: ["3", "4", "5", "6"], correct: 1 },
    { text: "What is 5*6?", options: ["11", "30", "56", "60"], correct: 1 },
    { text: "What is 12/4?", options: ["2", "3", "4", "6"], correct: 1 },
    { text: "What is 15-7?", options: ["6", "7", "8", "9"], correct: 2 },
    { text: "What is 3^2?", options: ["6", "9", "12", "15"], correct: 1 },
    { text: "What is integral of x dx?", options: ["x", "x^2/2 + C", "2x", "ln x"], correct: 1 },
    { text: "What is the square root of 144?", options: ["10", "11", "12", "13"], correct: 2 },
    { text: "What is 25% of 200?", options: ["25", "50", "75", "100"], correct: 1 },
    { text: "Solve: 2x + 5 = 15", options: ["x=5", "x=10", "x=7.5", "x=20"], correct: 0 },
    { text: "What is derivative of sin(x)?", options: ["cos(x)", "-sin(x)", "sin(x)", "-cos(x)"], correct: 0 },
  ],
  science: [
    { text: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 1 },
    { text: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correct: 1 },
    { text: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "H2O2"], correct: 0 },
    { text: "What is the boiling point of water?", options: ["90°C", "95°C", "100°C", "105°C"], correct: 2 },
    { text: "Which organ pumps blood?", options: ["Liver", "Lungs", "Heart", "Kidney"], correct: 2 },
    { text: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0 },
    { text: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correct: 1 },
    { text: "What is photosynthesis?", options: ["Animal respiration", "Plant food production", "Cell division", "Protein synthesis"], correct: 1 },
    { text: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"], correct: 1 },
    { text: "What is the pH of pure water?", options: ["6", "7", "8", "9"], correct: 1 },
  ],
  history: [
    { text: "Who discovered America?", options: ["Christopher Columbus", "Vespucci", "Magellan", "Leif Erikson"], correct: 0 },
    { text: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correct: 2 },
    { text: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], correct: 2 },
    { text: "Which country built the Great Wall?", options: ["Japan", "China", "Korea", "Mongolia"], correct: 1 },
    { text: "Who was the first President of USA?", options: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"], correct: 0 },
    { text: "When did the French Revolution begin?", options: ["1776", "1789", "1792", "1804"], correct: 1 },
    { text: "Who wrote Romeo and Juliet?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
    { text: "What year did the Berlin Wall fall?", options: ["1987", "1989", "1991", "1993"], correct: 1 },
    { text: "When did the Roman Empire fall?", options: ["476 AD", "410 AD", "1453 AD", "800 AD"], correct: 0 },
    { text: "Who was the first woman Prime Minister of UK?", options: ["Queen Victoria", "Margaret Thatcher", "Theresa May", "Queen Elizabeth II"], correct: 1 },
  ],
  geography: [
    { text: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { text: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
    { text: "Which continent is Egypt in?", options: ["Asia", "Africa", "Europe", "Australia"], correct: 1 },
    { text: "What is the tallest mountain?", options: ["K2", "Kilimanjaro", "Mount Everest", "Denali"], correct: 2 },
    { text: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
    { text: "Which river is the longest?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
    { text: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
    { text: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correct: 1 },
    { text: "Which desert is the largest?", options: ["Sahara", "Gobi", "Arabian", "Antarctic"], correct: 3 },
    { text: "What is the longest river in the USA?", options: ["Colorado", "Mississippi", "Missouri", "Rio Grande"], correct: 2 },
  ],
  technology: [
    { text: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], correct: 1 },
    { text: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Utility", "Common Processing Unit"], correct: 0 },
    { text: "What year was the iPhone first released?", options: ["2005", "2007", "2009", "2011"], correct: 1 },
    { text: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language"], correct: 0 },
    { text: "Who created Linux?", options: ["Bill Gates", "Steve Jobs", "Linus Torvalds", "Dennis Ritchie"], correct: 2 },
    { text: "What is the binary representation of 10?", options: ["1010", "1100", "1001", "1000"], correct: 0 },
    { text: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Application Process Integration"], correct: 0 },
    { text: "What programming language is known for web styling?", options: ["JavaScript", "Python", "CSS", "Java"], correct: 2 },
    { text: "What does URL stand for?", options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Locator"], correct: 1 },
    { text: "Which company developed the Android OS?", options: ["Apple", "Microsoft", "Google", "Samsung"], correct: 2 },
  ],
  general: [
    { text: "What is the largest mammal in the world?", options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"], correct: 1 },
    { text: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], correct: 2 },
    { text: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Ringgit"], correct: 2 },
    { text: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { text: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Leopard", "Tiger"], correct: 1 },
    { text: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1 },
    { text: "What is the capital of Italy?", options: ["Milan", "Venice", "Rome", "Florence"], correct: 2 },
    { text: "Which instrument has 88 keys?", options: ["Guitar", "Piano", "Violin", "Flute"], correct: 1 },
    { text: "What is the largest continent?", options: ["Africa", "Asia", "North America", "Europe"], correct: 1 },
    { text: "How many days are in a leap year?", options: ["364", "365", "366", "367"], correct: 2 },
  ]
};

interface QuestionWithAnswer extends Question {
  correctAnswer: number;
}

const generateMockQuestions = (topic: string, count: number): QuestionWithAnswer[] => {
  const topicQuestions = questionsByTopic[topic] || questionsByTopic.math;
  const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, count).map((q, idx) => ({
    id: idx + 1,
    topic,
    difficulty: 'medium',
    text: q.text,
    options: q.options,
    correctAnswer: q.correct
  }));
};

interface Question {
  id: number;
  topic: string;
  difficulty: string;
  text: string;
  options: string[];
}

const Quiz = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { topic, difficulty } = location.state || { topic: 'math', difficulty: '' };
        
        // Mock data for demo - replace with API call when backend is ready
        const mockQuestions = generateMockQuestions(topic, 10);
        
        setQuestions(mockQuestions);
        setAnswers(new Array(mockQuestions.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error('Error loading questions:', error);
        toast.error('Failed to load quiz questions');
        navigate('/browse');
      }
    };

    fetchQuestions();
  }, [navigate, location.state]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score based on correct answers
    const score = answers.reduce((acc, answer, idx) => {
      if (answer === questions[idx].correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    navigate("/results", { 
      state: { 
        score,
        total: questions.length,
        answers,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.text,
          options: q.options,
          correctAnswer: q.correctAnswer
        }))
      } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Quiz in Progress</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <QuestionCard
          question={{
            id: questions[currentQuestion].id,
            question: questions[currentQuestion].text,
            options: questions[currentQuestion].options,
            correctAnswer: 0
          }}
          questionNumber={currentQuestion + 1}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {answeredCount} of {questions.length} answered
          </div>

          {currentQuestion < questions.length - 1 ? (
            <Button onClick={handleNext} className="bg-gradient-primary">
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="bg-gradient-accent"
            >
              Submit Quiz
            </Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card className="p-4 mt-6">
          <h3 className="text-sm font-semibold mb-3">Question Navigator</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`h-10 w-10 rounded-md font-semibold text-sm transition-all ${
                  index === currentQuestion
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : answers[index] !== null
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
