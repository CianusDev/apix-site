# Task 02 : Composants UI réutilisables

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 02 |
| **Titre** | Composants UI réutilisables |
| **Priorité** | 🔴 Haute |
| **Statut** | ✅ Terminé |
| **Estimation** | 4h |

---

## 🎯 Objectif

Créer les composants UI partagés nécessaires à tout le site : bloc de code avec copie, badge de version, commande d'installation interactive et screenshot TUI.

---

## ✅ Critères d'acceptation

- [x] `<CopyButton>` — client, feedback visuel "Copied!" 2s
- [x] `<CodeBlock>` — Server Component async, shiki `vitesse-dark`, bouton copie, header langage/fichier
- [x] `<InstallCommand>` — terminal style `$` prefix vert, copie en un clic
- [x] `<TuiScreenshot>` — faux terminal macOS (3 pastilles), `<pre>` monospace
- [x] Compatible dark mode (thème Task 01)
- [x] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Fichiers créés

| Fichier | Description |
|---------|-------------|
| `src/components/ui/copy-button.tsx` | `"use client"` — bouton copie réutilisable |
| `src/components/ui/code-block.tsx` | Server Component async — shiki highlighting |
| `src/components/ui/install-command.tsx` | `"use client"` — commande copiable |
| `src/components/ui/tui-screenshot.tsx` | Server Component — faux terminal |

## 💬 Notes

- `shiki` v4 installé (serveur-side, zéro JS client)
- `CopyButton` isolé en `"use client"` pour garder `CodeBlock` server-only
