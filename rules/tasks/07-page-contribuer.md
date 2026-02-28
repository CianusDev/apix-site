# Task 07 : Page Contribuer & Licence

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 07 |
| **Titre** | Page Contribuer & Licence |
| **Priorité** | 🟢 Basse |
| **Statut** | 📋 À faire |
| **Estimation** | 2h |

---

## 🎯 Objectif

Créer la page `/contributing` expliquant comment contribuer au projet apix, avec le workflow de contribution et les commandes Rust à connaître. Afficher également la licence MIT.

---

## 📝 Description

### Contexte
La page de contribution guide les développeurs qui souhaitent participer au projet open-source apix (Rust). Elle doit être simple, accueillante et fournir les commandes essentielles.

### Périmètre
- Section workflow de contribution (fork → clone → branch → PR)
- Commandes de développement Rust (`cargo test`, `cargo clippy`, `cargo fmt`)
- Lien vers le repo GitHub
- Section "Pull requests welcome" avec CTA GitHub
- Affichage de la licence MIT (texte complet ou lien)

### Out of scope
- Le code de conduite (hors périmètre PRD)

---

## ✅ Critères d'acceptation

- [ ] Page accessible à `/contributing`
- [ ] Les 3 commandes Rust sont dans des `<CodeBlock>` copiables : `cargo test`, `cargo clippy`, `cargo fmt`
- [ ] Lien direct vers `https://github.com/CianusDev/apix` pour ouvrir une PR
- [ ] Texte ou lien vers la licence MIT
- [ ] Page Server Component, responsive
- [ ] `pnpm type-check` et `pnpm lint` passent

---

## 🛠️ Implémentation

### Fichiers à créer

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/app/contributing/page.tsx` | Créer | Page de contribution (Server Component) |

### Contenu de la page

**Workflow de contribution :**
1. Fork le repo sur GitHub
2. Clone ton fork : `git clone https://github.com/<ton-username>/apix.git`
3. Crée une branche : `git checkout -b feature/ma-feature`
4. Fais tes modifications
5. Vérifie : `cargo test && cargo clippy && cargo fmt`
6. Commit et push
7. Ouvre une Pull Request sur `CianusDev/apix`

**Commandes dev :**
```bash
cargo test    # run all tests
cargo clippy  # lint
cargo fmt     # format
```

**Licence :** MIT — Voir [LICENSE](https://github.com/CianusDev/apix/blob/main/LICENSE)

---

## 🔗 Dépendances

### Dépend de
- Task #01 : Thème terminal & Layout global
- Task #02 : Composants UI réutilisables (CodeBlock)

---

## 💬 Notes

- Page simple, pas besoin d'une feature dédiée — un seul `page.tsx` suffit
- Le texte de la licence MIT peut être intégré directement ou affiché depuis un lien GitHub raw
