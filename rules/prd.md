# PRD – Site Web apix

## Objectif

Développer le site web officiel de **apix**, client HTTP en terminal, afin de :
- Présenter l'outil, ses fonctionnalités et sa philosophie
- Proposer une documentation claire et interactive (MDX)
- Faciliter l'installation et l'onboarding des utilisateurs
- Centraliser les ressources (releases, guides, FAQ, contributions)

## Public cible

- Développeurs backend, DevOps, SRE, QA
- Utilisateurs de Postman, Insomnia, HTTPie, etc.
- Contributeurs open-source

## Fonctionnalités principales

### 1. Page d'accueil
- Présentation synthétique d'apix (slogan, screenshot TUI, badges)
- Bouton d'installation rapide (copier la commande bash)
- Liens vers GitHub, releases, licence

### 2. Documentation interactive (MDX)
- Organisation par sections : Installation, Fonctionnalités, Keybindings, Stockage, Tech Stack, FAQ
- Code samples interactifs (copier/coller, surlignage)
- Navigation latérale (table des matières)
- Recherche instantanée

### 3. Téléchargement & installation
- Instructions pour chaque OS (Linux, macOS, Windows)
- Liens directs vers les binaires
- Section "Build from source" (Rust)

### 4. Guides d'utilisation
- Tutoriels pas-à-pas (envoyer une requête, gérer les collections, etc.)
- Astuces sur les raccourcis clavier et l'édition JSON

### 5. Contribuer
- Explication du workflow de contribution (tests, lint, format)
- Lien vers le repo GitHub et le README
- Section "Pull requests welcome"

### 6. Licence
- Affichage de la licence MIT (FR/EN)

## Contraintes techniques

- **Framework :** Next.js (React SSR/SSG)
- **Documentation :** MDX (Markdown + React components)
- **Design :** Sobre, inspiré du terminal (dark mode par défaut) via Shadcn UI
- **Responsive :** Mobile & desktop
- **SEO :** Balises meta, sitemap, OpenGraph
- **Performance :** Chargement rapide, images optimisées

## Livrables
- Composants React réutilisables (CodeBlock, Badge, TOC, etc.)
- Fichiers MDX pour chaque section de documentation
- README du site web (installation, contribution)
