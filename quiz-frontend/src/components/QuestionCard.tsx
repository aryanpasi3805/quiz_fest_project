import { Card } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
}

export const QuestionCard = ({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswerSelect 
}: QuestionCardProps) => {
  return (
    <Card className="p-8 animate-fade-in">
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">Question {questionNumber}</div>
        <h2 className="text-2xl font-bold">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? 'border-primary bg-primary/5 shadow-glow'
                : 'border-border hover:border-primary/50 hover:bg-secondary'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary'
                    : 'border-border'
                }`}
              >
                {selectedAnswer === index && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};
