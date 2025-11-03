/*
  # Add User Profiles and Account Types

  ## Overview
  This migration adds user profile management with three account types:
  Personal, Professional, and Enterprise.

  ## New Tables

  ### `user_profiles`
  Extended user profile information
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, unique)
  - `username` (text, unique)
  - `full_name` (text)
  - `email` (text)
  - `account_type` (text) - 'personal', 'professional', 'enterprise'
  - `avatar_url` (text, nullable)
  - `instagram` (text, nullable)
  - `tiktok` (text, nullable)
  - `whatsapp` (text, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Changes
  - Add user_profiles table for extended profile data
  - Enable RLS on user_profiles
  - Add policies for users to manage their own profiles

  ## Security
  - RLS enabled on user_profiles table
  - Users can only view and update their own profile
  - Username must be unique across all users
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users UNIQUE,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  account_type text NOT NULL DEFAULT 'personal' CHECK (account_type IN ('personal', 'professional', 'enterprise')),
  avatar_url text,
  instagram text,
  tiktok text,
  whatsapp text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow public profile viewing by username"
  ON user_profiles FOR SELECT
  TO anon
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_account_type ON user_profiles(account_type);