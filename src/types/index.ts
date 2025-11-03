export interface Topic {
  id: string;
  user_id: string;
  name: string;
  color_from: string;
  color_to: string;
  item_count: number;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  topic_id: string | null;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  source: 'email' | 'slack' | 'dm' | 'mention' | 'alert';
  sender: string;
  subject: string | null;
  content: string;
  is_read: boolean;
  is_archived: boolean;
  received_at: string;
  created_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  connected_services: any[];
  notification_preferences: Record<string, any>;
  theme: 'light' | 'dark';
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  account_type: 'personal' | 'professional' | 'enterprise';
  avatar_url: string | null;
  instagram: string | null;
  tiktok: string | null;
  whatsapp: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  username: string;
  full_name: string;
  email: string;
  account_type: 'personal' | 'professional' | 'enterprise';
}
