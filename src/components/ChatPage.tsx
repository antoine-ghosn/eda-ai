import { Send, Mic } from 'lucide-react';
import BottomNav from './BottomNav';

interface ChatPageProps {
  onNavigate: (tab: string) => void;
}

export default function ChatPage({ onNavigate }: ChatPageProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white/80 p-4 pb-3 pt-8 backdrop-blur-lg">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">
          Chat with EDA
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your AI productivity assistant</p>
      </header>

      <main className="flex-1 pb-24">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">AI Assistant</h2>
            <p className="text-slate-500">Chat interface coming soon</p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-20 left-0 right-0 bg-white p-4">
        <div className="mx-auto flex max-w-md items-center gap-2">
          <input
            type="text"
            placeholder="Ask EDA anything..."
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700">
            <Send size={20} />
          </button>
        </div>
      </div>

      <BottomNav activeTab="chat" onNavigate={onNavigate} />
    </div>
  );
}
