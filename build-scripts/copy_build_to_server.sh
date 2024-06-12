mv .\dist\* ..\server\public\
cd ./server/public/

sudo apt install imagemagick
--#magick.exe mogrify -resize 200% -format jpg *.jpg