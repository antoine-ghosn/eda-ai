import { useState, useEffect } from 'react';
import { Plus, Bookmark, ListTodo, Share2 } from 'lucide-react';
import { apiService, ApiFeedItem } from '../services/api';
import BottomNav from './BottomNav';

interface FeedPageProps {
  onNavigate: (tab: string) => void;
  userId?: number;
}

export default function FeedPage({ onNavigate, userId = 1 }: FeedPageProps) {
  const [feedItems, setFeedItems] = useState<ApiFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, [userId]);

  const loadFeed = async () => {
    try {
      const data = await apiService.getFeed(userId);
      setFeedItems(data);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-slate-50/80 px-4 backdrop-blur-sm">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Feed</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-gray-200/50">
          <Plus size={24} />
        </button>
      </header>

      <main className="flex-1 space-y-6 p-4 pb-32">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <div className="relative">
              <img
                alt={item.title}
                className="aspect-square w-full object-cover"
                src={item.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-lg font-bold leading-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-gray-200">{item.source}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <button className="flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-100 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-gray-200">
                  <Bookmark size={20} />
                  <span>Save</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-100 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-gray-200">
                  <ListTodo size={20} />
                  <span>Task</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-100 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-gray-200">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <BottomNav activeTab="feed" onNavigate={onNavigate} />
    </div>
  );
}
