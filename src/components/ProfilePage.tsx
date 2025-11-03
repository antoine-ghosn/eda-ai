import { useState } from 'react';
import { AtSign, Phone, User, ArrowLeft, LogOut } from 'lucide-react';
import BottomNav from './BottomNav';
import { AuthUser } from '../types';

interface ProfilePageProps {
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  user: AuthUser;
}

export default function ProfilePage({ onNavigate, onLogout, user }: ProfilePageProps) {
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSave = () => {
    console.log('Saving linked accounts:', { instagram, tiktok, whatsapp });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-slate-50/80 p-4 pb-2 backdrop-blur-lg">
        <button className="flex h-12 w-12 items-center justify-center text-slate-900">
          <ArrowLeft size={24} />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold text-slate-900">
          Profile
        </h2>
        <div className="h-12 w-12"></div>
      </header>

      <main className="flex-grow pb-40">
        <div className="mt-4 flex flex-col items-center p-4">
          <div className="flex flex-col items-center gap-4">
            <div
              className="aspect-square min-h-32 w-32 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop")',
              }}
            ></div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-[22px] font-bold leading-tight tracking-tight text-slate-900">
                {user.full_name}
              </p>
              <p className="text-center text-base font-normal leading-normal text-slate-600">
                {user.email}
              </p>
              <span className="mt-1 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {user.account_type}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4">
          <h3 className="px-0 pb-2 pt-6 text-lg font-bold leading-tight tracking-tight text-slate-900">
            Linked Accounts
          </h3>

          <div className="flex w-full flex-wrap items-end gap-4 py-3">
            <label className="flex min-w-40 flex-1 flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-slate-900">
                Instagram
              </p>
              <div className="relative flex items-center">
                <AtSign className="absolute left-4 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-500 focus:border-blue-600 focus:outline-0 focus:ring-2 focus:ring-blue-600/50"
                  placeholder="username"
                />
              </div>
            </label>
          </div>

          <div className="flex w-full flex-wrap items-end gap-4 py-3">
            <label className="flex min-w-40 flex-1 flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-slate-900">
                TikTok
              </p>
              <div className="relative flex items-center">
                <svg
                  className="absolute left-4 h-5 w-5 text-slate-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.18 8.33a4.33 4.33 0 0 1-4-1.74 4.14 4.14 0 0 1-1.42-3.11v10.4a5.16 5.16 0 0 1-5.17 5.17A5.16 5.16 0 0 1 5.42 14a5.16 5.16 0 0 1 5.17-5.17h.34V4.58h-.34a9.42 9.42 0 0 0-9.42 9.42 9.42 9.42 0 0 0 9.42 9.42 9.42 9.42 0 0 0 9.42-9.42V10a6.52 6.52 0 0 0-3.33-1.67Z"></path>
                </svg>
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  className="flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-500 focus:border-blue-600 focus:outline-0 focus:ring-2 focus:ring-blue-600/50"
                  placeholder="your_handle"
                />
              </div>
            </label>
          </div>

          <div className="flex w-full flex-wrap items-end gap-4 py-3">
            <label className="flex min-w-40 flex-1 flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-slate-900">
                WhatsApp
              </p>
              <div className="relative flex items-center">
                <Phone className="absolute left-4 h-5 w-5 text-slate-500" />
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-500 focus:border-blue-600 focus:outline-0 focus:ring-2 focus:ring-blue-600/50"
                  placeholder="phone_number"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="px-4 pt-8">
          <button
            onClick={handleSave}
            className="mb-4 flex h-14 w-full items-center justify-center rounded-xl bg-blue-600 text-base font-bold leading-normal text-white transition-transform duration-200 active:scale-[0.98] hover:bg-blue-700"
          >
            Save Changes
          </button>

          <button
            onClick={onLogout}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-red-50 text-base font-bold leading-normal text-red-600 transition-colors hover:bg-red-100"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </main>

      <BottomNav activeTab="profile" onNavigate={onNavigate} />
    </div>
  );
}
