import { Home, BarChart3, MessageSquare, Plus } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
];

interface ChatSession {
  id: string;
  sessionId: string;
  createdAt: string;
  lastMessageAt: string;
}

export function AppSidebar() {
  const [location] = useLocation();
  
  // Fetch recent chat sessions (mock data for now since API might not have this endpoint)
  const { data: sessions } = useQuery<ChatSession[]>({
    queryKey: ['/api/chat/sessions'],
    enabled: false, // Disabled for now - will enable when API endpoint is ready
  });

  // Mock recent chats for demonstration
  const recentChats = [
    { id: '1', title: 'Marketing Strategy Discussion', time: '2 hours ago' },
    { id: '2', title: 'Campaign Performance Review', time: 'Yesterday' },
    { id: '3', title: 'Content Ideas Brainstorm', time: '2 days ago' },
  ];

  return (
    <Sidebar className="border-r border-primary/20">
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold px-4 py-3">
            Marketing Master
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={location === item.url ? 'bg-sidebar-accent' : ''}
                    data-testid={`nav-${item.title.toLowerCase()}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Chats Section */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="px-4 py-2 flex items-center justify-between">
            <span>Recent Chats</span>
            <button 
              className="p-1 hover:bg-primary/10 rounded transition-colors"
              title="New Chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <SidebarMenu>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton 
                      asChild
                      className="cursor-pointer hover:bg-sidebar-accent"
                    >
                      <div className="flex items-start gap-2 py-2">
                        <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{chat.title}</p>
                          <p className="text-xs text-muted-foreground">{chat.time}</p>
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
    </Sidebar>
  );
}
