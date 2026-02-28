# Task 00 : Exemple de Template de Tâche

Ce fichier sert de **modèle** pour documenter les tâches à réaliser dans le projet.

---

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | 00 |
| **Titre** | Exemple de tâche |
| **Priorité** | 🟡 Moyenne |
| **Statut** | ✅ Terminé |
| **Estimation** | 2h |

---

## 🎯 Objectif

Décrire clairement ce que cette tâche doit accomplir.

**Exemple :**
> Créer un composant de carte utilisateur réutilisable qui affiche les informations de base d'un utilisateur (nom, email, avatar, statut).

---

## 📝 Description

Description détaillée de la tâche avec le contexte nécessaire.

### Contexte
Expliquer pourquoi cette tâche est nécessaire et dans quel contexte elle s'inscrit.

### Périmètre
- Ce qui est inclus dans la tâche
- Ce qui n'est PAS inclus (out of scope)

---

## ✅ Critères d'acceptation

- [ ] Critère 1 : Description du premier critère
- [ ] Critère 2 : Description du deuxième critère
- [ ] Critère 3 : Description du troisième critère
- [ ] Tests : Les tests sont écrits et passent
- [ ] Documentation : La documentation est à jour

---

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `src/features/users/components/user-card.tsx` | Créer | Composant carte utilisateur |
| `src/models/user.model.ts` | Modifier | Ajouter le type Avatar |

### Étapes

1. **Étape 1** : Créer la structure de base
   - Créer le fichier du composant
   - Définir les props

2. **Étape 2** : Implémenter la logique
   - Ajouter le rendu JSX
   - Gérer les états

3. **Étape 3** : Styliser le composant
   - Appliquer les classes Tailwind
   - Assurer le responsive

---

## 🔗 Dépendances

### Dépend de
- Task #XX : Nom de la tâche prérequise (si applicable)

### Bloque
- Task #YY : Nom de la tâche bloquée (si applicable)

---

## 📚 Ressources

- [Lien vers la maquette Figma](https://figma.com/...)
- [Documentation pertinente](https://...)
- Référence : `rules/patterns/features.md`

---

## 💬 Notes

Informations supplémentaires, décisions de design, questions en suspens...

### Décisions prises
- Décision 1 : Explication de la décision

### Questions ouvertes
- ❓ Question 1 : À clarifier avec le product owner

---

## 📊 Historique

| Date | Auteur | Action |
|------|--------|--------|
| 2024-01-15 | @dev | Création de la tâche |
| 2024-01-16 | @dev | Début de l'implémentation |
| 2024-01-17 | @dev | Tâche terminée |

---

## Template vierge

```markdown
# Task XX : [Titre de la tâche]

## 📋 Informations

| Champ | Valeur |
|-------|--------|
| **ID** | XX |
| **Titre** | [Titre] |
| **Priorité** | 🔴 Haute / 🟡 Moyenne / 🟢 Basse |
| **Statut** | 📋 À faire / 🔄 En cours / ✅ Terminé |
| **Estimation** | Xh |

## 🎯 Objectif

[Description de l'objectif]

## ✅ Critères d'acceptation

- [ ] Critère 1
- [ ] Critère 2

## 🛠️ Implémentation

### Fichiers à créer/modifier

| Fichier | Action | Description |
|---------|--------|-------------|
| `path/to/file.ts` | Créer/Modifier | Description |

## 💬 Notes

[Notes additionnelles]
```
