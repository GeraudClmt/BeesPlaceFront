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

## Personnalisation de la police
Les fontes personnalisées sont placées dans `src/assets/fonts/`. La police "Playfair_Display" est appliquée globalement via `src/style.css` et sur l'ensemble de l'UI Vuetify.

## Surcharges du thème
- Le `background-color` global est appliqué via le CSS sur `.v-application` et `body`.
- Le font-family global est assuré en CSS et/OU via la config de Vuetify si besoin.

---

**Pour toute personnalisation :**
- Change le titre dans `public/index.html`.
- Modifie la police dans `src/assets/fonts/` et `src/style.css`.
- Adapte la config theme ou defaults dans `main.js` si besoin.
