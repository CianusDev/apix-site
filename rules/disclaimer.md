# Disclaimer - Instructions pour les Agents IA

Ce document contient les directives et avertissements importants pour tout agent IA travaillant sur ce projet.

---

## ⚠️ Avertissements Importants

### 1. Ne Jamais Modifier Sans Comprendre

Avant de modifier un fichier, **lis et comprends** son contexte :
- Lis le fichier concerné en entier
- Identifie les dépendances et les fichiers liés
- Comprends l'architecture globale (voir `architecture.md`)

### 2. Respecter l'Architecture Existante

Ce projet suit une **architecture feature-based**. Ne pas :
- Créer des fichiers en dehors de la structure définie
- Mélanger la logique de différentes features
- Placer des composants métier dans `components/ui/`

### 3. Variables d'Environnement

**JAMAIS** de secrets en dur dans le code :
- Les clés API vont dans `.env.local`
- Utiliser `serverEnv` pour les variables sensibles
- Utiliser `clientEnv` pour les variables publiques (préfixe `NEXT_PUBLIC_`)

### 4. Fichiers Sensibles à Ne Pas Modifier

Sauf demande explicite, ne pas modifier :
- `config/env.ts` - Validation des variables d'environnement
- `config/session.ts` - Gestion des sessions JWT
- `tsconfig.json` - Configuration TypeScript
- `package.json` - Dépendances (sans validation)

---

## 📋 Checklist Avant Modification

- [ ] J'ai lu le fichier `rules/README.md`
- [ ] J'ai compris l'architecture (`rules/architecture.md`)
- [ ] J'ai vérifié le pattern approprié (`rules/patterns/*.md`)
- [ ] Je respecte les conventions de nommage
- [ ] Je n'introduis pas de code dupliqué

---

## 🏗️ Conventions de Code

### Nommage des Fichiers

| Type | Convention | Exemple |
|------|------------|---------|
| Composant | `kebab-case.tsx` | `user-card.tsx` |
| Hook | `use-*.ts` | `use-users.ts` |
| Service | `*.service.ts` | `users.service.ts` |
| Model | `*.model.ts` | `user.model.ts` |
| Guard | `*.guard.ts` | `auth.guard.ts` |

### Nommage des Exports

| Type | Convention | Exemple |
|------|------------|---------|
| Composant | PascalCase | `UserCard` |
| Hook | camelCase avec `use` | `useUsers` |
| Fonction | camelCase | `getUsers` |
| Type/Interface | PascalCase | `User`, `SessionPayload` |
| Constante | SCREAMING_SNAKE_CASE | `TOKEN_VALIDITY_PERIOD` |

### Structure d'un Composant

```tsx
"use client"; // Si nécessaire

import { ... } from "react";
import { ... } from "@/lib/utils";
import { ... } from "./local-file";

interface ComponentProps {
  // Props typées
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks en premier
  // Logique
  // Return JSX
}
```

---

## 🔒 Sécurité

### Ce qu'il ne faut JAMAIS faire

1. **Exposer des secrets côté client**
   ```typescript
   // ❌ MAUVAIS
   const apiKey = "sk-secret-key";
   
   // ✅ BON
   const apiKey = serverEnv.API_KEY; // server-only
   ```

2. **Désactiver la validation TypeScript**
   ```typescript
   // ❌ MAUVAIS
   // @ts-ignore
   // @ts-nocheck
   
   // ✅ BON - Typer correctement
   ```

3. **Utiliser `any`**
   ```typescript
   // ❌ MAUVAIS
   function process(data: any) {}
   
   // ✅ BON
   function process(data: unknown) {}
   function process<T>(data: T) {}
   ```

---

## 📁 Où Placer les Nouveaux Fichiers

| Type de fichier | Emplacement |
|-----------------|-------------|
| Nouvelle page | `src/app/{route}/page.tsx` |
| Composant UI générique | `src/components/ui/` |
| Composant de layout | `src/components/layouts/` |
| Composant métier | `src/features/{feature}/components/` |
| Hook global | `src/hooks/` |
| Hook de feature | `src/features/{feature}/use-*.ts` |
| Service de feature | `src/features/{feature}/*.service.ts` |
| Service global | `src/services/` |
| Type/Model | `src/models/` |
| Utilitaire | `src/lib/` |
| Provider | `src/providers/` |
| Store | `src/stores/` |

---

## 🧪 Avant de Terminer

1. **Vérifier le typage** : `pnpm type-check`
2. **Vérifier le linting** : `pnpm lint`
3. **Tester le build** : `pnpm build`

---

## 📚 Documentation de Référence

- Architecture : `rules/architecture.md`
- Patterns : `rules/patterns/*.md`
- Tasks : `rules/tasks/*.md`
- PRD : `rules/prd.md` (si disponible)

---

## 🤝 En Cas de Doute

Si tu n'es pas sûr de quelque chose :
1. **Demande clarification** à l'utilisateur
2. **Propose plusieurs options** avec leurs avantages/inconvénients
3. **Ne fais pas d'hypothèses** sur les besoins métier