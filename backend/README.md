# Crismyla Backend API

Express server for handling API requests from the Crismyla frontend.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your EmailJS credentials:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `POST /api/newsletter` - Newsletter subscription
- `POST /api/customer-info` - Customer information form
- `POST /api/order` - Order submission
- `GET /health` - Health check

## Deployment

Deploy to any Node.js hosting service (Railway, Render, Heroku, etc.)

Make sure to set all environment variables in your hosting platform.

