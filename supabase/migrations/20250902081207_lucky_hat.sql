/*
  # Create schools table

  1. New Tables
    - `schools`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `address` (text, required)
      - `city` (text, required)
      - `state` (text, required)
      - `contact` (text, required)
      - `image` (text, optional)
      - `email_id` (text, required, unique)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `schools` table
    - Add policy for public read access
    - Add policy for authenticated users to insert data
*/

CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  contact text NOT NULL,
  image text,
  email_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view schools"
  ON schools
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert schools"
  ON schools
  FOR INSERT
  TO public
  WITH CHECK (true);