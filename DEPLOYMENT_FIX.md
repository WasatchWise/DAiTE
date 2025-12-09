# Vercel Deployment Fix

## The Problem
Vercel says: `The specified Root Directory "frontend/" does not exist.`

## Solutions

### Option 1: Remove Trailing Slash (TRY THIS FIRST)
In Vercel Dashboard → Settings → General → Root Directory:
- ❌ Change from: `frontend/`
- ✅ Change to: `frontend` (no trailing slash)

Vercel might be strict about the path format.

### Option 2: Verify Directory is Committed
Make sure the `frontend/` directory and its files are committed to git:

```bash
git status
git add frontend/
git commit -m "Add frontend directory"
git push
```

If `frontend/` is in `.gitignore`, Vercel won't see it.

### Option 3: Check Case Sensitivity
Make sure the case matches exactly:
- `frontend` (lowercase) ✅
- `Frontend` (capital F) ❌
- `FRONTEND` (all caps) ❌

### Option 4: Verify Repository Structure
Vercel needs to see:
```
DAiTE/
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   └── src/
```

If these files don't exist in the repository, Vercel can't build.

## Quick Check Commands

Run these locally to verify:

```bash
# Check if frontend exists
ls -la frontend/

# Check if package.json exists
ls -la frontend/package.json

# Check if it's in git (if repo is initialized)
git ls-files frontend/ | head -5
```

## Recommended Steps

1. **First, try removing the trailing slash** - Set Root Directory to `frontend` (not `frontend/`)
2. **Verify git commit** - Make sure `frontend/` is committed
3. **Redeploy** - Trigger a new deployment
4. **Check build logs** - Should see "Installing dependencies" and "next build"
