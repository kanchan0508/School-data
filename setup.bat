@echo off
echo Setting up School Management System...
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Please update .env with your Supabase credentials!
    echo    1. Go to your Supabase project settings
    echo    2. Copy your Project URL and Anon Key
    echo    3. Replace the placeholder values in .env
    echo.
) else (
    echo .env file already exists
)

echo Installing dependencies...
npm install

echo.
echo Checking for security vulnerabilities...
npm audit fix

echo.
echo Setup complete! 
echo.
echo Next steps:
echo 1. Update .env with your Supabase credentials
echo 2. Run the database migration in Supabase SQL Editor
echo 3. Start the development server with: npm run dev
echo.
pause
