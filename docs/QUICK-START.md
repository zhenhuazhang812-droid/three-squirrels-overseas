---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3044022015beee8557a597aa87db9b0ce9f170ae26b54b1de9d0266405f3b6a1f55e560902205b7169775869619043e1669c9e5fbb95067b2819aca267c8cab876fbdfaa7404
    ReservedCode2: 3045022100ae9f2cf91419656282837a7e1fdaebba3c183eaab24b139c2477fc2ff575dd7702201d667cd60e18652dcb1a5f1c508d6f29a5f545f30d19f5dfe363e71160bcc75d
---

# Quick Start Guide - Three Squirrels Overseas Website

## 5-Minute Quick Setup

### Option A: Netlify (Fastest - 5 minutes)

1. **Go to Netlify**
   - Visit: https://app.netlify.com/drop
   - Log in or sign up with GitHub

2. **Deploy Instantly**
   - Drag the `three-squirrels-overseas` folder directly to Netlify's drop zone
   - Your site will be live instantly!

3. **Done!** 🎉
   - You'll get a temporary URL like `random-name-12345.netlify.app`
   - Rename it in Site Settings → Site Name

---

### Option B: GitHub + Netlify (Recommended for Updates)

#### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. Name: `three-squirrels-overseas`
4. Click **"Create repository"**

#### Step 2: Upload Files
1. On your new repo, click **"uploading an existing file"**
2. Drag ALL files from the website folder
3. Click **"Commit changes"**

#### Step 3: Connect to Netlify
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **"GitHub"**
4. Choose the `three-squirrels-overseas` repository
5. Click **"Deploy site"**

---

## How to Update Content

### Update Translations

Edit the JSON files in `i18n/` folder:

```json
// Example: Change homepage title in English
// File: i18n/en.json
{
  "hero": {
    "title": "YOUR NEW TITLE HERE<br>For the World"
  }
}
```

### Update HTML Content

Edit the HTML files directly (e.g., `index.html`).

### After Changes

If using GitHub + Netlify:
```bash
git add .
git commit -m "Updated content"
git push
```
**Netlify will automatically rebuild and deploy!**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Site not loading | Check Netlify deploy logs |
| Changes not showing | Clear browser cache, or check deploy status |
| Build failed | Ensure publish directory is `/` (root) |

---

## Need Help?

See the full guide: `docs/GITHUB-NETLIFY-SETUP-GUIDE.md`
