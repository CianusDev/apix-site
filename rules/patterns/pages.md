# Pattern : Pages

Ce document décrit comment créer et structurer les **pages** dans ce projet Next.js avec l'App Router.

---

## ⚠️ Règles Fondamentales

### 1. Toutes les pages sont des Server Components

**OBLIGATOIRE** : Toutes les pages doivent être des **Server Components** (pas de `"use client"`).

```typescript
// ✅ BON - Server Component (par défaut)
export default async function UsersPage() {
  // ...
}

// ❌ INTERDIT - Client Component pour une page
"use client";
export default function UsersPage() {
  // ...
}
```

**Exceptions uniquement pour les fichiers spéciaux :**
- `error.tsx` - Doit être un Client Component (requis par Next.js)
- `loading.tsx` - Peut être un Client Component si nécessaire
- `not-found.tsx` - Peut être un Client Component si nécessaire

### 2. Utiliser createLoader pour le SSR

**OBLIGATOIRE** : Dès qu'une page nécessite de charger des données, utiliser le helper `createLoader`.

```typescript
// ✅ BON - Utilisation de createLoader
import { createLoader } from "@/lib/loader";

const loadData = createLoader("/users/[id]", async ({ params }) => {
  // Chargement des données
});

export default async function Page(props: typeof loadData.Props) {
  const data = await loadData(props);
  // ...
}

// ❌ INTERDIT - Fetch direct sans createLoader
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchData(id); // Ne pas faire ça
  // ...
}
```

---

## Structure de l'App Router

```
src/app/
├── layout.tsx              # Layout racine (obligatoire)
├── page.tsx                # Page d'accueil /
├── globals.css             # Styles globaux
├── error.tsx               # Page d'erreur (Client Component)
├── not-found.tsx           # Page 404 (Client Component)
├── loading.tsx             # UI de chargement
├── robots.ts               # Configuration robots.txt
├── sitemap.ts              # Génération du sitemap
│
├── (home)/                 # Route group (ne crée pas de segment URL)
│   ├── page.tsx            # Page /
│   └── post/
│       └── page.tsx        # Page /post
│
├── dashboard/
│   ├── layout.tsx          # Layout spécifique à /dashboard/*
│   ├── page.tsx            # Page /dashboard
│   └── settings/
│       └── page.tsx        # Page /dashboard/settings
│
└── users/
    ├── page.tsx            # Page /users
    └── [id]/
        └── page.tsx        # Page /users/:id (route dynamique)
```

---

## Utilisation de createLoader

### Pourquoi createLoader ?

Le helper `createLoader` offre plusieurs avantages :

1. **Typage automatique** des paramètres de route
2. **Cache React** intégré via `cache()`
3. **Structure cohérente** pour toutes les pages
4. **Meilleure organisation** du code de chargement

### Syntaxe

```typescript
import { createLoader } from "@/lib/loader";

const loader = createLoader(
  "/route/[param]",           // Route avec paramètres
  async ({ params, searchParams }) => {
    // params : paramètres de route (typés automatiquement)
    // searchParams : query string
    return data;              // Données à retourner
  }
);
```

### Exemple : Page avec paramètre dynamique

```typescript
// app/users/[id]/page.tsx
import { notFound } from "next/navigation";
import { createLoader } from "@/lib/loader";
import { getUserById } from "@/features/users/users.service";
import { UserProfile } from "@/features/users/components/user-profile";

const loadUser = createLoader("/users/[id]", async ({ params }) => {
  // params.id est typé automatiquement !
  const { success, data } = await getUserById(params.id);
  
  if (!success || !data) {
    notFound();
  }
  
  return data;
});

export default async function UserPage(props: typeof loadUser.Props) {
  const user = await loadUser(props);
  
  return (
    <main className="container mx-auto p-8">
      <UserProfile user={user} />
    </main>
  );
}
```

### Exemple : Page avec searchParams

```typescript
// app/products/page.tsx
import { createLoader } from "@/lib/loader";
import { getProducts } from "@/features/products/products.service";
import { ProductList } from "@/features/products/components/product-list";

const loadProducts = createLoader("/products", async ({ searchParams }) => {
  const filters = {
    category: searchParams.category as string | undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
  };
  
  const { success, data } = await getProducts(filters);
  
  if (!success) {
    return { products: [], total: 0 };
  }
  
  return data;
});

export default async function ProductsPage(props: typeof loadProducts.Props) {
  const { products, total } = await loadProducts(props);
  
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Produits ({total})</h1>
      <ProductList products={products} />
    </main>
  );
}
```

### Exemple : Page avec plusieurs loaders

```typescript
// app/dashboard/page.tsx
import { createLoader } from "@/lib/loader";
import { requireAuth } from "@/features/auth/auth.guard";
import { getStats } from "@/features/dashboard/dashboard.service";
import { getRecentActivity } from "@/features/activity/activity.service";

const loadDashboard = createLoader("/dashboard", async () => {
  const session = await requireAuth();
  
  // Chargement parallèle des données
  const [statsResult, activityResult] = await Promise.all([
    getStats(),
    getRecentActivity(),
  ]);
  
  return {
    user: session.data,
    stats: statsResult.data,
    activity: activityResult.data,
  };
});

export default async function DashboardPage(props: typeof loadDashboard.Props) {
  const { user, stats, activity } = await loadDashboard(props);
  
  return (
    <main className="container mx-auto p-8">
      <h1>Bienvenue, {user.firstName}</h1>
      {/* ... */}
    </main>
  );
}
```

---

## Pages Sans Données (Statiques)

Pour les pages qui n'ont pas besoin de charger des données, `createLoader` n'est pas nécessaire.

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold">À propos</h1>
      <p>Contenu statique...</p>
    </main>
  );
}
```

---

## Fichiers Spéciaux

### layout.tsx (Server Component)

```typescript
// app/dashboard/layout.tsx
import { Sidebar } from "@/components/layouts/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
```

### error.tsx (Client Component - Exception)

```typescript
// app/error.tsx
"use client"; // Requis par Next.js

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Une erreur est survenue</h2>
      <button onClick={reset} className="px-4 py-2 bg-primary text-white rounded">
        Réessayer
      </button>
    </div>
  );
}
```

### loading.tsx

```typescript
// app/users/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  );
}
```

### not-found.tsx (Client Component - Exception)

```typescript
// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page non trouvée</p>
      <Link href="/" className="text-primary hover:underline">
        Retour à l'accueil
      </Link>
    </div>
  );
}
```

---

## Route Groups

Les Route Groups `(nom)` permettent d'organiser sans créer de segment URL.

```
app/
├── (public)/              # Pages publiques
│   ├── layout.tsx         # Layout sans auth
│   ├── page.tsx           # /
│   └── about/
│       └── page.tsx       # /about
│
├── (authenticated)/       # Pages authentifiées
│   ├── layout.tsx         # Layout avec sidebar
│   └── dashboard/
│       └── page.tsx       # /dashboard
```

---

## Metadata et SEO

### Metadata Statique

```typescript
// app/about/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | MonApp",
  description: "Découvrez notre histoire",
};

export default function AboutPage() {
  return <main>{/* ... */}</main>;
}
```

### Metadata Dynamique avec createLoader

```typescript
// app/users/[id]/page.tsx
import { Metadata } from "next";
import { createLoader } from "@/lib/loader";
import { getUserById } from "@/features/users/users.service";

const loadUser = createLoader("/users/[id]", async ({ params }) => {
  const { data } = await getUserById(params.id);
  return data;
});

export async function generateMetadata(
  props: typeof loadUser.Props
): Promise<Metadata> {
  const user = await loadUser(props);
  
  return {
    title: `${user?.firstName} ${user?.lastName} | MonApp`,
    description: `Profil de ${user?.firstName}`,
  };
}

export default async function UserPage(props: typeof loadUser.Props) {
  const user = await loadUser(props);
  return <main>{/* ... */}</main>;
}
```

---

## Pages Protégées

Utiliser les guards dans le loader pour protéger les pages.

```typescript
// app/dashboard/page.tsx
import { createLoader } from "@/lib/loader";
import { requireAuth } from "@/features/auth/auth.guard";

const loadDashboard = createLoader("/dashboard", async () => {
  const session = await requireAuth(); // Redirige si non connecté
  return { user: session.data };
});

export default async function DashboardPage(props: typeof loadDashboard.Props) {
  const { user } = await loadDashboard(props);
  return <main>{/* ... */}</main>;
}
```

---

## Récapitulatif des Règles

| Règle | Obligatoire |
|-------|-------------|
| Pages en Server Component | ✅ Oui |
| Utiliser `createLoader` pour le SSR | ✅ Oui |
| `"use client"` uniquement pour error/loading/not-found | ✅ Oui |
| Typer avec `typeof loader.Props` | ✅ Oui |

---

## Checklist Nouvelle Page

- [ ] Créer le fichier `page.tsx` (Server Component)
- [ ] Utiliser `createLoader` si données nécessaires
- [ ] Typer les props avec `typeof loader.Props`
- [ ] Ajouter `loading.tsx` si chargement long
- [ ] Ajouter `error.tsx` si gestion d'erreur spécifique
- [ ] Configurer les metadata pour le SEO
- [ ] Utiliser un guard si page protégée
- [ ] Garder la logique dans les features (pas dans la page)