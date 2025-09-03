# School Management System

A modern React-based school directory application that allows users to add, search, and view school information.

## Features

- 📚 Add new schools with detailed information
- 🔍 Search and filter schools by name, city, or state
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS
- 💾 Real-time database with Supabase

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd school-management-system
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database
Run the SQL commands from `database-setup.sql` in your Supabase SQL editor.

5. Start the development server
```bash
npm run dev
```

## Deployment

This project is ready to deploy on Vercel, Netlify, or any other static hosting platform.

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## Project Structure

```
src/
├── components/          # Reusable UI components
├── lib/                # Database and utility functions
├── pages/              # Main application pages
├── App.tsx             # Main app component
└── main.tsx           # Application entry point
```

## License

MIT License