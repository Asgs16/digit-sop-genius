
import { Terminal, Cloud, GitBranch, Settings, Zap, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WelcomeScreen() {
  const features = [
    {
      icon: Terminal,
      title: "Jenkins & CI/CD",
      description: "Build pipelines, job configuration, and deployment automation",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Cloud,
      title: "AWS & Infrastructure",
      description: "EC2 management, monitoring, and cloud operations",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Server,
      title: "Kubernetes & Pods",
      description: "Container orchestration, pod restarts, and scaling issues",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Tosca Automation",
      description: "Test automation setup, configuration, and best practices",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const exampleQuestions = [
    "How do I fix a Jenkins build failure?",
    "My pods keep restarting, what should I check?",
    "Help me set up a pre-prod Jenkins job",
    "AWS EC2 instance performance issues",
    "Tosca test automation implementation guide",
    "Debug Jenkins pipeline errors"
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-2xl">
            D
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            DevOps Operations Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your intelligent companion for infrastructure management, CI/CD pipelines, 
            and operational excellence. Get instant help with Jenkins, AWS, Kubernetes, and more.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full max-w-4xl">
        {features.map((feature, index) => (
          <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-6 text-center text-foreground">Try asking:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {exampleQuestions.map((question, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:bg-accent/50 transition-all duration-200 border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:scale-[1.01] group"
            >
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {question}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Status Banner */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-cyan-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 shadow-lg">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm" />
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
            <strong>System Status:</strong> All operations monitoring systems are online. 
            Ready to assist with your DevOps challenges.
          </p>
        </div>
      </div>
    </div>
  );
}
