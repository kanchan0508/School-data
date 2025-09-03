# Setup Instructions for School Management System

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Login with GitHub
4. Click "New project"
5. Choose your organization
6. Fill in:
   - Project name: `school-management`
   - Database password: (create a strong password)
   - Region: (choose closest to you)
7. Click "Create new project"
8. Wait for project setup (2-3 minutes)

## 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy your:
   - Project URL
   - Anon (public) key

## 3. Set up Database Schema

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New query"
3. Copy and paste this SQL code:

```sql
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

-- Create policies for public access
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
```

4. Click "RUN" to execute the SQL

## 4. Update Environment Variables

Update the `.env` file with your actual Supabase credentials:
- Replace `your_supabase_url` with your Project URL
- Replace `your_supabase_anon_key` with your Anon key

## 5. Test the Application

1. Run `npm run dev`
2. Open http://localhost:5173
3. Try adding a school
4. Check if it appears in the schools list

## 6. Deploy to Vercel (Optional)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel settings
5. Deploy!
