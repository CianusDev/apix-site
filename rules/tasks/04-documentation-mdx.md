# Task 04 : Infrastructure documentation MDX

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 04 |
| **Titre** | Infrastructure documentation MDX |
| **Priorité** | 🔴 Haute |
| **Statut** | 📋 À faire |
| **Estimation** | 5h |

---

## 🎯 Objectif

Mettre en place le système de documentation MDX avec layout dédié (sidebar + table des matières), routing automatique et rendu des composants React dans le contenu.

---

## 📝 Description

### Contexte
La documentation est le cœur du site. Elle doit être facile à naviguer, lisible et permettre des exemples de code interactifs. L'architecture MDX permet d'écrire du Markdown enrichi de composants React (CodeBlock, etc.).

### Périmètre
- Configurer `@next/mdx` ou `next-mdx-remote` pour le rendu MDX
- Créer le layout de documentation avec sidebar de navigation et TOC
- Système de routing `/docs/[slug]` pour chaque section
- Composant `<TOC>` (table des matières générée depuis les titres)
- Mapping des composants MDX (h1→h2, code→CodeBlock, etc.)

### Out of scope
- Le contenu des pages MDX elles-mêmes (→ Task 05)
- La recherche full-text avancée (optionnel, non bloquant)

---

## ✅ Critères d'acceptation

- [ ] Une URL `/docs` liste les sections disponibles (index)
- [ ] `/docs/installation`, `/docs/features`, etc. rendent leur fichier MDX respectif
- [ ] La sidebar affiche toutes les sections avec lien actif mis en évidence
- [ ] Le `<TOC>` liste les titres H2/H3 de la page en cours avec ancres
- [ ] Les blocs de code MDX (` ``` `) sont rendus via `<CodeBlock>`
- [ ] Layout responsive : sidebar en drawer sur mobile, fixe sur desktop
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `package.json` | Modifier | Ajouter `@next/mdx` ou `next-mdx-remote` |
| `next.config.ts` | Modifier | Activer le support MDX |
| `src/app/docs/layout.tsx` | Créer | Layout documentation (sidebar + TOC) |
| `src/app/docs/page.tsx` | Créer | Index de la documentation |
| `src/app/docs/[slug]/page.tsx` | Créer | Page dynamique par section |
| `src/components/layouts/docs-sidebar.tsx` | Créer | Sidebar de navigation docs |
| `src/components/ui/toc.tsx` | Créer | Table des matières |
| `src/lib/docs.ts` | Créer | Helpers : lecture fichiers MDX, métadonnées |
| `content/docs/` | Créer | Dossier racine des fichiers MDX |

### Structure du contenu

```
content/
└── docs/
    ├── installation.mdx
    ├── features.mdx
    ├── keybindings.mdx
    ├── storage.mdx
    ├── tech-stack.mdx
    └── faq.mdx
```

### Étapes

1. **Installer et configurer MDX**
   ```bash
   pnpm add @next/mdx @mdx-js/loader @mdx-js/react
   ```
   Mettre à jour `next.config.ts` pour activer `withMDX`.

2. **Routing dynamique**
   - `src/app/docs/[slug]/page.tsx` : lire le fichier `content/docs/{slug}.mdx` via `fs` (Server Component)
   - Utiliser `createLoader` pour le data fetching typé

3. **Layout docs**
   - Sidebar fixe à gauche avec la liste ordonnée des sections
   - Zone centrale pour le contenu MDX
   - TOC flottant à droite (desktop) ou inline (mobile)

4. **Composants MDX**
   - Mapper `code` → `<CodeBlock>` dans `mdx-components.tsx`
   - Mapper les titres pour générer des IDs d'ancre

5. **`src/lib/docs.ts`**
   - `getAllDocs()` : retourne la liste des sections avec titre et slug
   - `getDocBySlug(slug)` : retourne le contenu MDX et les métadonnées

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global
- Task #02 : Composants UI réutilisables (CodeBlock)

### Bloque
- Task #05 : Contenu documentation MDX

---

## 💬 Notes

- Ordre des sections dans la sidebar : Installation → Features → Keybindings → Data Storage → Tech Stack → FAQ
- Préférer `@next/mdx` (officiel Next.js, SSG natif) à `next-mdx-remote` si les fichiers sont locaux
- Les métadonnées (titre de page, description) seront exportées depuis chaque fichier MDX via `export const metadata`
