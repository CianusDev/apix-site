# Task 01 : Thème terminal & Layout global

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 01 |
| **Titre** | Thème terminal & Layout global |
| **Priorité** | 🔴 Haute |
| **Statut** | ✅ Terminé |
| **Estimation** | 3h |

---

## 🎯 Objectif

Configurer le thème visuel "terminal dark" comme base de tout le site, et mettre en place le layout global avec header et footer réutilisables.

---

## ✅ Critères d'acceptation

- [x] Le fond est sombre, accent vert terminal (`oklch(0.72 0.2 145)`)
- [x] Font corps : Google Sans (local), font mono : JetBrains Mono
- [x] `<Header>` avec logo `› apix` et liens Docs / Install / Contributing / GitHub
- [x] `<Footer>` avec liens GitHub, Releases, Contributing, mention "Built with Rust 🦀"
- [x] Métadonnées dans `layout.tsx` : `title`, `description`, `openGraph`, `twitter`
- [x] `dark` forcé sur `<html>`
- [x] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Fichiers modifiés/créés

| Fichier | Action |
|---------|--------|
| `src/app/globals.css` | `.dark` → thème terminal |
| `src/app/layout.tsx` | dark class, JetBrains Mono, Header/Footer, metadata |
| `src/components/layouts/header.tsx` | Créé |
| `src/components/layouts/footer.tsx` | Créé |
| `src/app/sitemap.ts` | Fix `APP_URL` possibly undefined |
