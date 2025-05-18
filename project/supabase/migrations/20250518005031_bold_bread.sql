/*
  # Create tracking tables for visits and clicks

  1. New Tables
    - `visits`
      - `id` (uuid, primary key)
      - `ip` (text)
      - `user_agent` (text)
      - `created_at` (timestamp)
    - `clicks`
      - `id` (uuid, primary key)
      - `button_name` (text)
      - `ip` (text)
      - `count` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read data
*/

-- Create visits table
CREATE TABLE IF NOT EXISTS visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create clicks table
CREATE TABLE IF NOT EXISTS clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  button_name text NOT NULL,
  ip text NOT NULL,
  count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(button_name, ip)
);

-- Enable RLS
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow insert for all" ON visits
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow insert and update for all" ON clicks
  FOR ALL TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read for authenticated users" ON visits
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow read for authenticated users" ON clicks
  FOR SELECT TO authenticated
  USING (true);