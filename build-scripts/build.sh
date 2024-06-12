cd client
ls
pwd
echo $URL_FRONT
echo VITE_API_URL = $URL_FRONT > .env
npm install
npm run build
../build-scripts/copy_build_to_server.sh