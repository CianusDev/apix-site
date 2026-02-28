# Task 06 : Page Installation & Téléchargement

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 06 |
| **Titre** | Page Installation & Téléchargement |
| **Priorité** | 🟡 Moyenne |
| **Statut** | 📋 À faire |
| **Estimation** | 3h |

---

## 🎯 Objectif

Créer la page `/install` avec les instructions d'installation par OS, les liens directs vers les binaires GitHub Releases et la section "Build from source".

---

## 📝 Description

### Contexte
Un utilisateur qui arrive depuis la landing page ou cherche à installer apix doit trouver rapidement la méthode pour son OS. Cette page centralise toutes les méthodes d'installation avec une UX claire.

### Périmètre
- Onglets ou sections par OS : Linux, macOS, Windows
- Commande one-liner (Linux/macOS)
- Tableau des binaires disponibles avec liens GitHub Releases
- Section "Build from source" avec les commandes Rust
- Vérification post-installation

### Out of scope
- La documentation des features (→ Task 05)

---

## ✅ Critères d'acceptation

- [ ] La page est accessible à `/install`
- [ ] 3 méthodes affichées : One-liner, Téléchargement manuel, Build from source
- [ ] Tableau des binaires avec plateformes (Linux x86_64, macOS Intel, macOS Apple Silicon, Windows x86_64) et liens vers GitHub Releases
- [ ] Les commandes sont dans des `<InstallCommand>` ou `<CodeBlock>` copiables
- [ ] Page Server Component, responsive
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/install/page.tsx` | Créer | Page d'installation (Server Component) |
| `src/features/install/components/os-tabs.tsx` | Créer | Onglets par OS |
| `src/features/install/components/binaries-table.tsx` | Créer | Tableau des binaires |
| `src/features/install/components/build-from-source.tsx` | Créer | Section cargo build |

### Contenu

#### One-liner (Linux & macOS)
```bash
curl -fsSL https://raw.githubusercontent.com/CianusDev/apix/main/install.sh | bash
```

#### Binaires (liens vers releases GitHub)
| Plateforme | Fichier |
|------------|---------|
| Linux x86_64 | `apix-vX.Y.Z-x86_64-unknown-linux-gnu.tar.gz` |
| macOS Intel | `apix-vX.Y.Z-x86_64-apple-darwin.tar.gz` |
| macOS Apple Silicon | `apix-vX.Y.Z-aarch64-apple-darwin.tar.gz` |
| Windows x86_64 | `apix-vX.Y.Z-x86_64-pc-windows-msvc.zip` |

Lien vers la page releases : `https://github.com/CianusDev/apix/releases`

#### Build from source
```bash
git clone https://github.com/CianusDev/apix.git
cd apix
cargo build --release
./target/release/apix
```
Prérequis : Rust (https://rustup.rs), edition 2024

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global
- Task #02 : Composants UI réutilisables

---

## 💬 Notes

- Les liens vers les binaires pointent vers `https://github.com/CianusDev/apix/releases/latest`
- La version exacte dans les noms de fichiers sera dynamique si on fetch l'API GitHub Releases, sinon pointer vers la page releases directement
- Ajouter une note pour Windows : "apix works on Windows but a UNIX-compatible terminal (WSL, Git Bash) is recommended"
