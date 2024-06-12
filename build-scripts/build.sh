cd client
ls
pwd
echo VITE_API_URL = {
echo ${{ vars.URL_FRONT }}
echo }
echo VITE_API_URL = ${{ vars.URL_FRONT }} > .env
npm install
npm run build
chmod +x ./../build-scripts/copy_build_to_server.sh && ./../build-scripts/copy_build_to_server.sh
chmod +x ./../build-scripts/create-env-production.sh && ./../build-scripts/create-env-production.sh