# Intervox 🎤

**Intervox** est une plateforme web qui aide les développeurs à se préparer efficacement aux entretiens techniques grâce à des simulations d'entretiens vocaux avec une IA conversationnelle.

## 📋 Description

Intervox analyse des offres d'emploi réelles et propose des entretiens techniques simulés avec un assistant IA vocal. L'application permet aux candidats de s'entraîner dans des conditions réalistes, d'améliorer leur communication orale et de recevoir des retours détaillés sur leurs performances.

### Public cible
- Étudiants en développement
- Développeurs juniors
- Développeurs en montée de compétences

## ✨ Fonctionnalités

- **Analyse automatique d'offres d'emploi** : Détection des compétences techniques et du niveau requis
- **Entretiens vocaux interactifs** : Simulation réaliste avec un assistant IA conversationnel (Vapi AI)
- **Feedback détaillé** : 
  - Scores sur différents critères (technique, communication, clarté)
  - Points forts et axes d'amélioration
  - Recommandations personnalisées
- **Interface moderne et intuitive** : Design responsive avec Tailwind CSS

## 🛠️ Stack technique

- **Frontend** : React 19 + TypeScript
- **Build tool** : Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM v7
- **Voice AI** : Vapi AI SDK (`@vapi-ai/web`)
- **Icons** : React Icons

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le dépôt** (si applicable) ou naviguer dans le dossier du projet :
   ```bash
   cd intervox
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   
   Créez un fichier `.env` à la racine du projet avec les clés suivantes :
   ```env
   VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
   VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
   ```
   
   > **Note** : Vous devez créer un compte sur [Vapi AI](https://vapi.ai) pour obtenir ces clés.

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application** :
   
   L'application sera accessible sur `http://localhost:5173` (ou le port indiqué dans le terminal)

## 🚀 Utilisation

### Workflow de l'application

1. **Page d'accueil** (`/`) : Découvrez Intervox et ses fonctionnalités
2. **Saisie d'offre** (`/offer-input`) : Collez le texte d'une offre d'emploi
3. **Entretien** (`/interview`) : Passez l'entretien technique vocal avec l'IA
4. **Feedback** (`/feedback`) : Consultez vos scores et recommandations

### Commandes disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement

# Build
npm run build        # Compile le projet pour la production

# Linting
npm run lint         # Vérifie le code avec ESLint

# Preview
npm run preview      # Prévisualise le build de production
```

## 📁 Structure du projet

```
intervox/
├── public/
│   └── assets/          # Images et assets statiques
├── src/
│   ├── components/      # Composants React réutilisables
│   │   ├── DetectedSkills.tsx
│   │   ├── NavBar.tsx
│   │   ├── OfferTextarea.tsx
│   │   ├── ScoreCard.tsx
│   │   ├── Vapi.tsx          # Widget d'intégration Vapi AI
│   │   └── VoiceInterview.tsx
│   ├── config/          # Configuration
│   │   ├── router.tsx        # Routes de l'application
│   │   └── vapi.config.ts    # Configuration Vapi AI
│   ├── pages/           # Pages de l'application
│   │   ├── AboutPage.tsx
│   │   ├── FeedbackPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── InterviewPage.tsx
│   │   ├── NotFound.tsx
│   │   └── OfferInputPage.tsx
│   ├── services/        # Services API
│   │   └── api.ts
│   ├── types/           # Définitions TypeScript
│   │   ├── app-state.ts
│   │   ├── feedback.ts
│   │   ├── interview.ts
│   │   ├── job.ts
│   │   ├── user.ts
│   │   └── vapi.ts
│   ├── App.tsx          # Composant racine
│   ├── main.tsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Configuration Vapi AI

Pour utiliser les fonctionnalités vocales, vous devez :

1. Créer un compte sur [Vapi AI](https://vapi.ai)
2. Créer un assistant dans votre dashboard Vapi
3. Récupérer votre clé publique API et l'ID de l'assistant
4. Les ajouter dans votre fichier `.env`

## 📝 Notes de développement

- L'analyse d'offres d'emploi est actuellement mockée (voir `OfferInputPage.tsx`)
- Le feedback est également mocké (voir `FeedbackPage.tsx`)
- L'intégration Vapi AI est fonctionnelle et prête à l'emploi

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est privé.

---

**Développé avec ❤️ pour aider les développeurs à réussir leurs entretiens techniques**
