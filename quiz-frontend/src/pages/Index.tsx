import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Trophy, Users, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import heroImage from "@/assets/hero-quiz.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Master Your Knowledge with Interactive Quizzes
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Challenge yourself with engaging multiple-choice quizzes, track your progress, and compete with others. Learning has never been this fun!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-primary text-lg px-8 shadow-glow">
                    Start Quiz Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src={heroImage} 
                alt="Interactive quiz platform" 
                className="rounded-2xl shadow-2xl shadow-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Why Choose QuizMaster?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for an exceptional quiz experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Smart Learning",
                description: "Adaptive questions that match your skill level",
                delay: "0s"
              },
              {
                icon: Zap,
                title: "Instant Results",
                description: "Get immediate feedback on your performance",
                delay: "0.1s"
              },
              {
                icon: Trophy,
                title: "Compete & Win",
                description: "Climb leaderboards and earn achievements",
                delay: "0.2s"
              },
              {
                icon: Users,
                title: "Join Community",
                description: "Connect with thousands of learners",
                delay: "0.3s"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">Take Your Learning to the Next Level</h2>
              <div className="space-y-4">
                {[
                  "Timed quizzes to improve your speed and accuracy",
                  "Comprehensive result analysis with detailed feedback",
                  "Track your progress across multiple categories",
                  "Practice with hundreds of curated questions"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-8 bg-gradient-primary text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-3xl font-bold mb-4">Ready to Begin?</h3>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of learners who are already improving their knowledge with QuizMaster.
              </p>
              <Link to="/browse">
                <Button size="lg" variant="secondary" className="w-full text-lg">
                  Browse Quizzes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Quiz Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Create your free account and access hundreds of quizzes across multiple categories
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-gradient-accent text-lg px-12 shadow-glow">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
