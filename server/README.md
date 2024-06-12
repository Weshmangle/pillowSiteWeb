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