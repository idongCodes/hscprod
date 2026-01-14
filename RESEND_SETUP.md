# 🚀 Resend Setup - Quick Guide

## Step 1: Get Your API Key
1. Go to [https://resend.com](https://resend.com)
2. Sign up (free - takes 30 seconds)
3. Click "API Keys" in the left menu
4. Click "Create API Key"
5. Copy the key (starts with `re_`)

## Step 2: Add to Environment
Replace the placeholder in your `.env.local` file:

```bash
RESEND_API_KEY="re_your_actual_api_key_here"
```

## Step 3: Test the System
After adding your API key, restart the dev server and test:

```bash
# Test email sending
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"type": "test"}'

# Send feature announcement
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"type": "feature"}'
```

## 🎯 What You Get

### ✅ Client-Friendly Emails
- **Simple call-to-action**: "View Your Website" 
- **No admin links** - just the main site
- **Professional design** with GenZ vibes

### ✅ Automatic Notifications
- **New testimonial** → Instant email to huntercute13@gmail.com
- **Professional template** with testimonial details
- **Website link** for easy viewing

## 📧 Email Templates Ready

### Testimonial Notification:
- 🔥 Subject: "NEW TESTIMONIAL ALERT!"
- 📋 Shows fan name, title, message
- 🚀 Button: "View Your Website"

### Feature Announcement:
- 🔥 Subject: "HSC PROD - NEW TESTIMONIAL SYSTEM DROPPED!"
- 📝 Full feature breakdown in GenZ tone
- 🚀 Button: "Check Out Your Website"

## ⚡ Quick Test

Once you add your Resend API key, run this to test:

```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"type": "test"}'
```

**That's it! Your email system will be live!** 🎉

## 🎨 Email Design

- **Purple theme** matching your site
- **Professional layout** with clean design
- **Mobile-friendly** responsive design
- **GenZ tone** that matches your brand

**Ready to set up your Resend API key?** 🚀
