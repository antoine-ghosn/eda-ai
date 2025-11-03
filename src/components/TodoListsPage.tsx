import { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { apiService, ApiTask } from '../services/api';
import BottomNav from './BottomNav';

interface TodoListsPageProps {
  onNavigate: (tab: string) => void;
  userId?: number;
}

export default function TodoListsPage({ onNavigate, userId = 1 }: TodoListsPageProps) {
  const [activeTasks, setActiveTasks] = useState<ApiTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ApiTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    try {
      const [active, completed] = await Promise.all([
        apiService.getActiveTasks(userId),
        apiService.getCompletedTasks(userId),
      ]);
      setActiveTasks(active);
      setCompletedTasks(completed);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: number, currentState: boolean) => {
    try {
      await apiService.updateTask(taskId, { completed: !currentState });
      await loadTasks();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-50 to-red-100/50 border-red-200';
      case 'medium':
        return 'from-blue-50 to-blue-100/50 border-blue-200';
      default:
        return 'from-orange-50 to-orange-100/50 border-orange-200';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-slate-600';
      default:
        return 'text-amber-600';
    }
  };

  const formatDueDate = (dueDate: string | undefined) => {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Due: Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Due: Tomorrow';
    } else {
      return `Due: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
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
      <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md">
        <div className="flex items-center p-4">
          <h1 className="flex-1 text-3xl font-bold tracking-tight text-slate-900">
            To Do Lists
          </h1>
          <button className="flex h-10 w-10 items-center justify-center text-slate-500">
            <MoreHorizontal size={24} />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-32">
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold text-slate-900">Today</h2>
        </div>

        <div className="flex flex-col gap-4 px-4">
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className={`flex flex-col gap-3 rounded-3xl bg-gradient-to-br p-4 shadow-sm border border-white ${getPriorityColor(
                task.priority
              )}`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id, task.completed)}
                  className="mt-1 h-5 w-5 rounded-md border-2 bg-transparent focus:ring-2 focus:ring-offset-2"
                />
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-base font-semibold leading-tight text-slate-900">
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p
                      className={`mt-1 text-sm font-medium leading-normal ${getPriorityTextColor(
                        task.priority
                      )}`}
                    >
                      {formatDueDate(task.dueDate)}
                    </p>
                  )}
                </div>
                {task.thumbnailUrl && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      alt={task.title}
                      className="h-full w-full object-cover"
                      src={task.thumbnailUrl}
                    />
                  </div>
                )}
              </div>
              {task.category && (
                <div className="flex items-center gap-2 pl-[36px]">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/60 px-2.5 py-1 text-xs font-medium text-slate-600">
                    <span>{task.category}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {completedTasks.length > 0 && (
          <>
            <div className="px-4 py-4 mt-4">
              <h2 className="text-lg font-bold text-slate-900">Completed</h2>
            </div>
            <div className="flex flex-col gap-4 px-4">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm border border-white opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id, task.completed)}
                      className="mt-1 h-5 w-5 rounded-md border-2 border-gray-300 bg-transparent text-gray-500"
                    />
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-medium leading-tight text-slate-400 line-through">
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="mt-1 text-sm font-normal leading-normal text-slate-400">
                          {formatDueDate(task.dueDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <BottomNav activeTab="todo" onNavigate={onNavigate} />
    </div>
  );
}
