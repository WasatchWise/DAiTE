# ✅ Vercel Environment Variables - Final Setup

## Add These Two Variables to Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

### 1. Supabase URL
```
Variable Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://ovjkwegrubzhcdgtjqvr.supabase.co
Environments: ✅ Production ✅ Preview ✅ Development
```

### 2. Supabase Anon Key (JWT Format)
```
Variable Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92amt3ZWdydWJ6aGNkZ3RqcXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMzQ0OTcsImV4cCI6MjA2ODgxMDQ5N30.zmD8i2hIjGzBuHYIwkwQYbgNL8twpDSCcHq_4muElxQ
Environments: ✅ Production ✅ Preview ✅ Development
```

## Steps

1. ✅ Add both variables (copy values exactly as shown above)
2. ✅ Check all three environments for each variable
3. ✅ Click **Save**
4. ✅ Go to **Deployments** tab
5. ✅ Click **...** on the latest deployment
6. ✅ Click **Redeploy**

## ✅ Verification

After redeploy, check:
- ✅ No "Invalid supabaseUrl" errors in browser console
- ✅ Supabase client initializes successfully
- ✅ App loads without Supabase connection errors

Your app should now work perfectly! 🚀

