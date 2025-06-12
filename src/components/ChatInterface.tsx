
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
  onQuickQuestion?: (question: string) => void;
}

export function ChatInterface({ chatId, onQuickQuestion }: ChatInterfaceProps) {
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

  // Clear messages when chat changes
  useEffect(() => {
    setMessages([]);
  }, [chatId]);

  // Handle quick questions from sidebar
  useEffect(() => {
    if (onQuickQuestion) {
      onQuickQuestion = (question: string) => {
        handleQuickQuestion(question);
      };
    }
  }, []);

  const handleQuickQuestion = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(question);
      
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

  // Mock AI response for DevOps operations
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("compilation error")) {
      return "**Jenkins Compilation Error - Troubleshooting Steps:**\n\n🔧 **Immediate Actions:**\n• Check the console output for specific compilation errors\n• Verify Java/Maven/Gradle versions match project requirements\n• Ensure all dependencies are correctly specified\n\n**Common Fixes:**\n```bash\n# Clean and rebuild\nmvn clean compile\n# or for Gradle\n./gradlew clean build\n```\n\n**Check These:**\n• Source code syntax errors\n• Missing imports or dependencies\n• Classpath issues\n• Environment-specific configurations\n\n**Next Steps:** Review the full stack trace and fix compilation issues in your IDE first.";
    } else if (lowerMessage.includes("timeout") && lowerMessage.includes("deploy")) {
      return "**Pipeline Timeout in Deploy Stage:**\n\n⏱️ **Timeout Analysis:**\n• Check deployment target resource availability\n• Verify network connectivity to deployment servers\n• Review application startup time requirements\n\n**Solutions:**\n```groovy\n// Increase timeout in Jenkinsfile\ntimeout(time: 30, unit: 'MINUTES') {\n    // deployment steps\n}\n```\n\n**Investigation Steps:**\n• Monitor deployment target CPU/Memory usage\n• Check application logs for startup issues\n• Verify database connectivity if applicable\n• Review load balancer health checks\n\n**Prevention:** Implement health check endpoints and optimize application startup time.";
    } else if (lowerMessage.includes("git") && lowerMessage.includes("authentication")) {
      return "**Git Authentication Failure:**\n\n🔐 **Authentication Issues:**\n• Verify SSH keys or credentials are correctly configured\n• Check if Git repository URL is accessible\n• Ensure Jenkins has proper permissions\n\n**Quick Fixes:**\n```bash\n# Test SSH connection\nssh -T git@github.com\n\n# Update Git credentials\ngit config --global credential.helper store\n```\n\n**Jenkins Configuration:**\n• Update credentials in Jenkins Credential Manager\n• Verify SSH key is added to Jenkins\n• Check repository URL format (SSH vs HTTPS)\n• Ensure branch permissions are set correctly\n\n**Security Note:** Use SSH keys or tokens instead of passwords for better security.";
    } else if (lowerMessage.includes("docker") && lowerMessage.includes("insufficient space")) {
      return "**Docker Build Failed - Insufficient Space:**\n\n💾 **Disk Space Management:**\n```bash\n# Check disk usage\ndf -h\n\n# Clean Docker system\ndocker system prune -af\ndocker image prune -af\ndocker container prune -f\n```\n\n**Prevention Strategies:**\n• Implement automated cleanup scripts\n• Use multi-stage Docker builds\n• Configure Jenkins to clean workspace after builds\n• Set up disk space monitoring alerts\n\n**Quick Actions:**\n• Remove unused Docker images and containers\n• Clear Jenkins workspace\n• Check for large log files\n• Consider using Docker build cache optimization\n\n**Long-term:** Set up automated cleanup policies and disk space monitoring.";
    } else if (lowerMessage.includes("test failures")) {
      return "**Integration Test Failures:**\n\n🧪 **Test Debugging Steps:**\n• Review test logs for specific failure reasons\n• Check if test environment is properly configured\n• Verify test data and database state\n\n**Common Issues:**\n```bash\n# Run tests locally first\nmvn test\n# or\nnpm test\n```\n\n**Investigation:**\n• Environment configuration differences\n• Test data dependencies\n• Race conditions in parallel tests\n• External service availability\n• Database schema migrations\n\n**Solutions:**\n• Implement proper test isolation\n• Use test containers for consistent environments\n• Add retry logic for flaky tests\n• Review test execution order dependencies";
    } else if (lowerMessage.includes("node offline") || lowerMessage.includes("agent disconnected")) {
      return "**Jenkins Node/Agent Disconnected:**\n\n🔌 **Connection Troubleshooting:**\n• Check network connectivity between master and agent\n• Verify agent machine is running and accessible\n• Review Jenkins agent logs\n\n**Recovery Steps:**\n```bash\n# Restart Jenkins agent service\nsudo systemctl restart jenkins-agent\n\n# Check agent connection\ntelnet jenkins-master 50000\n```\n\n**Common Causes:**\n• Network connectivity issues\n• Agent machine resource exhaustion\n• Firewall or security group blocking\n• Jenkins master overload\n• Agent process crashed\n\n**Prevention:** Set up monitoring for agent health and automated restart scripts.";
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
