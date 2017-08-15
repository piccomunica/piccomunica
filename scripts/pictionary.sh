#!/bin/bash
ls ../www/img/pictionary > ./pictionary/categories.txt

filename="./pictionary/categories.txt"

while read -r line
do
    category="$line"
    ls "../www/img/pictionary/$category" | sed -n 's/\.png$//p' | sed "s/;/\";\"/g;s/^/\"/;s/$/\",/" | sed ':a;N;$!ba;s/\n/ /g' > ./pictionary/$category.txt
done < "$filename"

while read -r line
do
    category="$line"
    ls "../www/img/pictionary" | sed "s/;/\";\"/g;s/^/\"/;s/$/\": [],/" > ./pictionary/categories.txt
done < "$filename"