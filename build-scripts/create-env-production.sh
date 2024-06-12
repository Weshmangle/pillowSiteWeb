#!/bin/bash
ENV_FILE=.env.production
# Create .env file
echo > $ENV_FILE

echo \# Database >> $ENV_FILE
echo MONGO_URI = ${{ vars.MONGO_URI }} > $ENV_FILE
echo >> $ENV_FILE
echo \# Server port >> $ENV_FILE
echo PORT = ${{ vars.SERVER_PORT }} >> $ENV_FILE
echo BASE_URL = ${{ vars.BASE_URL }} >> $ENV_FILE
echo >> $ENV_FILE
echo \# Client side URL for allowed access to API data with cors >> $ENV_FILE
echo CLIENT_URL = ${{ vars.CLIENT_ADDRESS }} >> $ENV_FILE
echo >> $ENV_FILE
echo \# Token >> $ENV_FILE
echo JWT_SECRET = ${{ vars.JWT_TOKEN_SECRET }} >> $ENV_FILE
echo JWT_EXPIRATION = ${{ vars.JWT_EXPIRATION }} >> $ENV_FILE