import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const loadChat = async () => {
      try {
        const { createChat } = await import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js');
        
        createChat({
          webhookUrl: 'https://growthgod.app.n8n.cloud/webhook/82b00b4f-3af7-4d27-8130-427db82147c8/chat',
          mode: 'window',
          loadPreviousSession: true,
          showWelcomeScreen: false,
          enableStreaming: true,
          initialMessages: [
            'Welcome to the future',
            'How can I assist you today?'
          ],
          i18n: {
            en: {
              title: 'Neon AI Assistant',
              subtitle: "Powered by advanced AI workflow",
              footer: '',
              getStarted: 'Start Conversation',
              inputPlaceholder: 'Type your message...',
            },
          },
        });
      } catch (error) {
        console.error('Failed to load n8n chat:', error);
      }
    };

    loadChat();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Neon Vector Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left corner accent */}
        <svg className="absolute top-0 left-0 w-64 h-64 opacity-[0.05]" viewBox="0 0 200 200">
          <path
            d="M0,0 L200,0 L0,200 Z"
            fill="none"
            stroke="url(#neon-gradient-1)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="neon-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(170, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(280, 100%, 65%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Top-right corner circuit pattern */}
        <svg className="absolute top-0 right-0 w-96 h-96 opacity-[0.05]" viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="100" fill="none" stroke="hsl(170, 100%, 50%)" strokeWidth="1" />
          <circle cx="150" cy="150" r="70" fill="none" stroke="hsl(280, 100%, 65%)" strokeWidth="1" />
          <circle cx="150" cy="150" r="40" fill="none" stroke="hsl(330, 100%, 60%)" strokeWidth="1" />
          <line x1="150" y1="50" x2="150" y2="0" stroke="hsl(170, 100%, 50%)" strokeWidth="1" />
          <line x1="250" y1="150" x2="300" y2="150" stroke="hsl(280, 100%, 65%)" strokeWidth="1" />
          <line x1="150" y1="250" x2="150" y2="300" stroke="hsl(330, 100%, 60%)" strokeWidth="1" />
        </svg>

        {/* Bottom-left geometric lines */}
        <svg className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.05]" viewBox="0 0 250 250">
          <polyline
            points="0,250 100,150 50,100 150,50 100,0"
            fill="none"
            stroke="hsl(170, 100%, 50%)"
            strokeWidth="2"
          />
          <polyline
            points="50,250 150,180 120,120 200,80 180,20"
            fill="none"
            stroke="hsl(280, 100%, 65%)"
            strokeWidth="1"
          />
        </svg>

        {/* Bottom-right corner accent */}
        <svg className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.05]" viewBox="0 0 200 200">
          <path
            d="M200,200 L0,200 L200,0 Z"
            fill="none"
            stroke="url(#neon-gradient-2)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="neon-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(280, 100%, 65%)" />
              <stop offset="100%" stopColor="hsl(330, 100%, 60%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5" 
             style={{
               background: 'radial-gradient(circle, hsl(170, 100%, 50%) 0%, transparent 70%)'
             }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title with Neon Glow */}
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, hsl(170, 100%, 50%), hsl(280, 100%, 65%), hsl(330, 100%, 60%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px hsl(170, 100%, 50%, 0.3)',
            }}
          >
            Neon AI
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the future of conversation with our AI-powered chatbot.
            <br />
            <span className="text-primary">Click the chat button to get started.</span>
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div 
              className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all"
              data-testid="feature-instant"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Instant Responses</h3>
              <p className="text-sm text-muted-foreground">Get real-time answers powered by advanced AI workflows</p>
            </div>

            <div 
              className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all"
              data-testid="feature-smart"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Smart Assistance</h3>
              <p className="text-sm text-muted-foreground">Contextual help that understands your needs</p>
            </div>

            <div 
              className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all"
              data-testid="feature-247"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">24/7 Available</h3>
              <p className="text-sm text-muted-foreground">Always here when you need assistance</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-foreground">Chat widget is ready - click the button in the bottom right</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div id="n8n-chat" data-testid="chat-container" />
    </div>
  );
}
