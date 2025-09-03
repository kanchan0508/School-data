-- School Management System Database Setup
-- Run this in your Supabase SQL Editor

-- Create schools table
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

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can make this more restrictive later)
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

-- Optional: Insert some sample data for testing
INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES
  ('Springfield Elementary', '123 Main Street, Building A', 'Springfield', 'Illinois', '5551234567', 'admin@springfield-elem.edu', 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Central High School', '456 Oak Avenue', 'Madison', 'Wisconsin', '5559876543', 'info@central-high.edu', 'https://5.imimg.com/data5/SELLER/Default/2022/1/MF/JD/XF/16643450/school-building-interior-design-service.JPG'),
  ('Riverside Academy', '789 River Road', 'Portland', 'Oregon', '5555551234', 'contact@riverside-academy.edu', 'https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (email_id) DO NOTHING;

-- Verify the setup
SELECT 'Setup complete! Schools table created with ' || COUNT(*) || ' sample schools.' as status
FROM schools;
