
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

  // Mock AI response - replace with actual API call to your backend
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on common Digit Insurance queries
    if (userMessage.toLowerCase().includes("claim")) {
      return "Based on our Standard Operating Procedures, claims processing follows a 3-step verification process:\n\n1. **Initial Review**: Claims are reviewed within 24 hours of submission\n2. **Document Verification**: All required documents are validated\n3. **Final Approval**: Claims under ₹50,000 are auto-approved if all criteria are met\n\nFor specific claim status updates, you can check the claims dashboard or contact the claims team directly.";
    } else if (userMessage.toLowerCase().includes("policy")) {
      return "Our policy management system handles various insurance products:\n\n• **Motor Insurance**: Comprehensive coverage with instant renewal\n• **Health Insurance**: Individual and family floater plans\n• **Travel Insurance**: Domestic and international coverage\n\nAll policies can be managed through our digital platform. Would you like information about a specific policy type?";
    } else {
      return "I'm Digit GPT, your internal assistant powered by our Confluence documentation and SOPs. I can help you with:\n\n• Claims processing procedures\n• Policy management guidelines\n• Customer service protocols\n• Underwriting standards\n• Compliance requirements\n\nWhat specific topic would you like assistance with?";
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
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center gap-3">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </SidebarTrigger>
        <div>
          <h2 className="font-semibold">Digit GPT</h2>
          <p className="text-sm text-muted-foreground">Your AI assistant for internal operations</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="max-w-3xl mx-auto space-y-6">
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
                    content: "Searching through Confluence documentation...",
                    isUser: false,
                    timestamp: new Date(),
                  }}
                  isLoading={true}
                />
              )}
            </div>
          </ScrollArea>
        )}

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-3">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me about our SOPs, policies, or procedures..."
                className="min-h-[52px] max-h-32 resize-none pr-12"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Digit GPT can make mistakes. Please verify important information with official documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
