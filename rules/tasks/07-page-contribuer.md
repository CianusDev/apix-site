# Task 07 : Page Contribuer & Licence

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 07 |
| **Titre** | Page Contribuer & Licence |
| **Priorité** | 🟢 Basse |
| **Statut** | ✅ Terminé |
| **Estimation** | 2h |

---

## 🎯 Objectif

Créer la page `/contributing` avec le workflow de contribution, les commandes Rust et la licence MIT.

---

## ✅ Critères d'acceptation

- [ ] Page accessible à `/contributing`
- [ ] Commandes Rust dans des `<CodeBlock>` : `cargo test`, `cargo clippy`, `cargo fmt`
- [ ] Lien direct vers `https://github.com/CianusDev/apix` pour ouvrir une PR
- [ ] Licence MIT affichée ou liée
- [ ] Page Server Component, responsive
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Fichiers à créer

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/contributing/page.tsx` | Créer | Page de contribution (Server Component) |

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global ✅
- Task #02 : Composants UI réutilisables ✅

---

## 💬 Notes

- Page simple, pas besoin d'une feature dédiée — un seul `page.tsx` suffit
