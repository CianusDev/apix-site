# Task 03 : Page d'accueil (Landing)

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 03 |
| **Titre** | Page d'accueil (Landing) |
| **Priorité** | 🔴 Haute |
| **Statut** | ✅ Terminé |
| **Estimation** | 4h |

---

## 🎯 Objectif

Créer la page d'accueil du site apix avec une section hero impactante, la commande d'installation, les features clés et les liens vers GitHub/releases.

---

## ✅ Critères d'acceptation

- [x] Section Hero : badges GitHub shields.io, titre `› apix`, tagline, TuiScreenshot, boutons `$ install` + `Read the docs →`
- [x] Section Install : `<InstallCommand>` one-liner curl
- [x] Features Grid : 6 cards avec icônes Lucide (Globe, Layers, FolderOpen, Clock, ShieldCheck, Braces)
- [x] Section CTA : boutons GitHub + docs
- [x] Page Server Component pur (pas de `"use client"`)
- [x] Pré-rendue statiquement (`○`) au build
- [x] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Fichiers créés/modifiés

| Fichier | Action |
|---------|--------|
| `src/app/(home)/page.tsx` | Réécrit — metadata + 4 sections |
| `src/features/landing/components/hero.tsx` | Créé |
| `src/features/landing/components/install-section.tsx` | Créé |
| `src/features/landing/components/features-grid.tsx` | Créé |
| `src/features/landing/components/cta-section.tsx` | Créé |
