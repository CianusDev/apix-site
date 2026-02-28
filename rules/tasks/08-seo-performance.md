# Task 08 : SEO, métadonnées & performance

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 08 |
| **Titre** | SEO, métadonnées & performance |
| **Priorité** | 🟡 Moyenne |
| **Statut** | ✅ Terminé |
| **Estimation** | 2h |

---

## 🎯 Objectif

Compléter le SEO : métadonnées OpenGraph/Twitter par page, sitemap dynamique incluant les pages de docs, image OG.

---

## ✅ Critères d'acceptation

- [ ] Chaque page a ses propres `title` et `description`
- [ ] Balises `og:title`, `og:description`, `og:image`, `twitter:card` présentes
- [ ] `sitemap.ts` génère toutes les URLs statiques + pages de docs
- [ ] `robots.ts` autorise l'indexation complète
- [ ] `public/og-image.png` créée (1200×630)
- [ ] `pnpm build` sans erreur

---

## 🛠️ Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/sitemap.ts` | Modifier | Ajouter routes de docs dynamiquement |
| `src/app/robots.ts` | Vérifier | Confirmer la config |
| `src/app/install/page.tsx` | Modifier | Exporter `metadata` |
| `src/app/contributing/page.tsx` | Modifier | Exporter `metadata` |
| `src/app/docs/[slug]/page.tsx` | Modifier | `generateMetadata` dynamique |
| `public/og-image.png` | Créer | Image OpenGraph 1200×630 |

---

## 🔗 Dépendances

### Dépend de
- Task #04 : Infrastructure MDX (pour `getAllDocs()`)
- Task #05 : Contenu documentation (slugs finaux)
- Task #06 : Page installation
- Task #07 : Page contribuer

---

## 💬 Notes

- Utiliser `NEXT_PUBLIC_APP_URL` via `clientEnv` pour les URLs absolues
