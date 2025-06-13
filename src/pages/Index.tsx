
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [currentChatId] = useState<string>("main-chat");

  return (
    <div className="min-h-screen w-full bg-background">
      <ChatInterface chatId={currentChatId} />
    </div>
  );
};

export default Index;
