mv -v client/dist/* server/public/
cd server/public/
sudo apt install imagemagick
#magick mogrify -resize 200% -format jpg *.jpg