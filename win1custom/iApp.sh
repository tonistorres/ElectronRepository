#! /usr/bin/zsh

MENU="
-----------------------------------------
Create Structure Folder App
-----------------------------------------
"

TIME(){
echo "2s"
sleep 1
echo "1s"
sleep 1
}


CREATE_STRUCTURE_INITIAL_IN_PROJECT(){
echo "******************************************"
echo "Criando Arquivos necessário para pasta App"
echo "******************************************"
TIME
touch index.html
touch main.js
touch preload.js
touch renderer.js
touch styles.css
}

INITIAL_APP_NPM_INIT(){
echo "*********************************"
echo "Configurando Arquivos Pakage.json"
echo "*********************************"
TIME
npm init -y
}


INSTALL_ELECTRON(){
echo "****************************"
echo "Instalando FrameWorkElectron"
echo "****************************"
TIME
npm install electron --save-dev
}

CREATE_GITIGNORE(){
echo "****************************"
echo "Criando o arquivo gitignore "
echo "****************************"
TIME
touch .gitignore
cat << EOF >> .gitignore
node_modules/
EOF
}


EXECUTE(){
  echo "$MENU"
  CREATE_STRUCTURE_INITIAL_IN_PROJECT
  INITIAL_APP_NPM_INIT
  INSTALL_ELECTRON
  CREATE_GITIGNORE
}

EXECUTE
