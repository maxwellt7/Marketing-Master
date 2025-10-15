import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Home from "@/pages/home";
import Analytics from "@/pages/analytics";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/analytics" component={Analytics}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties} defaultOpen={true}>
          <div className="flex h-screen w-full overflow-hidden">
            <AppSidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <header className="flex items-center justify-between p-2 md:p-3 border-b border-primary/20 bg-card/30 backdrop-blur-sm flex-shrink-0">
                <SidebarTrigger 
                  data-testid="button-sidebar-toggle" 
                  className="hover:bg-primary/10 p-2 rounded-md transition-colors"
                />
                <div className="text-sm text-muted-foreground hidden md:block">
                  AI-Powered Marketing Intelligence
                </div>
              </header>
              <main className="flex-1 overflow-hidden">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
