# Task 05 : Contenu de la documentation (MDX)

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 05 |
| **Titre** | Contenu de la documentation |
| **Priorité** | 🔴 Haute |
| **Statut** | ✅ Terminé |
| **Estimation** | 5h |

---

## 🎯 Objectif

Rédiger les 6 sections de documentation au format MDX en reprenant et enrichissant les informations du README d'apix (`/home/cianus/Documents/projects/apix`).

---

## ✅ Critères d'acceptation

- [ ] 6 fichiers MDX dans `content/docs/`
- [ ] Chaque fichier exporte `title` et `description`
- [ ] Blocs de code avec le bon langage (bash, json, rust…)
- [ ] Tableaux de keybindings complets (5 contextes)
- [ ] FAQ avec au moins 5 questions
- [ ] Aucun lien cassé

---

## 🛠️ Fichiers à créer

| Fichier | Contenu |
|---------|---------|
| `content/docs/installation.mdx` | One-liner, binaires par OS, build from source |
| `content/docs/features.mdx` | 12 features détaillées |
| `content/docs/keybindings.mdx` | 5 tableaux (Global, Request, Response, Body, Drawers) |
| `content/docs/storage.mdx` | `~/.apix/` — history.json, collections.json, environments.json |
| `content/docs/tech-stack.mdx` | Rust, Ratatui, Reqwest, Tokio, Serde |
| `content/docs/faq.mdx` | 5+ questions fréquentes |

---

## 🔗 Dépendances

### Dépend de
- Task #04 : Infrastructure documentation MDX

---

## 💬 Notes

- Source principale : README de `/home/cianus/Documents/projects/apix`
- Écrire en anglais (public cible international)
