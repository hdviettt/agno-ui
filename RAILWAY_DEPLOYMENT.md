# Railway Deployment Guide - AgentUI

This guide will help you deploy the AgentUI to Railway to connect to your AgentOS backend.

## What's Configured

✅ **railway.json** - Railway deployment configuration
✅ **.env.local** - Pre-configured with your backend URL: `https://no-bullshit-agno-production.up.railway.app`

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
cd agent-ui
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

If you haven't set up a remote yet:
```bash
# Create a new repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Railway

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your agent-ui repository
5. Railway will automatically detect it's a Next.js app

### 3. Configure Environment Variable (Optional)

If you want to hardcode the backend URL, add this in Railway Variables tab:

```
NEXT_PUBLIC_AGENTOS_URL=https://no-bullshit-agno-production.up.railway.app
```

**Note:** You can also configure the backend URL directly in the UI after deployment.

### 4. Generate Public Domain

1. Go to **Settings** → **Networking** → **Generate Domain**
2. You'll get a URL like: `https://agent-ui.railway.app`

### 5. Access Your UI

Once deployed, open your Railway URL and you'll see the AgentUI connected to your backend!

The UI will:
- Connect to your AgentOS at `https://no-bullshit-agno-production.up.railway.app`
- Show all your agents (Outline Agent, Content Writer, Image Integration Agent)
- Provide a beautiful chat interface to interact with your AI SEO Content Team

## Architecture

```
┌─────────────────────────────┐
│   AgentUI (Frontend)        │
│   Next.js on Railway        │
│   Port: 3000                │
└─────────────┬───────────────┘
              │
              │ API Calls
              ▼
┌─────────────────────────────┐
│   AgentOS (Backend)         │
│   FastAPI on Railway        │
│   https://no-bullshit-agno- │
│   production.up.railway.app │
└─────────────────────────────┘
```

## Troubleshooting

### Build Fails
- Check Railway build logs
- Ensure Node.js 18+ is being used (Railway should auto-detect from package.json)

### Can't Connect to Backend
- Verify your backend URL in the UI settings (left sidebar)
- Check that your AgentOS is running at the configured URL
- Try accessing the backend directly: `https://no-bullshit-agno-production.up.railway.app/docs`

### CORS Issues
Your AgentOS (FastAPI) already has CORS enabled by default, so cross-origin requests should work.

## Cost Estimation

**AgentUI Deployment (Next.js):**
- ~100-200MB RAM usage
- Minimal CPU when idle
- Railway Free Tier: $5 credit/month

**Estimated cost for both services:** $10-20/month total

## Next Steps

After deployment:
1. ✅ Test the connection to your backend
2. ✅ Try creating a story: "Write a short story about space exploration"
3. ✅ Share the URL with your team!

---

**Both your backend and frontend are now running on Railway! 🎉**
