# Task 08 : SEO, métadonnées & performance

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 08 |
| **Titre** | SEO, métadonnées & performance |
| **Priorité** | 🟡 Moyenne |
| **Statut** | 📋 À faire |
| **Estimation** | 2h |

---

## 🎯 Objectif

Compléter le SEO du site : métadonnées OpenGraph/Twitter par page, sitemap dynamique, robots.txt et optimisation des images.

---

## 📝 Description

### Contexte
Un site de documentation open-source doit être bien indexé. Next.js 16 fournit une API de métadonnées native que l'on exploitera pleinement pour chaque page.

### Périmètre
- Métadonnées `title`, `description`, `openGraph`, `twitter` pour chaque page (`/`, `/install`, `/docs/[slug]`, `/contributing`)
- `sitemap.ts` dynamique incluant toutes les pages de documentation
- `robots.ts` correctement configuré
- Image OG statique ou générée (simple bannière avec le logo apix)

### Out of scope
- Analyse web (Google Analytics, Plausible) — non mentionné dans la PRD
- Internationalisation

---

## ✅ Critères d'acceptation

- [ ] Chaque page a ses propres `title` et `description` (pas génériques)
- [ ] Les balises `og:title`, `og:description`, `og:image`, `twitter:card` sont présentes
- [ ] `sitemap.ts` génère toutes les URLs statiques + les pages de docs
- [ ] `robots.ts` autorise l'indexation de tout le site
- [ ] Vérification via `pnpm build` sans erreur
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/sitemap.ts` | Modifier | Ajouter les routes de docs dynamiquement |
| `src/app/robots.ts` | Modifier | Confirmer la config |
| `src/app/(home)/page.tsx` | Modifier | Exporter `metadata` de la page home |
| `src/app/install/page.tsx` | Modifier | Exporter `metadata` |
| `src/app/contributing/page.tsx` | Modifier | Exporter `metadata` |
| `src/app/docs/[slug]/page.tsx` | Modifier | `generateMetadata` dynamique depuis le MDX |
| `public/og-image.png` | Créer | Image OpenGraph 1200×630 |

### Exemple metadata

```typescript
// app/(home)/page.tsx
export const metadata: Metadata = {
  title: "apix — A lightweight Postman alternative for your terminal",
  description: "Send HTTP requests, manage collections and environments directly in your terminal. A TUI HTTP client written in Rust.",
  openGraph: {
    title: "apix",
    description: "A lightweight Postman alternative for your terminal",
    url: "https://apix.dev",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "apix",
    description: "A lightweight Postman alternative for your terminal",
  },
};
```

### Sitemap dynamique

```typescript
// app/sitemap.ts
const docs = await getAllDocs(); // depuis src/lib/docs.ts
const docUrls = docs.map(doc => ({
  url: `${baseUrl}/docs/${doc.slug}`,
  lastModified: new Date(),
}));
```

---

## 🔗 Dépendances

### Dépend de
- Task #04 : Infrastructure documentation MDX (pour `getAllDocs()`)
- Task #05 : Contenu documentation (pour avoir les slugs finaux)
- Task #06 : Page installation (pour la metadata)
- Task #07 : Page contribuer (pour la metadata)

---

## 💬 Notes

- L'URL du site est à définir (ex: `https://apix.dev` ou `https://cianusDev.github.io/apix-site`)
- L'image OG peut être une image statique simple (fond sombre, texte "apix", slogan) créée dans Figma ou avec un outil en ligne
- Utiliser `NEXT_PUBLIC_APP_URL` depuis `clientEnv` pour construire les URLs absolues
