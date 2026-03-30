declare module 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js' {
  interface ChatOptions {
    webhookUrl: string
    mode?: string
    loadPreviousSession?: boolean
    showWelcomeScreen?: boolean
    enableStreaming?: boolean
    initialMessages?: string[]
    i18n?: Record<string, Record<string, string>>
  }
  export function createChat(options: ChatOptions): void
}
