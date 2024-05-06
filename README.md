# Site web de Pillow Interactive

## Caractéristiques
- **Frontend** : React avec Vite
- **Backend** : NodeJS avec ExpressJS
- **Base de données** : MongoDB
- **Authentification des admins** : JWT (JSON Web Tokens) et bcrypt pour le hachage des mots de passe
- **Gestion des images** : Multer
- **Format des responses** : JSON

# Client side

## Dépendances coté client
- **axios** : Pour les requêtes HTTP.
- **react-router-dom** : Pour la gestion des routes dans React.


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