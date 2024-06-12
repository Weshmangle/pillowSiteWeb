cd client
ls
pwd
echo $URL_FRONT
echo VITE_API_URL = $URL_FRONT > .env
npm install
npm run build
npm run cb2s