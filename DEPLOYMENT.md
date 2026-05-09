# Deployment Instructions

## Your Code is Protected! 

Your **source code** stays private in the main repository.
Only the **minified/obfuscated** version in the `dist` folder will be public.

---

## Step 1: Create a New Public Repository for Deployment

1. Go to https://github.com/new
2. Repository name: `leben-trainer-app` (or any name you prefer)
3. Make it **Public** (required for AdSense)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

---

## Step 2: Push the Minified Build

Run these commands from the `dist` folder:

```powershell
cd dist
git remote add origin https://github.com/candicetinamartins/leben-trainer-app.git
git branch -M main
git push -u origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your new repository: https://github.com/candicetinamartins/leben-trainer-app
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** → Folder: **/ (root)**
5. Click **Save**

Your app will be live at:
```
https://candicetinamartins.github.io/leben-trainer-app/
```

---

## Step 4: Set Up Google AdSense

1. Go to https://adsense.google.com
2. Sign up with `candicemartins@gmail.com`
3. Enter your site URL: `https://candicetinamartins.github.io/leben-trainer-app/`
4. Get your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)
5. Create 2 ad units and get their Slot IDs

---

## Step 5: Update AdSense Credentials

Tell me your:
- Publisher ID: `ca-pub-XXXXXXXXXXXXXXXX`
- Drawer Ad Slot ID: `1234567890`
- Break Ad Slot ID: `0987654321`

I'll update the source code, rebuild, and you can redeploy.

---

## Updating Your App

Whenever you make changes:

1. Edit files in the main project folder (NOT in `dist`)
2. Run: `node build.js`
3. Commit and push the `dist` folder to the public repo
4. Your source code stays private!

---

## Two Repositories:

1. **Leben-In-Deutschland-Trainer** (PRIVATE) - Your source code
2. **leben-trainer-app** (PUBLIC) - Minified deployment only

People can see the deployed app but can't easily steal your code because it's minified and obfuscated.
