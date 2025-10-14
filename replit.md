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

## Recent Changes
- **2025-01-14**: Initial project setup with n8n chat integration
- Created dark theme with neon vector styling
- Implemented custom CSS variables for n8n chat widget
- Added decorative SVG background elements
- Built responsive landing page with feature cards
