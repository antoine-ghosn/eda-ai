import { useState, useEffect } from 'react';
import { Search, MoreVertical, Heart, Plus } from 'lucide-react';
import { apiService, ApiTopic } from '../services/api';
import BottomNav from './BottomNav';

interface TopicsPageProps {
  onNavigate: (tab: string) => void;
  userId?: number;
}

export default function TopicsPage({ onNavigate, userId = 1 }: TopicsPageProps) {
  const [topics, setTopics] = useState<ApiTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, [userId]);

  const loadTopics = async () => {
    try {
      const data = await apiService.getTopics(userId);
      setTopics(data);
    } catch (error) {
      console.error('Error loading topics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-slate-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white/80 p-4 pb-3 pt-8 backdrop-blur-lg">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900">
          Topics
        </h1>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
            <Search size={24} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24">
        <div className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            {topics.map((topic, index) => {
              const isWide = index === 0 || (index > 0 && topics.length % 3 === 1 && index === topics.length - 2);

              return (
                <button
                  key={topic.id}
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${topic.colorFrom}, ${topic.colorTo})`,
                  }}
                  className={`group relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-[2rem] p-5 text-left transition-transform hover:scale-[1.02] ${
                    isWide ? 'col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold text-gray-800">{topic.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="transition-transform hover:scale-110"
                    >
                      <Heart
                        size={24}
                        className={`${
                          topic.isFavorite
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-500'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="self-end text-right">
                    <p className="text-sm font-medium text-gray-600">
                      {topic.itemCount} items
                    </p>
                  </div>
                </button>
              );
            })}

            <button className="flex h-48 w-full flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition-colors hover:border-slate-300 hover:bg-slate-100">
              <Plus size={32} />
              <p className="mt-2 text-sm font-medium">Add Topic</p>
            </button>
          </div>
        </div>
      </main>

      <BottomNav activeTab="topics" onNavigate={onNavigate} />
    </div>
  );
}
