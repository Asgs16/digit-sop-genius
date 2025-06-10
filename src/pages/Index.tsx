
import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInterface } from "@/components/ChatInterface";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ChatSidebar 
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
        />
        <ChatInterface chatId={currentChatId} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
