#! /usr/bin/zsh
# source ./gitconfigurations.sh  #CREATOR GITIGNORE

MENU="
---------------------
Create Structure Main
---------------------
"


TIME(){
echo "2s"
sleep 1
echo "1s"
sleep 1
}

CREATE_FOLDER_VSCODE(){
echo "*********************"
echo "Criando Pasta .vscode"
echo "*********************"
TIME
mkdir .vscode
cd .vscode
touch settings.json
CONTENT_VSCODE_INITIAL_CONFIGURATIONS
CREATE_FILE_README
cd ..
}


CONTENT_VSCODE_INITIAL_CONFIGURATIONS(){
echo "*********************************************************"
echo "Adicionando Conteudo ao Arquivo de Configurações settings"
echo "*********************************************************"
TIME
cat << EOF > settings.json
{
  "editor.fontSize": 18,
  "editor.minimap.enabled": false,
  "window.zoomLevel": 1,
  "editor.wordWrap": "on"
}
EOF
}

CREATE_FILE_README(){
echo "***********************"
echo "Criando Arquivo README"
echo "***********************"
TIME
touch README.md
}


EXECUTE(){
  echo "$MENU"
  CREATE_FOLDER_VSCODE
}


EXECUTE
