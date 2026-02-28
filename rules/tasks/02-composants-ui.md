# Task 02 : Composants UI réutilisables

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 02 |
| **Titre** | Composants UI réutilisables |
| **Priorité** | 🔴 Haute |
| **Statut** | 📋 À faire |
| **Estimation** | 4h |

---

## 🎯 Objectif

Créer les composants UI partagés nécessaires à tout le site : bloc de code avec copie, badge de version, commande d'installation interactive et badge de statut HTTP.

---

## 📝 Description

### Contexte
Ces composants sont utilisés dans la page d'accueil, la documentation et les pages d'installation. Les créer en amont évite la duplication et garantit la cohérence visuelle.

### Périmètre
- `CodeBlock` : affichage de code avec syntaxe colorée et bouton "Copy"
- `InstallCommand` : commande shell one-liner avec bouton copie, style terminal
- `Badge` : badge visuel (version release, licence, CI status) — peut réutiliser les badges GitHub SVG
- `TuiScreenshot` : affichage de l'ASCII art TUI dans un terminal fictif stylisé

### Out of scope
- La sidebar de navigation de la doc (→ Task 04)
- Le composant TOC / table des matières (→ Task 04)

---

## ✅ Critères d'acceptation

- [ ] `<CodeBlock>` affiche le code avec coloration syntaxique (langage configurable), bouton "Copy" fonctionnel (Clipboard API)
- [ ] `<InstallCommand>` affiche la commande dans un bloc style terminal avec bouton copie et feedback visuel "Copied!"
- [ ] `<TuiScreenshot>` encapsule l'ASCII art dans un faux terminal avec barre de titre (boutons rouge/jaune/vert)
- [ ] Tous les composants sont compatibles dark mode (thème Task 01)
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/components/ui/code-block.tsx` | Créer | Bloc de code avec copie |
| `src/components/ui/install-command.tsx` | Créer | Commande d'installation copiable |
| `src/components/ui/tui-screenshot.tsx` | Créer | Faux terminal avec ASCII art |

### Étapes

1. **`<CodeBlock>`**
   - Props : `code: string`, `language?: string`, `filename?: string`
   - Utiliser `<pre><code>` avec classes Tailwind pour la coloration basique, ou intégrer `shiki` / `highlight.js`
   - Bouton copie en haut à droite avec état `Copied!` pendant 2s

2. **`<InstallCommand>`**
   - Props : `command: string`
   - Style : fond `#111`, bord vert, `$` prefix en vert, texte mono
   - Bouton icône clipboard (lucide-react `Copy`)

3. **`<TuiScreenshot>`**
   - Props : `children: ReactNode` (le contenu ASCII)
   - Barre de titre avec 3 pastilles couleur (rouge, jaune, vert) + label "apix"
   - Fond très sombre, texte `font-mono text-sm`

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global

### Bloque
- Task #03 : Page d'accueil
- Task #04 : Documentation MDX

---

## 💬 Notes

- Utiliser `lucide-react` déjà installé pour les icônes (`Copy`, `Check`, `Terminal`)
- La copie se fait via `navigator.clipboard.writeText()` avec `"use client"` obligatoire
- Pour la colorisation syntaxique, préférer une solution légère : `shiki` (recommandé pour Next.js SSR) ou simplement `highlight.js` côté client
