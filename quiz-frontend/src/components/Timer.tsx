import { useEffect } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimerProps {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
}

export const Timer = ({ timeLeft, setTimeLeft }: TimerProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(Math.max(0, timeLeft - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300; // Less than 5 minutes

  return (
    <Card className={`p-4 ${isLowTime ? 'animate-pulse-glow border-destructive' : ''}`}>
      <div className="flex items-center gap-2">
        <Clock className={`h-5 w-5 ${isLowTime ? 'text-destructive' : 'text-muted-foreground'}`} />
        <div className="text-center">
          <div className={`text-2xl font-bold ${isLowTime ? 'text-destructive' : 'text-foreground'}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground">Time Left</div>
        </div>
      </div>
    </Card>
  );
};
