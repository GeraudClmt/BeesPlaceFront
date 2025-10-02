# BeesPlace

Application Vue 3 + Vuetify

## Description
Ce projet est une application Vue.js utilisant le framework Vuetify pour l'UI, avec personnalisation du thème et de la typographie.

## Installation

```
git clone <ce-repo>
cd BeesPlace
npm install
```

## Démarrage du projet

```
npm run dev
```

> L'application sera disponible sur http://localhost:5173 (ou autre port affiché)

## Structure des dossiers

```
src/
  App.vue              # Composant racine
  main.js              # Point d'entrée, configuration Vue & Vuetify
  router/              # Dossier de configuration du router
    index.js           # Définition des routes
  assets/
    fonts/             # Polices personnalisées
  style.css            # Styles globaux, surcharge Vuetify, font-face
public/
  index.html           # Point d'entrée HTML (balise <title>)
```