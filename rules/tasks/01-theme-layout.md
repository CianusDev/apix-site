# Task 01 : Thème terminal & Layout global

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 01 |
| **Titre** | Thème terminal & Layout global |
| **Priorité** | 🔴 Haute |
| **Statut** | 📋 À faire |
| **Estimation** | 3h |

---

## 🎯 Objectif

Configurer le thème visuel "terminal dark" comme base de tout le site, et mettre en place le layout global avec header et footer réutilisables.

---

## 📝 Description

### Contexte
Le site d'apix doit être sobre et inspiré du terminal (dark mode par défaut). Tout le design part de cette base. Cette tâche est le prérequis de toutes les autres tâches UI.

### Périmètre
- Configurer les variables CSS Tailwind 4 pour un thème terminal dark (fond très sombre, vert/cyan pour les accents, monospace pour le code)
- Dark mode activé par défaut (pas de toggle requis dans un premier temps)
- Créer le layout global avec un `<Header>` (logo + nav) et un `<Footer>` (liens GitHub, licence)
- Mettre à jour `app/layout.tsx` avec les métadonnées de base (titre, description, OG)

### Out of scope
- La navigation de la documentation (sidebar) → Task 04
- Les animations avancées

---

## ✅ Critères d'acceptation

- [ ] Le fond est sombre (`#0a0a0a` ou équivalent), accent vert/cyan (`#22c55e` ou `#06b6d4`)
- [ ] La font du corps est Inter ou Geist, la font du code est JetBrains Mono ou Geist Mono
- [ ] `<Header>` affiché sur toutes les pages avec le logo "apix" et les liens : Docs, Install, GitHub
- [ ] `<Footer>` avec lien GitHub, licence MIT, mention "Made with Rust"
- [ ] Les métadonnées dans `layout.tsx` : `title`, `description`, `openGraph`, `twitter`
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/globals.css` | Modifier | Variables CSS dark theme terminal |
| `src/app/layout.tsx` | Modifier | Métadonnées + intégration Header/Footer |
| `src/components/layouts/header.tsx` | Créer | Navigation principale |
| `src/components/layouts/footer.tsx` | Créer | Footer avec liens |

### Étapes

1. **Thème CSS** : Définir les custom properties dans `globals.css`
   - `--background: #0a0a0a`, `--foreground: #e5e7eb`
   - `--accent: #22c55e` (vert terminal)
   - `--font-mono: 'Geist Mono', monospace`

2. **Header** : Composant avec logo `apix` en monospace + nav links (Docs, Install, GitHub)

3. **Footer** : Liens GitHub (CianusDev/apix), licence, version

4. **Layout** : Wrapper `<Header>{children}<Footer>`, métadonnées OG complètes

---

## 🔗 Dépendances

### Bloque
- Task #02 : Page d'accueil
- Task #03 : Composants réutilisables
- Task #04 : Documentation MDX

---

## 💬 Notes

- GitHub : `https://github.com/CianusDev/apix`
- Releases : `https://github.com/CianusDev/apix/releases`
- Installer shadcn/ui en style `new-york` (déjà configuré dans `components.json`)
- Le logo peut être simplement le texte `apix` en monospace avec un accent de couleur sur le `>` comme prompt terminal
