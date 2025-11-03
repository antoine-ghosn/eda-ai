/*
  # EDA App Initial Schema

  ## Overview
  This migration creates the foundational schema for EDA (productivity AI assistant),
  including topics, tasks, messages, booklets, and user settings.

  ## New Tables

  ### 1. `topics`
  Categorization system for organizing content
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `name` (text) - Topic name (e.g., "Health", "Travel")
  - `color_from` (text) - Gradient start color
  - `color_to` (text) - Gradient end color
  - `item_count` (integer) - Number of items in topic
  - `is_favorite` (boolean) - Whether topic is favorited
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. `tasks`
  Task management system
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `topic_id` (uuid, references topics, nullable)
  - `title` (text)
  - `description` (text, nullable)
  - `status` (text) - 'todo', 'in_progress', 'done'
  - `priority` (text) - 'low', 'medium', 'high'
  - `due_date` (timestamptz, nullable)
  - `completed_at` (timestamptz, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `messages`
  Unified inbox messages from various sources
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `source` (text) - 'email', 'slack', 'dm', 'mention', 'alert'
  - `sender` (text)
  - `subject` (text, nullable)
  - `content` (text)
  - `is_read` (boolean)
  - `is_archived` (boolean)
  - `received_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 4. `user_settings`
  User preferences and connected services
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, unique)
  - `connected_services` (jsonb) - Connected integrations
  - `notification_preferences` (jsonb)
  - `theme` (text) - 'light' or 'dark'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Policies for SELECT, INSERT, UPDATE, DELETE operations
*/

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  color_from text NOT NULL DEFAULT 'from-blue-100',
  color_to text NOT NULL DEFAULT 'to-blue-50',
  item_count integer DEFAULT 0,
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own topics"
  ON topics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topics"
  ON topics FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topics"
  ON topics FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own topics"
  ON topics FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  topic_id uuid REFERENCES topics,
  title text NOT NULL,
  description text,
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  source text NOT NULL CHECK (source IN ('email', 'slack', 'dm', 'mention', 'alert')),
  sender text NOT NULL,
  subject text,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  is_archived boolean DEFAULT false,
  received_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  connected_services jsonb DEFAULT '[]'::jsonb,
  notification_preferences jsonb DEFAULT '{}'::jsonb,
  theme text DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_topics_user_id ON topics(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_topic_id ON tasks(topic_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);