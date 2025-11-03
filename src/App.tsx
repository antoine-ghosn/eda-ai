import { useState, useEffect } from 'react';
import TopicsPage from './components/TopicsPage';
import TodoListsPage from './components/TodoListsPage';
import FeedPage from './components/FeedPage';
import ChatPage from './components/ChatPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import { AuthUser } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('topics');
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('eda_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (authUser: AuthUser) => {
    setUser(authUser);
    localStorage.setItem('eda_user', JSON.stringify(authUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('eda_user');
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const userId = parseInt(user.id);

  return (
    <>
      {activeTab === 'topics' && <TopicsPage onNavigate={handleNavigate} userId={userId} />}
      {activeTab === 'todo' && <TodoListsPage onNavigate={handleNavigate} userId={userId} />}
      {activeTab === 'feed' && <FeedPage onNavigate={handleNavigate} userId={userId} />}
      {activeTab === 'chat' && <ChatPage onNavigate={handleNavigate} />}
      {activeTab === 'profile' && <ProfilePage onNavigate={handleNavigate} onLogout={handleLogout} user={user} />}
    </>
  );
}

export default App;
