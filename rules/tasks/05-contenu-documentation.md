# Task 05 : Contenu de la documentation (MDX)

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 05 |
| **Titre** | Contenu de la documentation |
| **Priorité** | 🔴 Haute |
| **Statut** | 📋 À faire |
| **Estimation** | 5h |

---

## 🎯 Objectif

Rédiger les 6 sections de documentation au format MDX, en reprenant et enrichissant les informations du README d'apix.

---

## 📝 Description

### Contexte
Le contenu provient principalement du README de `/home/cianus/Documents/projects/apix`. Il doit être restructuré, enrichi et mis en forme pour une lecture web agréable avec des exemples de code interactifs.

### Périmètre
Les 6 fichiers MDX à créer :
1. `installation.mdx` — Toutes les méthodes d'installation
2. `features.mdx` — Description détaillée de chaque fonctionnalité
3. `keybindings.mdx` — Tableaux de raccourcis par contexte
4. `storage.mdx` — Structure de stockage local `~/.apix/`
5. `tech-stack.mdx` — Stack technique (Rust, Ratatui, Reqwest, etc.)
6. `faq.mdx` — Questions fréquentes

---

## ✅ Critères d'acceptation

- [ ] Les 6 fichiers MDX existent dans `content/docs/`
- [ ] Chaque fichier a des métadonnées `title` et `description` exportées
- [ ] Les blocs de code bash/json sont dans des fences ` ``` ` avec le bon langage
- [ ] Les tableaux de keybindings sont lisibles et complets
- [ ] La FAQ couvre au moins 5 questions pertinentes
- [ ] Aucun lien cassé dans la documentation

---

## 🛠️ Implémentation

### Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `content/docs/installation.mdx` | Guide d'installation multi-OS |
| `content/docs/features.mdx` | Fonctionnalités détaillées |
| `content/docs/keybindings.mdx` | Référence des raccourcis clavier |
| `content/docs/storage.mdx` | Stockage local et format des données |
| `content/docs/tech-stack.mdx` | Stack technique |
| `content/docs/faq.mdx` | FAQ |

### Contenu par fichier

#### `installation.mdx`
- One-liner `curl … | bash` (Linux & macOS)
- Téléchargement manuel par OS (tableau plateforme → fichier)
- Build from source (Rust requis, commandes `cargo build --release`)
- Vérifier que le binaire est dans `$PATH`

#### `features.mdx`
- Full HTTP support (GET, POST, PUT, DELETE, PATCH)
- URL bar persistante avec badge méthode coloré
- Query params (éditeur key=value)
- Headers (ajout, édition, suppression)
- Body editor (multi-ligne, auto-indent, `Ctrl+f` pour formatter JSON)
- Authentication (Bearer, Basic Auth, API Key)
- Environments (variables `{{base_url}}`, switch dev/prod)
- Collections (sauvegarder et recharger des requêtes)
- History (log complet avec recherche `/`)
- Réponse JSON (syntaxe colorée, onglets Body/Headers/Cookies)
- Clipboard (copier la réponse avec `y`)
- Cookies persistants

#### `keybindings.mdx`
Reprendre exactement les 5 tableaux du README :
- Global
- Request panel
- Response panel
- Body editor
- Drawers (History / Collections / Environments)

#### `storage.mdx`
```
~/.apix/
├── history.json
├── collections.json
└── environments.json
```
Expliquer le format JSON de chaque fichier (structure des champs).

#### `tech-stack.mdx`
| Component | Library |
- Rust 2024 edition
- Ratatui 0.30 + Crossterm 0.29 (TUI)
- Reqwest 0.13 (HTTP client)
- Tokio (async runtime)
- Serde / serde_json (serialization)

#### `faq.mdx`
Questions suggérées :
- Pourquoi apix plutôt que Postman ?
- Fonctionne-t-il sous Windows ?
- Comment mettre à jour apix ?
- Où sont stockées mes données ?
- Comment contribuer ?

---

## 🔗 Dépendances

### Dépend de
- Task #04 : Infrastructure documentation MDX

---

## 💬 Notes

- Source principale : README de `/home/cianus/Documents/projects/apix`
- Écrire en anglais (le README source est en anglais, public cible international)
- Ajouter des exemples concrets et des captures ASCII là où c'est pertinent
