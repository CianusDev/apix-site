# Pattern : Services

Ce document décrit comment créer et utiliser les **services** dans ce projet.

---

## Concept

Un **service** est une couche d'abstraction qui encapsule la logique de communication avec des ressources externes (API, base de données, services tiers).

**Types de services :**
- **Services de feature** : Spécifiques à une fonctionnalité (`features/{feature}/*.service.ts`)
- **Services globaux** : Partagés entre features (`services/*.service.ts`)

---

## Structure d'un Service

### Service de Feature

```typescript
// features/users/users.service.ts
"use server";

import { api, processApiData } from "@/config/axios";
import { APIResponse } from "@/config/types";

const endpoint = "/users";

// GET - Liste
export async function getUsers(): Promise<APIResponse> {
  const handle = api.get(endpoint);
  return processApiData(handle);
}

// GET - Détail
export async function getUserById(id: string): Promise<APIResponse> {
  const handle = api.get(`${endpoint}/${id}`);
  return processApiData(handle);
}

// POST - Création
export async function createUser(data: CreateUserDTO): Promise<APIResponse> {
  const handle = api.post(endpoint, data);
  return processApiData(handle);
}

// PATCH - Mise à jour partielle
export async function updateUser(id: string, data: UpdateUserDTO): Promise<APIResponse> {
  const handle = api.patch(`${endpoint}/${id}`, data);
  return processApiData(handle);
}

// DELETE - Suppression
export async function deleteUser(id: string): Promise<APIResponse> {
  const handle = api.delete(`${endpoint}/${id}`);
  return processApiData(handle);
}
```

---

## Règles Fondamentales

### 1. Toujours utiliser `"use server"`

```typescript
"use server"; // Obligatoire en première ligne

export async function myAction() {
  // ...
}
```

Les services sont des **Server Actions** Next.js qui s'exécutent côté serveur.

### 2. Toujours retourner `APIResponse`

```typescript
import { APIResponse } from "@/config/types";

export async function getUsers(): Promise<APIResponse> {
  // ...
}
```

Le type `APIResponse` standardise les retours :
```typescript
type APIResponse = {
  data?: unknown;
  message?: string;
  success: boolean;
};
```

### 3. Utiliser `processApiData`

```typescript
import { api, processApiData } from "@/config/axios";

export async function getUsers(): Promise<APIResponse> {
  const handle = api.get("/users");
  return processApiData(handle); // Gère les erreurs automatiquement
}
```

`processApiData` :
- Transforme la réponse Axios en `APIResponse`
- Gère les erreurs HTTP (401 → redirect, etc.)
- Standardise les messages d'erreur

---

## Instance Axios Configurée

L'instance `api` est préconfigurée dans `config/axios.ts` :

```typescript
import { api } from "@/config/axios";

// Intercepteur de requête : ajoute automatiquement le token
// Intercepteur de réponse : gère les erreurs globales
```

**Ne pas créer de nouvelle instance Axios** - utiliser toujours `api`.

---

## Patterns Courants

### Requête avec Query Parameters

```typescript
export async function getUsers(filters?: UsersFilters): Promise<APIResponse> {
  const handle = api.get(endpoint, { params: filters });
  return processApiData(handle);
}
```

### Requête avec FormData

```typescript
export async function uploadAvatar(file: File): Promise<APIResponse> {
  const formData = new FormData();
  formData.append("avatar", file);
  
  const handle = api.post("/upload/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return processApiData(handle);
}
```

### Requête avec Timeout personnalisé

```typescript
export async function longRunningTask(): Promise<APIResponse> {
  const handle = api.post("/tasks/process", data, {
    timeout: 60000, // 60 secondes
  });
  return processApiData(handle);
}
```

---

## Services Globaux

Les services partagés entre plusieurs features vont dans `src/services/`.

### Exemple : Session Service

```typescript
// services/session.service.ts
"use server";

import { SessionPayload } from "@/config/types";
import { deleteSession, updateSession, verifySession } from "@/config/session";

export async function getToken() {
  const session = await verifySession();
  return { token: session?.token };
}

export async function refreshSession(payload: Partial<SessionPayload>) {
  try {
    return await updateSession(payload);
  } catch {
    return false;
  }
}

export async function removeSession() {
  try {
    await deleteSession();
    return true;
  } catch {
    return false;
  }
}
```

---

## Gestion des Erreurs

### Dans le Service

Le service ne gère pas les erreurs - c'est `processApiData` qui s'en charge.

```typescript
// ❌ MAUVAIS - Ne pas try/catch dans le service
export async function getUsers(): Promise<APIResponse> {
  try {
    const response = await api.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: "Erreur" };
  }
}

// ✅ BON - Laisser processApiData gérer
export async function getUsers(): Promise<APIResponse> {
  const handle = api.get(endpoint);
  return processApiData(handle);
}
```

### Côté Client (Hook)

La gestion d'erreur se fait dans le hook :

```typescript
// use-users.ts
const { success, data, message } = await getUsers();

if (success && data) {
  setUsers(data as User[]);
} else {
  setError(message || "Une erreur s'est produite");
}
```

---

## Conventions de Nommage

| Action | Préfixe | Exemple |
|--------|---------|---------|
| Récupérer liste | `get` | `getUsers()` |
| Récupérer un élément | `get...ById` | `getUserById(id)` |
| Créer | `create` | `createUser(data)` |
| Mettre à jour | `update` | `updateUser(id, data)` |
| Supprimer | `delete` | `deleteUser(id)` |
| Action spécifique | verbe d'action | `activateUser(id)` |

---

## Exemple : Service Complet

```typescript
// features/products/products.service.ts
"use server";

import { api, processApiData } from "@/config/axios";
import { APIResponse } from "@/config/types";
import { CreateProductDTO, UpdateProductDTO, ProductsFilters } from "./products.types";

const endpoint = "/products";

export async function getProducts(filters?: ProductsFilters): Promise<APIResponse> {
  const handle = api.get(endpoint, { params: filters });
  return processApiData(handle);
}

export async function getProductById(id: string): Promise<APIResponse> {
  const handle = api.get(`${endpoint}/${id}`);
  return processApiData(handle);
}

export async function getProductBySlug(slug: string): Promise<APIResponse> {
  const handle = api.get(`${endpoint}/slug/${slug}`);
  return processApiData(handle);
}

export async function createProduct(data: CreateProductDTO): Promise<APIResponse> {
  const handle = api.post(endpoint, data);
  return processApiData(handle);
}

export async function updateProduct(id: string, data: UpdateProductDTO): Promise<APIResponse> {
  const handle = api.patch(`${endpoint}/${id}`, data);
  return processApiData(handle);
}

export async function deleteProduct(id: string): Promise<APIResponse> {
  const handle = api.delete(`${endpoint}/${id}`);
  return processApiData(handle);
}

export async function publishProduct(id: string): Promise<APIResponse> {
  const handle = api.post(`${endpoint}/${id}/publish`);
  return processApiData(handle);
}

export async function unpublishProduct(id: string): Promise<APIResponse> {
  const handle = api.post(`${endpoint}/${id}/unpublish`);
  return processApiData(handle);
}
```

---

## Checklist Nouveau Service

- [ ] Ajouter `"use server"` en première ligne
- [ ] Importer `api` et `processApiData` depuis `@/config/axios`
- [ ] Importer `APIResponse` depuis `@/config/types`
- [ ] Définir l'endpoint en constante
- [ ] Typer le retour avec `Promise<APIResponse>`
- [ ] Utiliser `processApiData` pour toutes les requêtes
- [ ] Suivre les conventions de nommage