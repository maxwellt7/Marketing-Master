# Neon AI Chatbot

## Overview
A minimalistic dark-themed chatbot with stunning neon vector styling that integrates with n8n workflow automation. The application features a cyberpunk-inspired aesthetic with electric cyan and purple neon accents.

## Project Structure
- **Frontend**: React SPA with dark theme and neon styling
- **Backend**: Minimal Express.js server for static file serving
- **Chat Integration**: n8n chat widget loaded via CDN

## Features
- 🎨 Cyberpunk-inspired dark theme with neon vector graphics
- ⚡ Real-time AI chat powered by n8n workflow
- 🌊 Streaming responses support
- 📱 Responsive design (desktop & mobile)
- ✨ Beautiful animations and neon glow effects
- 🎯 Minimal, clean interface
- 🎨 5 customizable theme presets (Electric Cyan, Vibrant Purple, Neon Green, Neon Blue, Neon Pink)
- 📊 Analytics dashboard with real-time metrics and visualizations
- 🗂️ Sidebar navigation for easy access to features

## n8n Integration
- **Webhook URL**: `https://growthgod.app.n8n.cloud/webhook/82b00b4f-3af7-4d27-8130-427db82147c8/chat`
- **Chat Library**: Loaded via CDN from `@n8n/chat`
- **Features**: Streaming enabled, session persistence, custom neon theme

## Design System
### Color Palette
- **Primary Neon**: Electric Cyan (170, 100%, 50%)
- **Secondary Neon**: Vibrant Purple (280, 100%, 65%)
- **Accent Neon**: Neon Pink (330, 100%, 60%)
- **Background**: Deep dark purple-black (260, 15%, 8%)

### Typography
- **Primary Font**: Inter, SF Pro Display
- **Monospace**: JetBrains Mono, Fira Code

### Visual Effects
- Pulsing neon glow on chat toggle button
- Subtle backdrop blur effects
- Circuit-board inspired SVG patterns
- Smooth slide-up animations for messages
- Custom neon scrollbar

## Running the Application
```bash
npm run dev
```

The app runs on port 5000 with both frontend and backend served together.

## Database & Persistence
- **PostgreSQL**: Neon-backed database for chat history and analytics
- **Schema**: `chat_sessions`, `chat_messages`, `chat_analytics` tables
- **API Routes**: REST endpoints for session/message CRUD and analytics
- **Status**: Backend persistence infrastructure complete, frontend integration pending

## Recent Changes
- **2025-10-15**: Theme Presets & Analytics Dashboard
  - Built theme switching system with 5 neon color presets
  - Created analytics dashboard with real-time metrics and charts
  - Implemented sidebar navigation using Shadcn components
  - Added aggregated analytics API with queue-based response time calculation
  - Integrated Recharts for data visualization
  - Theme preferences persist via localStorage

- **2025-10-15**: Database schema and persistence layer
  - Created chat_sessions, chat_messages, and chat_analytics tables
  - Built complete REST API for chat persistence
  - Implemented storage interface with Drizzle ORM
  - Note: Frontend integration with n8n widget pending due to third-party library constraints
  
- **2025-10-14**: Initial project setup with n8n chat integration
  - Created dark theme with neon vector styling
  - Implemented custom CSS variables for n8n chat widget
  - Added decorative SVG background elements
  - Built responsive landing page with feature cards

## Theme System
### Available Presets
1. **Electric Cyan** (default) - Primary: hsl(170, 100%, 50%)
2. **Vibrant Purple** - Primary: hsl(280, 100%, 65%)
3. **Neon Green** - Primary: hsl(140, 100%, 50%)
4. **Neon Blue** - Primary: hsl(200, 100%, 55%)
5. **Neon Pink** - Primary: hsl(330, 100%, 60%)

### Implementation
- `useTheme` hook manages theme state
- CSS custom properties updated dynamically
- ThemeSelector component in top-right corner
- localStorage persistence with key `neon-theme`

## Analytics Dashboard
### Metrics Tracked
- **Total Sessions**: Number of chat conversations
- **Total Messages**: All messages exchanged
- **Avg Session Duration**: Average time per session (minutes)
- **Avg Response Time**: Queue-based calculation from message timestamps (seconds)

### Visualizations
- **Messages by Hour**: Bar chart showing 24-hour distribution
- **Sessions Over Time**: Line chart of last 7 days

### Technical Details
- GET `/api/analytics` returns aggregated data
- Queue-based avgResponseTime correctly pairs user/assistant messages
- Handles message bursts and multi-part responses
- Charts use theme-aware neon colors from CSS variables
