xcopy .\dist\* ..\server\public\ /s /e /r
cd ..\server\public\
"C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe" mogrify -resize 200% -format jpg *.jpg