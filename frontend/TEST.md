# Testing Guide

## Step 1: Set up Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example` and fill in your EmailJS credentials):
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

4. Edit `.env` and add your EmailJS credentials

5. Start the backend server:
```bash
npm start
```

You should see: `🚀 Backend server running on port 3001`

## Step 2: Test Backend API

Open a new terminal and test the health endpoint:
```bash
# Windows PowerShell
curl http://localhost:3001/health

# Or use browser: http://localhost:3001/health
```

You should get: `{"status":"ok","timestamp":"..."}`

## Step 3: Build Frontend

1. Open a NEW terminal (keep backend running)

2. Navigate to project root:
```bash
cd ..
```

3. Set the backend URL and build:
```bash
# Windows PowerShell
$env:NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
npm run build

# Linux/Mac
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001 npm run build
```

4. Serve the static build:
```bash
npx serve out
```

Or use any static file server. The site will be available at `http://localhost:3000` (or the port shown)

## Step 4: Test Frontend Features

1. **Homepage** - Should load correctly
2. **Newsletter Form** (in footer) - Try subscribing
3. **Customer Info Form** (on homepage) - Try submitting
4. **Add to Cart** - Add products
5. **Order Form** - Try submitting an order

All forms should connect to your backend at `http://localhost:3001`

## Troubleshooting

- **Backend won't start**: Check if port 3001 is already in use
- **CORS errors**: Backend already has CORS enabled, should work
- **API calls fail**: Make sure backend is running and `NEXT_PUBLIC_API_BASE_URL` is set correctly
- **Build fails**: Make sure you're in the project root, not the backend folder

