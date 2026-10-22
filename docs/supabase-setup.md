# Supabase Setup Guide for AURELLE Catalogue

Follow these steps to connect your Supabase project to the AURELLE catalogue.

---

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Choose an organization, enter **aurelle-catalogue** as project name, choose a secure database password, and select your preferred region.
4. Wait 1-2 minutes for the database to provision.

---

## 2. Run Database Migrations

Open the **SQL Editor** in the Supabase Dashboard sidebar and run each migration in order:

### Step 2.1: Create Products Table
Copy the entire content of [`001_create_products.sql`](file:///D:/catalouge/docs/migrations/001_create_products.sql) and paste it into a new query. Click **Run**.

### Step 2.2: Set Up RLS Policies & Admin Function
Copy the entire content of [`002_rls_policies.sql`](file:///D:/catalouge/docs/migrations/002_rls_policies.sql) and paste it into a new query. Click **Run**.

### Step 2.3: Set Up Storage Bucket & Policies
Copy the entire content of [`003_storage_policies.sql`](file:///D:/catalouge/docs/migrations/003_storage_policies.sql) and paste it into a new query. Click **Run**.

---

## 3. Create Administrator Account

There is no public registration form. The administrator account must be created through Supabase Auth:

1. In Supabase Dashboard, go to **Authentication** → **Users**.
2. Click **Add user** → **Create user**.
3. Enter your administrator email (e.g. `admin@aurelle.com`) and a strong password. Click **Create user**.
4. Now grant this user the `admin` role by running this SQL query in the **SQL Editor**:

```sql
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@aurelle.com'; -- Replace with your admin email
```

*(Note: If the user was already logged in, they must log out and log back in to refresh their JWT token).*

---

## 4. Get Project Credentials

1. In Supabase Dashboard, go to **Project Settings** (gear icon) → **API**.
2. Find:
   - **Project URL** (e.g. `https://xyzproject.supabase.co`)
   - **Project API Keys** → `anon` `public` key (safe to include in browser environment variables)
3. In your project root, create a file named `.env.local` (or copy `.env.example`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
VITE_WHATSAPP_NUMBER=919876543210
```

---

## 5. (Optional) Seed Sample Products

You can run [`seed_products.sql`](file:///D:/catalouge/docs/migrations/seed_products.sql) in the SQL Editor to populate sample products matching the UI reference mockup (`AU-NK-012`, `AU-RG-021`, `AU-BR-008`, `AU-BN-014`).
