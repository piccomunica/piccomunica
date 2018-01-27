#!/bin/bash
# añade el nombre de cada carpeta al archivo
ls ../www/img/pictionary > ./pictionary/categories.txt

filename="./pictionary/categories.txt"

# itera sobre cada linea del archivo
while read -r line
do
  category="$line"
  # lista todos los archivos dentro de la carpetas y formatea la salida a un archivo por categoría
  ls "../www/img/pictionary/$category" | sed -n 's/\.png$//p' | sed "s/;/\";\"/g;s/^/\"/;s/$/\",/" | sed ':a;N;$!ba;s/\n/ /g' > ./pictionary/$category.txt
done < "$filename"

# reformatea las categorías a "categoría": [],
ls "../www/img/pictionary" | sed "s/;/\";\"/g;s/^/\"/;s/$/\": [],/" > ./pictionary/categories.txt

# borra el antiguo archivo
rm ./pictionary/final.txt

while read -r line
do
  category="$line"
  if [ "$(echo $category | sed "s/^\"//g;s/\"\: \[\]\,$//g")" != ": []," ]; then
    # consigue los pictos por categoría
    pictos=$(cat ./pictionary/$(echo $category | sed "s/^\"//g;s/\"\: \[\]\,$//g").txt )
    # añade los pictos dentro de las categorías
    echo $line | sed "s/\[\]/\[$(echo $pictos)\]/g" | sed "s/\,\]\,/\]\,/g" >> ./pictionary/final.txt
  fi
done < "$filename"