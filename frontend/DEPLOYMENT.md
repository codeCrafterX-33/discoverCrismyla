# Deployment Guide

This project is split into two parts:
1. **Frontend** - Next.js static site (deploy to Hostinger)
2. **Backend** - Express API server (deploy to Node.js hosting)

## Frontend Deployment (Hostinger)

### 1. Build the static site

```bash
# Set your backend API URL (replace with your actual backend URL)
export NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com

# Build the static site
npm run build
```

This creates a `out/` folder with all static files.

### 2. Upload to Hostinger

1. Connect to your Hostinger hosting via FTP/SFTP
2. Upload all files from the `out/` folder to your `public_html` directory
3. Make sure `index.html` is in the root of `public_html`

### 3. Environment Variables

Since this is a static export, environment variables are baked into the build. Make sure to set `NEXT_PUBLIC_API_BASE_URL` before building:

```bash
# Windows PowerShell
$env:NEXT_PUBLIC_API_BASE_URL="https://your-backend-api.com"
npm run build

# Linux/Mac
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com npm run build
```

## Backend Deployment

### Option 1: Railway (Recommended - Free tier available)

1. Push backend folder to GitHub
2. Go to [railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Select your backend repository
5. Add environment variables from `.env.example`
6. Deploy!

### Option 2: Render (Free tier available)

1. Push backend folder to GitHub
2. Go to [render.com](https://render.com)
3. New → Web Service
4. Connect GitHub repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy!

### Option 3: Any Node.js Hosting

1. Upload backend folder to your server
2. SSH into server
3. Run:
   ```bash
   cd backend
   npm install
   npm start
   ```
4. Use PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name crismyla-api
   pm2 save
   ```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
```

### Backend (.env)
```
EMAILJS_PUBLIC_KEY=your_key
EMAILJS_PRIVATE_KEY=your_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_ORDER_TEMPLATE_ID=your_order_template_id
NEWSLETTER_TO_EMAIL=your_email@example.com
CUSTOMER_INFO_EMAILJS_TEMPLATE_ID=your_template_id
CUSTOMER_INFO_TO_EMAIL=your_email@example.com
PORT=3001
```

## Testing

1. Start backend: `cd backend && npm start`
2. Build frontend: `NEXT_PUBLIC_API_BASE_URL=http://localhost:3001 npm run build`
3. Serve frontend: Use a static file server or `npx serve out`

## Troubleshooting

- **CORS errors**: Make sure backend has CORS enabled (already configured)
- **API not found**: Check `NEXT_PUBLIC_API_BASE_URL` is set correctly
- **Build fails**: Make sure all dependencies are installed

