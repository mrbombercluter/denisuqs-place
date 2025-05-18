/*
  # Add admin tracking and IP blacklisting

  1. New Tables
    - `blacklisted_ips`
      - `ip` (text, primary key)
      - `created_at` (timestamp)
      - `created_by` (text)
    - `admin_logins`
      - `ip` (text, primary key)
      - `last_login` (timestamp)

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS blacklisted_ips (
  ip text PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  created_by text NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_logins (
  ip text PRIMARY KEY,
  last_login timestamptz DEFAULT now()
);

ALTER TABLE blacklisted_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to blacklisted_ips for authenticated users"
  ON blacklisted_ips
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert and delete on blacklisted_ips for authenticated users"
  ON blacklisted_ips
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all access to admin_logins for authenticated users"
  ON admin_logins
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);