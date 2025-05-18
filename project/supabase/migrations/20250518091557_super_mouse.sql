/*
  # Add reviews table

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `username` (text, not null)
      - `content` (text, not null) 
      - `verified` (boolean, default false)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on reviews table
    - Add policies for public read access
    - Add policies for authenticated users to manage reviews
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  content text NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read reviews
CREATE POLICY "Allow public read access to reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage reviews
CREATE POLICY "Allow authenticated users to manage reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);