
import { User, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${message.isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-lg px-4 py-3 ${
            message.isUser
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-muted'
          } ${isLoading ? 'animate-pulse' : ''}`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>
        <div
          className={`text-xs text-muted-foreground mt-1 ${
            message.isUser ? 'text-right' : 'text-left'
          }`}
        >
          {formatTimestamp(message.timestamp)}
        </div>
      </div>

      {message.isUser && (
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarFallback className="bg-secondary">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
