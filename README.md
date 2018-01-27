##Mockups
by Mayte Cabrera
https://projects.invisionapp.com/share/ARCPK4FBE#/screens

##Stack tecnológico de la APP

code_langs: html, css and js
env_dev: docker https://docs.docker.com/
hybrid_build: cordova-phonegap http://docs.phonegap.com/
control_versiones: git https://git-scm.com/documentation + github https://help.github.com/articles/github-flow/
framework: jsview http://www.javascriptview.com/
web-components: polymer https://www.polymer-project.org/1.0/docs/devguide/quick-tour
libs: zepto.js (jquery light) http://zeptojs.com/, Velocity.js (animaciones) http://velocityjs.org/, tinycolor.js (gestion colores) https://github.com/bgrins/TinyColor, jquery.keyframes.js (creación dinámica de animaciones css via js) http://keyframes.github.io/jQuery.Keyframes/
icons: font-awesome http://fontawesome.io/
css: sass  http://sass-lang.com/guide
emulación: http://emulate.phonegap.com/

## Configuración del entorno de desarrollo

Instalación de docker-ce
https://www.docker.com/community-edition

Instalación de git
https://git-scm.com/book/es/v1/Empezando-Instalando-Git1

Configurar git a través de consola:
```shell
git config --global color.ui true
git config --global user.name "NAME"
git config --global user.email "EMAIL"
# si se quieren comprobar
git config --global -l
```

Clonar el repositorio:
```shell
# navegar hasta la carpeta de destino
cd /folder/sub_folder
git clone https://github.com/piccomunica/piccomunica.git
```

Guardar la ruta al proyecto en una variable de entorno y añadir un alias para poder ir directos a su carpeta
```shell
# entramos dentro de la carpeta piccomunica
cd piccomunica
export PICCOMUNICA_PATH=$(pwd)
cd ;
echo 'PICCOMUNICA_PATH="'$(printenv PICCOMUNICA_PATH)'"' >> .bash_profile
echo 'export PICCOMUNICA_PATH' >> .bash_profile
echo "alias cd_piccomunica='cd "$(printenv PICCOMUNICA_PATH)"'" >> .bash_aliases
```

Construir la imagen del proyecto desde el archivo Dockerfile
```shell
cd_piccomunica
docker build -t piccomunica .
# si quieres comprobar las imagenes disponibles
docker images
```

Guardar un alias simple para un comando complejo
```shell
cd ;
echo "alias picdocker='sudo docker run --rm -ti -p 3000:3000 -v "$(printenv PICCOMUNICA_PATH)":/data piccomunica'" >> .bash_aliases
```

Instalamos la app phonegap developer para mobile
android: https://play.google.com/store/apps/details?id=com.adobe.phonegap.app&hl=es_419
windows: https://www.microsoft.com/en-us/store/p/phonegap-developer/9wzdncrdfsj0
ios: https://itunes.apple.com/es/app/phonegap-developer/id843536693?mt=8

Ahora ejecutamos el siguiente comando y..
opción a) conectamos la app a la ip de nuestro ordenador en el puerto 3000
opción b) abrimos un navegador en nuestro ordenador y nos conectamos a localhost:3000
```shell
# da igual la carpeta donde estemos
picdocker
# y dentro de la terminal del contenedor ejecutamos
# para compilar el archivo app.sass to app.css
grunt
# para lanzar la app
phonegap serve
# para salir basta con CTRL+C y escribir exit
```

Ya podemos desarrollar nuestro código en nuestro editor favorito!!! ;)

***AVISO:
Es posible que tengamos que ejecutar los comandos docker como sudo, por eso el alias lo trae por defecto.
Si tenemos problemas con los permisos sobre los archivos ejecutaremos en el contenedor el comando
```shell
chmod -R 777 .
#recursivamente genera permisos sobre todos los archivos y carpetas que cuelgan desde nuestra ubicación
```


## Flujo de trabajo con Git

####Comandos Git básicos
```shell
# para ver la rama o branch activa (señalado con un asterisco)
git branch

# para movernos de rama
git checkout RAMA_NAME

# bajar cambios del repositorio a local
git pull
# subir cambios locales a repositorio remoto
git push

# cambios en archivos
git status # te da una lista de archivos con cambios

# añadir archivos a commitear
git add FILE_PATH # pasa de rojo a verde
# quitar archivo a commitear
git reset HEAD FILE_PATH # pasa de verde a rojo
# eliminar cambios sobre un archivo
git checkout -- FILE_PATH # pasa de rojo a nada
```

####Principales rutinas con Git

Bajar cambios del repositorio
```shell
git checkout RAMA_A_ACTUALIZAR
git pull
```

Crear una nueva *feature*
```shell
git checkout master # toda nueva feature parte de master
git checkout -b NEW_RAMA_NAME # crea la rama en local y nos mueve a ella
git push -u origin NEW_RAMA_NAME # crea la rama en remoto
```
Ahora puedes empezar a hacer cambios en el código

Registrar los cambios en el código
```shell
git status
git add FILE_PATH # tantas veces como archivos vayas a commitear
# recuerda que aquí hay más comandos para quitar o añadir archivos a commitear
git commit -m "MENSAJE"
```
***Por razones de claridad, si una vez hecho el commit quieres deshacer un cambio, modifica el código y genera un nuevo commit.

Pull request de la nueva feature
```shell
git checkout RAMA_A_ACTUALIZAR
git push
# haz un pull request sobre master
https://help.github.com/articles/creating-a-pull-request/
```

***IMPORTANTE!!!
No vamos a hacer merges en local, todos los merges a master se harán a través de pull request en github.