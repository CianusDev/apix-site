# Task 03 : Page d'accueil (Landing)

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 03 |
| **Titre** | Page d'accueil (Landing) |
| **Priorité** | 🔴 Haute |
| **Statut** | 📋 À faire |
| **Estimation** | 4h |

---

## 🎯 Objectif

Créer la page d'accueil du site apix avec une section hero impactante, la commande d'installation, les features clés et les liens vers GitHub/releases.

---

## 📝 Description

### Contexte
C'est la première page que l'utilisateur voit. Elle doit immédiatement communiquer ce qu'est apix (TUI HTTP client), donner envie de l'installer et orienter vers la documentation.

### Périmètre
- Section **Hero** : slogan, sous-titre, badges (Release, License, CI), screenshot TUI ASCII, bouton install + lien docs
- Section **Install** : commande one-liner `curl … | bash` copiable
- Section **Features** : grille des fonctionnalités clés (~6 features avec icônes)
- Section **CTA** : liens GitHub et documentation

### Out of scope
- La documentation complète (→ Task 04 et 05)
- La page de téléchargement détaillée (→ Task 06)

---

## ✅ Critères d'acceptation

- [ ] Section Hero visible au-dessus de la fold avec slogan, badges GitHub et screenshot TUI
- [ ] La commande `curl -fsSL https://raw.githubusercontent.com/CianusDev/apix/main/install.sh | bash` est copiable en un clic
- [ ] 6 features affichées avec icône (lucide-react) et description courte
- [ ] Boutons vers GitHub (`https://github.com/CianusDev/apix`) et vers `/docs`
- [ ] Page entièrement Server Component (pas de `"use client"` sur la page)
- [ ] Responsive (mobile + desktop)
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/(home)/page.tsx` | Modifier | Page d'accueil principale |
| `src/features/landing/components/hero.tsx` | Créer | Section hero |
| `src/features/landing/components/features-grid.tsx` | Créer | Grille des fonctionnalités |
| `src/features/landing/components/install-section.tsx` | Créer | Section installation |
| `src/features/landing/components/cta-section.tsx` | Créer | Call to action final |

### Étapes

1. **Section Hero**
   - Titre : `apix` (grand, monospace, accent couleur)
   - Sous-titre : `A lightweight Postman alternative for your terminal`
   - Badges : Release, License, CI (images SVG shields.io depuis GitHub)
   - `<TuiScreenshot>` avec l'ASCII art du README
   - 2 boutons : "Install now" (→ `/install`) et "Read the docs" (→ `/docs`)

2. **Section Install**
   - `<InstallCommand command="curl -fsSL https://raw.githubusercontent.com/CianusDev/apix/main/install.sh | bash" />`

3. **Features Grid** (6 cards)
   - Full HTTP support (GET, POST, PUT, DELETE, PATCH)
   - Environments (`{{base_url}}`, switch dev/prod)
   - Collections (save & reload requests)
   - History (full log with search)
   - Authentication (Bearer, Basic, API Key)
   - Body editor (JSON auto-format `Ctrl+f`)

4. **CTA section**
   - Bouton GitHub + bouton Documentation

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global
- Task #02 : Composants UI réutilisables

### Bloque
- Aucune (tâche indépendante après les prérequis)

---

## 💬 Notes

- ASCII art à reprendre tel quel depuis le README de `/home/cianus/Documents/projects/apix`
- Les badges GitHub peuvent être inclus comme balises `<img>` statiques (shields.io SVG) ou comme liens vers le repo
- Garder la page légère : pas de JS côté client sur la page elle-même
