# 🎨 NeonChat - Marketing Master AI

A modern, full-stack AI-powered chat application with a stunning neon cyberpunk interface. Built with React, TypeScript, and n8n chat integration.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.3.1-61dafb)

## ✨ Features

- 🤖 **AI-Powered Chat** - Integrated with n8n workflow automation
- 🎨 **Neon Cyberpunk UI** - Beautiful gradient-based design with 5 theme presets
- 📱 **Mobile Responsive** - Works seamlessly on desktop, tablet, and mobile
- 💾 **Session Persistence** - Chat history saved locally or in PostgreSQL
- 📊 **Analytics Dashboard** - Track conversation metrics and insights
- 🔒 **Type-Safe** - Built with TypeScript for reliability
- ⚡ **Fast Development** - Hot module replacement with Vite

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/maxwellt7/NeonChat.git
cd NeonChat

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching

### Backend
- **Express** - Web server
- **TypeScript** - Type safety
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Database (optional)
- **n8n Chat** - AI workflow integration

### Build Tools
- **Vite** - Fast build tool
- **tsx** - TypeScript execution
- **ESBuild** - Fast bundling

## 📁 Project Structure

```
NeonChat/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and config
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── db.ts            # Database config
│   └── storage.ts       # Data persistence layer
├── shared/              # Shared types and schemas
└── vite.config.ts       # Vite configuration
```

## 🎨 Features in Detail

### Fullscreen Chat Interface
- Clean, distraction-free chat experience
- Gradient header with branding
- Embedded n8n chat widget for AI conversations

### Recent Chats Sidebar
- View conversation history
- Quick access to previous chats
- New chat button for starting fresh
- Collapsible on mobile devices

### Mobile Responsive Design
- Adapts to any screen size
- Touch-friendly interface
- Collapsible sidebar for mobile
- Responsive typography

### Analytics Dashboard
- Track total sessions and messages
- Monitor response times
- Visualize chat patterns by hour
- Session trends over time

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Optional - for persistent storage
DATABASE_URL=postgresql://user:password@host:port/database

# Server port (default: 5000)
PORT=5000

# Node environment
NODE_ENV=development
```

### n8n Webhook Configuration

Update the webhook URL in `client/src/pages/home.tsx`:

```typescript
webhookUrl: 'YOUR_N8N_WEBHOOK_URL'
```

## 🗄️ Database Setup (Optional)

The app works without a database using in-memory storage. For persistent storage:

```bash
# Set DATABASE_URL in .env file
export DATABASE_URL="postgresql://..."

# Push database schema
npm run db:push
```

## 📦 Build & Deploy

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Deploy to Replit

1. Fork this repository
2. Import into Replit
3. Set environment variables
4. Click "Run"

### Deploy to Vercel/Netlify

The app can be deployed to any Node.js hosting platform. Configure build commands:

- Build: `npm run build`
- Start: `npm start`
- Install: `npm install`

## 🐛 Troubleshooting

### Error Overlay Won't Dismiss

Do a hard refresh:
- Mac: `Cmd + Shift + R`
- Windows/Linux: `Ctrl + Shift + R`

### Port Already in Use

Change the port:
```bash
PORT=3000 npm run dev
```

### Chat Widget Not Loading

Check the n8n webhook URL in `client/src/pages/home.tsx` and ensure it's accessible.

## 📚 Documentation

- [Debug Summary](DEBUG_SUMMARY.md) - Detailed debugging information
- [Fixes Applied](FIXES_APPLIED.md) - Technical details of bug fixes
- [Quick Start Guide](QUICK_START.md) - Simplified setup instructions
- [Latest Changes](LATEST_CHANGES.md) - Recent updates and features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) - Workflow automation
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Vite](https://vitejs.dev/) - Build tool

## 📧 Contact

Max Mayes - [@maxwellt7](https://github.com/maxwellt7)

Project Link: [https://github.com/maxwellt7/NeonChat](https://github.com/maxwellt7/NeonChat)

---

**Built with ❤️ and ⚡ by Max Mayes**

