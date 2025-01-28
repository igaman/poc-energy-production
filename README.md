# poc-energy-production

![Version](https://img.shields.io/badge/version-0.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Table des Matières

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Données et API](#données-et-api)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Contact](#contact)

## Présentation

**poc-energy-production** est une application web dédiée à la visualisation des productions régionales annuelles d'énergie renouvelable en France. Elle permet d'analyser les données relatives à l'électricité depuis 2008 et au gaz depuis 2015, en mettant particulièrement l'accent sur le biométhane injecté dans les réseaux de gaz.

## Fonctionnalités

- **Visualisation Interactive** : Utilisation de Highcharts pour des graphiques dynamiques et interactifs.
- **Sélection de Données** : Choix de l'année et des régions spécifiques pour affiner l'analyse.
- **Gestion des Régions** : Ajout et suppression de régions pour personnaliser les données affichées.
- **Chargement Asynchrone** : Indicateur de chargement lors de la récupération des données.

## Technologies Utilisées

- **Vue.js 3** : Framework JavaScript pour la construction de l'interface utilisateur.
- **Vite** : Outil de build rapide pour le développement front-end.
- **Tailwind CSS** : Framework CSS utilitaire pour un design réactif et moderne.
- **Highcharts Vue** : Intégration de Highcharts avec Vue.js pour la visualisation des données.
- **Vitest** : Framework de test unitaire pour assurer la qualité du code.

## Installation

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** ou **yarn**

### Étapes d'installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/igaman/poc-energy-production.git
   cd poc-energy-production
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Démarrer le serveur de développement :**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Utilisation

Une fois le serveur de développement lancé, vous pouvez interagir avec l'application de la manière suivante :

1. **Sélection de l'année :** Choisissez une année dans le menu déroulant pour visualiser les données correspondantes.
2. **Gestion des régions :**
   - **Ajouter une région :** Cliquez sur le bouton "Ajouter" pour inclure une nouvelle région dans l'analyse.
   - **Supprimer une région :** Cliquez sur le bouton "Supprimer" pour retirer la dernière région ajoutée.
3. **Visualisation des données :** Les graphiques se mettront à jour automatiquement en fonction des sélections effectuées.

## Tests

L'application utilise **Vitest** pour les tests unitaires. Voici comment exécuter les tests :

```bash
npm run test
# ou
yarn test
```

Les tests sont situés dans le répertoire `tests` et couvrent les composants principaux de l'application, assurant leur bon fonctionnement.

## Données et API

### Description des Données

Ce jeu de données présente les productions régionales annuelles d'énergie renouvelable en France (GWh) pour l'électricité depuis 2008 et depuis 2015 pour le gaz.

Pour le biométhane, il s'agit des quantités injectées dans les réseaux de gaz (réseaux de distribution et de transport) en France comptabilisées aux points d'interfaces transport/distribution puis réparties entre les régions avec des clés de répartition adéquates. Les injections sont donc affectées par ces clés de répartition et non associées exactement à celles de chaque site.

### API Utilisée

L'application utilise l'API **Open Data Réseaux Énergies (ODRÉ)** pour récupérer les données nécessaires :

- **URL de l'API :** [ODRÉ - Production Régionale Annuelle ENR](https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/prod-region-annuelle-enr/records?limit=20&refine=code_insee_region:11)

Vous pouvez consulter la documentation complète de l'API sur le site officiel d'ODRÉ pour en savoir plus sur les endpoints disponibles et les paramètres de requête.

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créer une branche** pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalité`)
3. **Commiter** vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. **Pousser** vers la branche (`git push origin feature/nouvelle-fonctionnalité`)
5. **Ouvrir une Pull Request**

Assurez-vous de respecter le guide de contribution et de maintenir une couverture de test adéquate pour vos ajouts.

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :

- **Email :** contact@igaman.fr

---
