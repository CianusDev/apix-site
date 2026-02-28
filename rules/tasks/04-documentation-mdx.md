# Task 04 : Infrastructure documentation MDX

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 04 |
| **Titre** | Infrastructure documentation MDX |
| **Priorité** | 🔴 Haute |
| **Statut** | ✅ Terminé |
| **Estimation** | 5h |

---

## 🎯 Objectif

Mettre en place le système de documentation MDX avec layout dédié (sidebar + table des matières), routing automatique et rendu des composants React dans le contenu.

---

## ✅ Critères d'acceptation

- [ ] `/docs` liste les sections disponibles (index)
- [ ] `/docs/[slug]` rend le fichier MDX correspondant
- [ ] Sidebar avec toutes les sections et lien actif mis en évidence
- [ ] `<TOC>` liste les titres H2/H3 avec ancres
- [ ] Les blocs de code MDX sont rendus via `<CodeBlock>`
- [ ] Layout responsive : sidebar drawer sur mobile, fixe sur desktop
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `package.json` | Modifier | Ajouter `@next/mdx` |
| `next.config.ts` | Modifier | Activer support MDX |
| `src/app/docs/layout.tsx` | Créer | Layout docs (sidebar + TOC) |
| `src/app/docs/page.tsx` | Créer | Index de la documentation |
| `src/app/docs/[slug]/page.tsx` | Créer | Page dynamique par section |
| `src/components/layouts/docs-sidebar.tsx` | Créer | Sidebar de navigation |
| `src/components/ui/toc.tsx` | Créer | Table des matières |
| `src/lib/docs.ts` | Créer | `getAllDocs()`, `getDocBySlug()` |
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

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global ✅
- Task #02 : Composants UI réutilisables (CodeBlock) ✅

### Bloque
- Task #05 : Contenu documentation MDX

---

## 💬 Notes

- Ordre sidebar : Installation → Features → Keybindings → Data Storage → Tech Stack → FAQ
- Préférer `@next/mdx` (officiel, SSG natif) à `next-mdx-remote` (fichiers locaux)
- Les métadonnées (titre, description) exportées depuis chaque fichier MDX
