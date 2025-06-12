
import { Plus, MessageSquare, Settings, LogOut, AlertCircle } from "lucide-react";
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
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <h1 className="text-xl font-bold">DevOps Assistant</h1>
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
          <SidebarGroupLabel className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            Common Jenkins Issues
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {jenkinsErrors.map((error, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    onClick={() => handleJenkinsError(error)}
                    className="w-full justify-start p-3 hover:bg-accent transition-colors text-left"
                  >
                    <AlertCircle className="w-4 h-4 mr-3 text-red-500 shrink-0" />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-medium truncate w-full">
                        {error}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Click for troubleshooting help
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
