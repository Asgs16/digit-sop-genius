
import { Plus, MessageSquare, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ChatSidebarProps {
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export function ChatSidebar({ currentChatId, onChatSelect }: ChatSidebarProps) {
  // Mock chat history - in real app this would come from your backend
  const chats = [
    { id: "1", title: "Claims Processing SOP", timestamp: "2 hours ago" },
    { id: "2", title: "Customer Onboarding", timestamp: "1 day ago" },
    { id: "3", title: "Policy Renewal Process", timestamp: "3 days ago" },
    { id: "4", title: "Underwriting Guidelines", timestamp: "1 week ago" },
  ];

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    onChatSelect(newChatId);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <h1 className="text-xl font-bold">Digit GPT</h1>
        </div>
        <Button 
          onClick={handleNewChat}
          className="w-full mt-3 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton 
                    onClick={() => onChatSelect(chat.id)}
                    isActive={currentChatId === chat.id}
                    className="w-full justify-start p-3 hover:bg-accent transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-3 text-muted-foreground" />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-medium truncate w-full">
                        {chat.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {chat.timestamp}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Separator className="mb-4" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
