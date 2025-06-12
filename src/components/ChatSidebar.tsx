import { Plus, MessageSquare, Settings, LogOut, Wrench } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatSidebarProps {
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onQuickQuestion: (question: string) => void;
}

export function ChatSidebar({ currentChatId, onChatSelect, onQuickQuestion }: ChatSidebarProps) {
  // Jenkins error scenarios with common issues
  const jenkinsErrors = [
    "Build #45 failed - compilation error",
    "Pipeline timeout in Deploy stage",
    "Git checkout failed - authentication",
    "Maven dependency resolution failed",
    "Docker build failed - insufficient space",
    "Test failures in integration tests",
    "Node offline - agent disconnected",
    "Workspace cleanup failed",
    "Permission denied on deployment",
    "Environment variables not set",
    "Build trigger webhook failed",
    "Artifact upload to Nexus failed",
    "SonarQube quality gate failed",
    "Database migration script error",
    "Load balancer health check failed",
    "SSL certificate validation error",
    "Memory leak detected in build",
    "Parallel builds conflict detected",
    "Build stuck in pending status",
    "Post-build email notification failed"
  ];

  const handleNewChat = () => {
    // Generate a new unique chat ID and switch to it
    const newChatId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    onChatSelect(newChatId);
  };

  const handleJenkinsError = (error: string) => {
    // Create a new chat for this Jenkins error
    const newChatId = `jenkins-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    onChatSelect(newChatId);
    // Send the Jenkins error as the first message
    onQuickQuestion(`I'm experiencing this Jenkins issue: "${error}". Can you help me troubleshoot and resolve this?`);
  };

  return (
    <Sidebar className="border-r border-border/50 shadow-sm w-80">
      <SidebarHeader className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            D
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Digit GPT
          </h1>
        </div>
        <Button 
          onClick={handleNewChat}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-6">
        <SidebarGroup className="space-y-3">
          <SidebarGroupLabel className="flex items-center gap-3 text-sm font-semibold text-foreground/80 px-3 py-2">
            <Wrench className="w-4 h-4 text-yellow-600" />
            Common Jenkins Issues
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[400px] w-full">
              <SidebarMenu className="space-y-2 pr-4">
                {jenkinsErrors.map((error, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton 
                      onClick={() => handleJenkinsError(error)}
                      className="w-full justify-start p-4 hover:bg-accent/60 transition-all duration-200 text-left rounded-lg border border-transparent hover:border-border/50 hover:shadow-sm group h-auto min-h-[60px]"
                    >
                      <div className="flex items-start gap-3 flex-1 w-full">
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0 group-hover:bg-yellow-500 transition-colors duration-200"></div>
                        <div className="flex flex-col items-start flex-1 space-y-1 w-full overflow-hidden">
                          <span className="text-sm font-medium text-foreground group-hover:text-yellow-600 transition-colors duration-200 whitespace-normal break-words leading-5 w-full">
                            {error}
                          </span>
                          <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 whitespace-normal">
                            Click for troubleshooting help
                          </span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 space-y-4">
        <Separator className="bg-border/50" />
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start p-3 hover:bg-accent/60 transition-all duration-200 rounded-lg">
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start p-3 hover:bg-accent/60 transition-all duration-200 rounded-lg">
              <LogOut className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
