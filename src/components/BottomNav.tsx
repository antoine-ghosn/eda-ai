import { CheckSquare, Layers, MessageCircle, Grid3x3, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export default function BottomNav({ activeTab, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'todo', icon: CheckSquare, label: 'To Do Lists' },
    { id: 'feed', icon: Layers, label: 'Feed' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', isCenter: true },
    { id: 'topics', icon: Grid3x3, label: 'Topics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 w-full max-w-md items-center justify-around border-t border-slate-200/80 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative -top-5 flex h-16 w-16 flex-col items-center justify-center gap-1.5 rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105"
              >
                <Icon size={28} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1.5 transition-colors ${
                isActive ? 'text-slate-900' : 'text-slate-500'
              }`}
            >
              <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
              <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
