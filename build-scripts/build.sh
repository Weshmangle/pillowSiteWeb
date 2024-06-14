ls

echo $SSH_KEY > ~/.ssh/id_ed25519.pub
ls ~/.ssh/id_ed25519.pub
echo "file" > lolilol
scp lolilol weshmangle_ssh@ssh-weshmangle.alwaysdata.net:~/

cd client
pwd
echo VITE_API_URL = $URL_FRONT > .env

npm install
npm run build
chmod +x ./../build-scripts/copy_build_to_server.sh && ./../build-scripts/copy_build_to_server.sh
chmod +x ./../build-scripts/create-env-production.sh && ./../build-scripts/create-env-production.sh
