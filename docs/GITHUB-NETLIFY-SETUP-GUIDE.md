---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502210089fb69d1830a0336cd557d28bdcbbdb6e139fef36e5f134e9f9a46f463115eda0220364d098a86d8d5bdb628ee2e9f56d1e760f77ad5663c833a1cd659680b59fdf3
    ReservedCode2: 304402200b122265b400b165f1cd6f2c82953d80e34166d155e8c0b9e772684784a9746802200ace6ea76a0e80f6b61d215ccb1b6874420cb03171b2d7b75a915653c88962c2
---

# Three Squirrels Overseas Website - GitHub + Netlify Setup Guide

## Overview

This guide will help you set up continuous deployment for the Three Squirrels Overseas website using GitHub and Netlify. This approach provides:

- **Free hosting** (Netlify's free tier)
- **Automatic deployment** when you push changes to GitHub
- **Global CDN** for fast loading worldwide
- **Custom domain support**
- **HTTPS automatically enabled**

---

## Prerequisites

You will need:
1. A **GitHub** account (free)
2. A **Netlify** account (free)

---

## Step 1: Create GitHub Repository

### 1.1 Go to GitHub
Visit [https://github.com](https://github.com) and sign in to your account.

### 1.2 Create New Repository
1. Click the **"+"** button in the top right corner
2. Select **"New repository"**
3. Fill in the details:
   - **Repository name**: `three-squirrels-overseas`
   - **Description**: `Three Squirrels Overseas Center - Multilingual B2B Website`
   - **Visibility**: Choose **Public** or **Private** as needed
   - **DO NOT** check "Add a README file" (we already have content)
   - **DO NOT** check "Add .gitignore" (we already have one)
4. Click **"Create repository"**

### 1.3 Upload Your Files
After creating the repository, you have two options:

#### Option A: Upload Files via GitHub Web Interface
1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop all files from the website folder (except the zip file)
3. Click **"Commit changes"**

#### Option B: Use Git Command Line
```bash
# Navigate to your website folder
cd path/to/three-squirrels-overseas

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Three Squirrels Overseas website"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/three-squirrels-overseas.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Connect to Netlify

### 2.1 Sign Up/Login to Netlify
1. Go to [https://www.netlify.com](https://www.netlify.com)
2. Click **"Sign up"** if you don't have an account, or **"Log in"** if you do
3. You can sign up using your **GitHub account** for easiest integration

### 2.2 Deploy Your Site
#### Option A: Deploy from GitHub (Recommended)
1. On Netlify dashboard, click **"Add new site"**
2. Select **"Import an existing project"**
3. Choose **"GitHub"** as your Git provider
4. Authorize Netlify to access your GitHub repositories (if first time)
5. Select the `three-squirrels-overseas` repository
6. Configure build settings:
   - **Build command**: Leave empty (static site, no build needed)
   - **Publish directory**: `/`
7. Click **"Deploy site"**

#### Option B: Drag & Drop
1. On Netlify dashboard, click **"Add new site"**
2. Select **"Deploy manually"**
3. Drag and drop your website folder
4. Your site will be deployed instantly

---

## Step 3: Configure Domain (Optional)

### 3.1 Set Up Custom Domain
If you have a domain (e.g., `threesquirrelsoverseas.com`):

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Netlify will provide DNS records to add
5. Add the DNS records at your domain registrar
6. Wait for DNS propagation (can take up to 48 hours)
7. HTTPS will be automatically enabled

### 3.2 Netlify Subdomain
Your site will be available at a subdomain like:
`https://your-site-name.netlify.app`

You can rename it in **Site settings** → **General** → **Site name**

---

## Step 4: Update Content

### 4.1 Update Translations
To update content in any language, edit the corresponding JSON file in the `i18n/` folder:

| Language | File |
|----------|------|
| English | `i18n/en.json` |
| Chinese | `i18n/zh.json` |
| Korean | `i18n/ko.json` |
| Malay | `i18n/ms.json` |
| Vietnamese | `i18n/vi.json` |

### 4.2 Push Changes
After making changes:
```bash
git add .
git commit -m "Updated [language] translations"
git push
```

Netlify will automatically detect the push and redeploy your site.

---

## Step 5: Set Up HTTPS (Auto-enabled)

Netlify automatically provides free SSL/TLS certificates through Let's Encrypt.

To enable:
1. Go to **Site settings** → **Domain management** → **HTTPS**
2. Click **"Verify DNS configuration"**
3. Click **"Provision certificate"**

---

## Benefits of This Setup

| Feature | Benefit |
|---------|---------|
| **Automatic Deployments** | Push changes → Site updates automatically |
| **Rollback** | One-click rollback to previous versions |
| **Branches** | Create preview URLs for changes before merging |
| **Forms** | Netlify Forms for collecting inquiries |
| **Split Testing** | A/B test different versions |
| **Analytics** | Built-in site analytics (optional) |
| **Edge Functions** | Serverless functions if needed later |

---

## Troubleshooting

### Site Not Updating
1. Check the Netlify deploy log
2. Ensure the publish directory is set to `/`
3. Check that the `netlify.toml` is in the repository root

### Build Errors
- For static sites, there should be no build errors
- Ensure `netlify.toml` specifies no build command

### Domain Not Working
- DNS changes can take up to 48 hours
- Ensure you added all DNS records provided by Netlify
- Check for typos in DNS records

---

## File Structure

```
three-squirrels-overseas/
├── index.html              # Homepage
├── about.html              # About page
├── videos.html             # Videos page
├── products.html           # Products listing
├── product-detail.html     # Product detail
├── contact.html            # Contact page
├── css/
│   └── styles.css         # Styles
├── js/
│   ├── i18n.js            # Multilingual system
│   └── main.js            # Main JavaScript
├── i18n/                   # Translation files
│   ├── en.json            # English
│   ├── zh.json            # Chinese
│   ├── ko.json            # Korean
│   ├── ms.json            # Malay
│   └── vi.json            # Vietnamese
├── netlify.toml           # Netlify configuration
└── .gitignore             # Git ignore rules
```

---

## Support

- **Netlify Documentation**: https://docs.netlify.com/
- **GitHub Documentation**: https://docs.github.com/
- **Netlify Community**: https://community.netlify.com/

---

## Estimated Time to Complete

| Step | Time |
|------|------|
| Create GitHub repo | 5 minutes |
| Upload files | 3 minutes |
| Connect to Netlify | 5 minutes |
| Configure domain (optional) | 15-30 minutes |
| **Total** | **15-45 minutes** |

---

*Last updated: March 2026*
