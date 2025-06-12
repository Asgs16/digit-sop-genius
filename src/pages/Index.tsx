
import { useState, useRef } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const chatInterfaceRef = useRef<any>(null);

  const handleQuickQuestion = (question: string) => {
    // This will be handled by the ChatInterface component
    // when a Jenkins error is clicked
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ChatSidebar 
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
          onQuickQuestion={handleQuickQuestion}
        />
        <ChatInterface 
          chatId={currentChatId} 
          onQuickQuestion={handleQuickQuestion}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
