import { useState } from 'react';
import { User, Lock, Mail, Brain } from 'lucide-react';
import { AuthUser } from '../types';
import { apiService } from '../services/api';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState<'personal' | 'professional' | 'enterprise'>('personal');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const apiUser = await apiService.login(username, password);
      const authUser: AuthUser = {
        id: apiUser.id.toString(),
        username: apiUser.username,
        full_name: apiUser.fullName,
        email: apiUser.email,
        account_type: apiUser.accountType as 'personal' | 'professional' | 'enterprise',
      };
      onLogin(authUser);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !fullName || !email) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const apiUser = await apiService.register({
        username,
        password,
        fullName,
        email,
        accountType,
      });
      const authUser: AuthUser = {
        id: apiUser.id.toString(),
        username: apiUser.username,
        full_name: apiUser.fullName,
        email: apiUser.email,
        account_type: apiUser.accountType as 'personal' | 'professional' | 'enterprise',
      };
      onLogin(authUser);
    } catch (err) {
      setError('Registration failed. Username may already exist.');
    }
  };

  const accountTypes = [
    {
      id: 'personal',
      name: 'Personal',
      description: 'For individual use',
      icon: '👤',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For professionals',
      icon: '💼',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For organizations',
      icon: '🏢',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900">EDA</h1>
          <p className="mt-2 text-slate-600">Your AI productivity assistant</p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="flex">
            <button
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                !isSignup
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-4 text-center font-semibold transition-colors ${
                isSignup
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="p-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {isSignup && (
              <>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="username"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isSignup && (
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Account Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {accountTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setAccountType(type.id as any)}
                      className={`flex flex-col items-center rounded-xl border-2 p-3 transition-all ${
                        accountType === type.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="mb-1 text-2xl">{type.icon}</span>
                      <span className="text-xs font-semibold text-slate-900">
                        {type.name}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-center text-xs text-slate-500">
                  {accountTypes.find((t) => t.id === accountType)?.description}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSignup ? 'Create Account' : 'Login'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Demo: Use any username/password to login
        </p>
      </div>
    </div>
  );
}
