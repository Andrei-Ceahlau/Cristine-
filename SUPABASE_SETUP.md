# 🚀 Configurare Supabase pentru Cristine de casă

## 📋 Pași de configurare

### 1. Creează un proiect Supabase

1. Mergi la [supabase.com](https://supabase.com)
2. Creează un cont nou sau loghează-te
3. Click pe "New Project"
4. Alege organizația și numește proiectul "cristine-de-casa"
5. Alege regiunea: **Europe West (Frankfurt)** pentru latencie mică în România
6. Generează o parolă puternică pentru baza de date

### 2. Configurează variabilele de mediu

Înlocuiește în `src/config/supabase.ts`:

```typescript
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-anon-key';
```

**Unde să găsești aceste valori:**
- Mergi la Dashboard → Settings → API
- **Project URL** = `supabaseUrl`
- **anon public** key = `supabaseAnonKey`

### 3. Configurează autentificarea

În Dashboard → Authentication → Settings:

#### **Site URL:**
```
http://localhost:5173
```

#### **Redirect URLs:**
```
http://localhost:5173/**
https://yourdomain.com/**
```

### 4. Creează tabelele în baza de date

În Dashboard → SQL Editor, rulează aceste comenzi:

```sql
-- Tabela utilizatori
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela produse
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela comenzi
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  items JSONB NOT NULL, -- Array de OrderItem
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  delivery_address TEXT,
  delivery_date DATE,
  delivery_time TIME,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexuri pentru performanță
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_products_category ON products(category);
```

### 5. Configurează Row Level Security (RLS)

```sql
-- Activează RLS pentru toate tabelele
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Utilizatorii pot vedea și edita doar propriile date
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Produsele sunt vizibile pentru toți
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Doar adminii pot modifica produsele
CREATE POLICY "Only admins can modify products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Utilizatorii pot vedea propriile comenzi
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Utilizatorii pot crea comenzi
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Adminii pot vedea și modifica toate comenzile
CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );
```

### 6. Inserează date de test

```sql
-- Adaugă utilizator admin
INSERT INTO users (id, email, display_name, is_admin)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@cofetaria-cristine.com',
  'Admin Cristine',
  true
);

-- Adaugă produse de test
INSERT INTO products (name, description, price, category, image_url) VALUES
('Tort Cipriani', 'Tort clasic cu cremă și ciocolată', 120.00, 'Torturi', '/imagini-prezentare/tort talent.jpeg'),
('Choux Profiterol', 'Choux-uri cu cremă de vanilie', 8.50, 'Choux', '/imagini-prezentare/a3a.jpeg'),
('Tartă cu fructe', 'Tartă cu fructe de sezon', 45.00, 'Tarte', '/imagini-prezentare/a4a.jpeg'),
('Ecler cu ciocolată', 'Ecler clasic cu glazură de ciocolată', 7.00, 'Prăjituri clasice', '/imagini-prezentare/a5a.jpeg'),
('Cheesecake cu căpșuni', 'Cheesecake cu căpșini proaspete', 35.00, 'Specialități', '/imagini-prezentare/a 2 a.jpeg'),
('Tort fără zahăr', 'Tort diabetic cu indulcitori naturali', 95.00, 'Sugar Free', '/imagini-prezentare/WhatsApp Image 2025-09-26 at 12.35.30.jpeg');
```

### 7. Configurează Storage (opțional)

Pentru imagini:

1. Dashboard → Storage → Create bucket
2. Numele: `product-images`
3. Public bucket: **Da**
4. File size limit: 10MB
5. Allowed MIME types: `image/*`

## 🔧 Configurare finală

### Variabile de mediu (pentru producție)

Creează un fișier `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Și actualizează `src/config/supabase.ts`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## ✅ Verificare

1. **Testează autentificarea:**
   - Înregistrează un utilizator nou
   - Loghează-te cu admin@cofetaria-cristine.com

2. **Testează comenzi:**
   - Creează o comandă nouă
   - Verifică în Dashboard → Table Editor → orders

3. **Testează admin dashboard:**
   - Loghează-te ca admin
   - Verifică dacă poți vedea toate comenzile

## 🆘 Suport

- **Documentație Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Discord Supabase:** [discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues:** [github.com/supabase/supabase](https://github.com/supabase/supabase)

## 💰 Costuri

- **Planul gratuit:** 50,000 request-uri/lună
- **Pro plan:** $25/lună pentru 100,000 request-uri
- **Team plan:** $125/lună pentru 500,000 request-uri

Pentru o cofetărie mică, planul gratuit ar trebui să fie suficient!
