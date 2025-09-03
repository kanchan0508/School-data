-- Safe Database Setup - Only adds sample data
-- Run this if you get policy conflicts

-- Just insert sample data (will skip if emails already exist)
INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES
  ('Springfield Elementary', '123 Main Street, Building A', 'Springfield', 'Illinois', '5551234567', 'admin@springfield-elem.edu', 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Central High School', '456 Oak Avenue', 'Madison', 'Wisconsin', '5559876543', 'info@central-high.edu', 'https://images.pexels.com/photos/159844/school-building-159844.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Riverside Academy', '789 River Road', 'Portland', 'Oregon', '5555551234', 'contact@riverside-academy.edu', 'https://images.pexels.com/photos/289740/pexels-photo-289740.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Oakwood High School', '321 Oak Street', 'Denver', 'Colorado', '5551239876', 'info@oakwood-high.edu', 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Sunset Elementary', '654 Sunset Boulevard', 'Los Angeles', 'California', '5559871234', 'admin@sunset-elem.edu', 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT (email_id) DO NOTHING;

-- Check what's in the table
SELECT 
  name, 
  city, 
  state, 
  email_id,
  CASE 
    WHEN image IS NOT NULL THEN '✅ Has image' 
    ELSE '❌ No image' 
  END as image_status
FROM schools 
ORDER BY created_at DESC;

-- Count total schools
SELECT COUNT(*) as total_schools FROM schools;
