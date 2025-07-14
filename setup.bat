@echo off
echo ========================================
echo Business Services Directory Setup
echo ========================================
echo.

echo Installing dependencies...
echo.

echo [1/3] Installing root dependencies...
call npm install

echo.
echo [2/3] Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo [3/3] Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Set up PostgreSQL database
echo 2. Update backend/.env with your database credentials
echo 3. Run 'npm run init-db' to initialize the database
echo 4. Run 'npm run dev' to start both frontend and backend
echo.
echo For detailed instructions, see README.md
echo.
pause
