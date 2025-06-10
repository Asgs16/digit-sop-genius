
import { MessageSquare, FileText, Users, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeScreen() {
  const features = [
    {
      icon: FileText,
      title: "SOPs & Documentation",
      description: "Get instant access to all Standard Operating Procedures"
    },
    {
      icon: Shield,
      title: "Compliance Guidelines",
      description: "Stay updated with regulatory requirements and policies"
    },
    {
      icon: Users,
      title: "Team Protocols",
      description: "Learn about customer service and internal processes"
    },
    {
      icon: MessageSquare,
      title: "Quick Answers",
      description: "Ask questions in natural language and get precise answers"
    }
  ];

  const exampleQuestions = [
    "How do I process a motor insurance claim?",
    "What are the KYC requirements for new customers?",
    "Show me the policy renewal workflow",
    "What's the escalation process for complaints?"
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
          D
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Digit GPT</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your intelligent assistant powered by Digit Insurance's internal knowledge base. 
          Ask me anything about our processes, policies, and procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full max-w-2xl">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full max-w-2xl">
        <h3 className="text-sm font-semibold mb-3 text-center">Try asking:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exampleQuestions.map((question, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:bg-accent transition-colors"
            >
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground">{question}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
          <strong>Note:</strong> This is a demo interface. In production, Digit GPT will be connected to your 
          Confluence documentation and powered by OpenAI's GPT models for accurate, context-aware responses.
        </p>
      </div>
    </div>
  );
}
