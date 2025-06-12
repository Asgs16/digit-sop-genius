
import { useState, useRef, useEffect } from "react";
import { Send, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { WelcomeScreen } from "@/components/WelcomeScreen";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  chatId: string | null;
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Mock AI response for DevOps operations
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("jenkins") && lowerMessage.includes("build")) {
      return "**Jenkins Build Issues - Troubleshooting Steps:**\n\n🔧 **Common Build Failures:**\n• Check build logs for compilation errors\n• Verify workspace cleanup\n• Ensure all dependencies are available\n• Check node availability and disk space\n\n**Pre-prod Job Setup:**\n```bash\n# Sample Jenkins pipeline\npipeline {\n  agent any\n  stages {\n    stage('Build') {\n      steps {\n        sh 'mvn clean compile'\n      }\n    }\n  }\n}\n```\n\n**Next Steps:** Check the Jenkins console output and verify your Jenkinsfile syntax.";
    } else if (lowerMessage.includes("pod") && lowerMessage.includes("restart")) {
      return "**Pod Restart Issues - Kubernetes Troubleshooting:**\n\n🚨 **Diagnostic Commands:**\n```bash\n# Check pod status\nkubectl get pods -n <namespace>\n\n# Describe failing pod\nkubectl describe pod <pod-name> -n <namespace>\n\n# Check logs\nkubectl logs <pod-name> -n <namespace> --previous\n```\n\n**Common Causes:**\n• Memory/CPU limits exceeded\n• Health check failures\n• Image pull errors\n• ConfigMap/Secret issues\n\n**Quick Fix:** Scale deployment to 0 and back to desired replicas:\n```bash\nkubectl scale deployment <deployment-name> --replicas=0\nkubectl scale deployment <deployment-name> --replicas=3\n```";
    } else if (lowerMessage.includes("tosca")) {
      return "**Tosca Implementation Guide:**\n\n🔄 **Setup Steps:**\n1. **Environment Preparation**\n   • Install Tosca Commander\n   • Configure test repository\n   • Set up execution agents\n\n2. **Test Case Creation**\n   • Define test objectives\n   • Create reusable modules\n   • Implement data-driven testing\n\n3. **CI/CD Integration**\n   • Configure Tosca CI client\n   • Set up automated execution\n   • Generate test reports\n\n**Best Practices:**\n• Use Page Objects pattern\n• Implement proper error handling\n• Maintain test data separately";
    } else if (lowerMessage.includes("aws") || lowerMessage.includes("ec2")) {
      return "**AWS EC2 Operations Guide:**\n\n☁️ **Common EC2 Tasks:**\n\n**Instance Management:**\n```bash\n# List instances\naws ec2 describe-instances\n\n# Start/Stop instances\naws ec2 start-instances --instance-ids i-1234567890abcdef0\naws ec2 stop-instances --instance-ids i-1234567890abcdef0\n```\n\n**Troubleshooting:**\n• Check Security Groups and NACLs\n• Verify IAM permissions\n• Monitor CloudWatch metrics\n• Check system logs in Console\n\n**Performance Optimization:**\n• Right-size instances based on utilization\n• Use appropriate storage types\n• Enable detailed monitoring\n• Implement auto-scaling policies";
    } else {
      return "**DevOps Operations Assistant** 🚀\n\nI can help you with:\n\n**🔧 Jenkins & CI/CD**\n• Build pipeline troubleshooting\n• Job configuration and optimization\n• Pre-prod environment setup\n\n**☁️ AWS & Infrastructure**\n• EC2 instance management\n• Performance monitoring\n• Cost optimization strategies\n\n**🔄 Kubernetes & Containers**\n• Pod restart issues\n• Deployment troubleshooting\n• Resource optimization\n\n**🧪 Test Automation**\n• Tosca implementation\n• Test framework setup\n• Automated testing strategies\n\nWhat specific challenge are you facing today?";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header with enhanced styling */}
      <div className="border-b border-border/50 p-4 flex items-center gap-3 bg-background/95 backdrop-blur-sm shadow-sm">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
            D
          </div>
          <div>
            <h2 className="font-semibold text-foreground">DevOps Assistant</h2>
            <p className="text-sm text-muted-foreground">Your AI companion for infrastructure & operations</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  message={{
                    id: "loading",
                    content: "Analyzing operations data and best practices...",
                    isUser: false,
                    timestamp: new Date(),
                  }}
                  isLoading={true}
                />
              )}
            </div>
          </ScrollArea>
        )}

        {/* Enhanced Input Area */}
        <div className="border-t border-border/50 p-4 bg-background/95 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="relative flex items-end gap-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about Jenkins builds, AWS issues, pod restarts, Tosca setup..."
                  className="min-h-[52px] max-h-32 resize-none pr-12 shadow-lg border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-background/80 backdrop-blur-sm"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />
              </div>
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="shrink-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              DevOps Assistant can help with Jenkins, AWS, Kubernetes, and automation tasks. Always verify critical operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
