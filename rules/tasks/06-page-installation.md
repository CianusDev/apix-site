# Task 06 : Page Installation & Téléchargement

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 06 |
| **Titre** | Page Installation & Téléchargement |
| **Priorité** | 🟡 Moyenne |
| **Statut** | ✅ Terminé |
| **Estimation** | 3h |

---

## 🎯 Objectif

Créer la page `/install` avec les instructions d'installation par OS, les liens directs vers les binaires GitHub Releases et la section "Build from source".

---

## ✅ Critères d'acceptation

- [ ] Page accessible à `/install`
- [ ] 3 méthodes : One-liner, Téléchargement manuel, Build from source
- [ ] Tableau des binaires : Linux x86_64, macOS Intel, macOS Apple Silicon, Windows x86_64
- [ ] Commandes dans des `<InstallCommand>` ou `<CodeBlock>` copiables
- [ ] Page Server Component, responsive
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Fichiers à créer

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/install/page.tsx` | Créer | Page d'installation (Server Component) |
| `src/features/install/components/os-tabs.tsx` | Créer | Onglets par OS |
| `src/features/install/components/binaries-table.tsx` | Créer | Tableau des binaires |
| `src/features/install/components/build-from-source.tsx` | Créer | Section cargo build |

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global ✅
- Task #02 : Composants UI réutilisables ✅

---

## 💬 Notes

- Liens binaires → `https://github.com/CianusDev/apix/releases/latest`
- Note Windows : "A UNIX-compatible terminal (WSL, Git Bash) is recommended"
