## Developement
1. Add file .env in root:

Exemple .env
```
# Database
MONGO_URI = mongodb+srv://devAccount:devAccount@3wa.mtqtmav.mongodb.net/devRoute

# Listening port
PORT = 4000
BASE_URL = localhost

# Client side URL for allowed access to API data with cors
CLIENT_URL = localhost:3000

# Token
JWT_SECRET = $mygeneratedtokenandmanychars
JWT_EXPIRATION = 1d
```

## Deployement

### Commons Steps
1. Open terminal
2. Going inside the client folder
3. `npm run build` to build the front
4. `npm run cb2s` cb2s for client build to server. Will copy the dist content to server/public

### Alwaysdata alwaysdata.com
1. Connect to always data in FTP with Filezilla
2. Create folder pillowinteractive and copy the content of server excepted node_modules folder
3. You maybe should rename `.env` file with `.env.production`
4. Going to admin.alwaysdata.com
5. Web > Sites > YOUR_CONFIGURATION_ENTRY or `Add a site`
6. Click on left icon ⚙ (modify)
7. In Configuration, change Type* to Node.js
8. Set the command : `node --env-file=.env ~/pillowinteractive/server.js > ~/pillowinteractive/nodejs.log`
    * .env file should be have the path `/home/YOU_HOME/pillowinteractive/.env.production` with follow config

    ```
    # Database
    MONGO_URI = yourmongourl.com

    # Server port
    PORT = 8100 # Only use this port for alwaysdata
    BASE_URL = localhost #Not used, only for display ip

    # Client side URL for allowed access to API data with cors
    CLIENT_URL = localhost:8100

    # Token
    JWT_SECRET = $2y$10$icc8svDngl1zd0Ph/uM1c.eSBBG3w36cDE1Et9o2cV1fbEsU6ZDea
    JWT_EXPIRATION = 1d
    ```
9. Set `Working directory` to pillowinteractive to be have /home/YOU_HOME/pillowinteractive
10. Submit and reload the website
11. If you have someproblem check logs inside ~/admin/logs
    * If you have a message like `Connection to upstream refused`, maybe the command (at the 8. step) is not correct or the server port 8100 is not correcly used. Check if `server.js` and `.env` have good path. And don't forget about the `Working directory`