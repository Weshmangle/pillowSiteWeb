## Caractéristiques
- Application React avec Vite

## Dépendances coté client
- **axios** : Pour les requêtes HTTP.
- **react-router-dom** : Pour la gestion des routes dans React.

## Developement
1. Add file .env in root:

Exemple .env
```
VITE_API_URL = localhost:4000
```


## Installation
1. Ouvrir votre terminal et accéder au dossier **client**
```
cd your_path/client
```

2. Installer les dépendances
```
npm i
```

3. Mettre le port d'écoute de votre choix et host à "true"
```
export default defineConfig({
  plugins: [react()],
  server : {
      host: true,
      port: Saisissez le port d'écoute de votre choix,
  }
})
```

4. Executer l'application en mode développement (démarrer le serveur)
```
npm run dev
```