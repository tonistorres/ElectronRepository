/**
CANAL INTERESSANTE: https://www.youtube.com/watch?v=u55le4ubK64&list=PLpyv7XsnUu5Nx2bXTyDLjotld2IQ_-Roy&index=3

O módulo app, que controla os eventos do ciclo de vida de sua aplicação.
O módulo BrowserWindow, que cria e gerencia as janelas da sua aplicação.
Pelo fato do processo principal ser executado em Node.js, você pode importá-los como módulos CommonJS no topo de seu arquivo:

*/
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindowMain() {
  let windowMain = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, //quando combinado com a função windowMain.show() obriga carregar todos elementos da pagina para so então carregá-lo por completo
    backgroundColor: "#e1e1e1",
    //transparent: true, // janela com fundo transparente
    // x: 20, // 20px da esquerda
    // y: 50, // 30px do topo
    //resizable: false, // não redimensiona janela
    // alwaysOnTop: false, // janela não aceita sobreposição
    // frame: false, // desabilita barra menu e barra principal
    // minimizable: false,
    // maximizable: false,
    // closable: false,

    // carrega o arquivo que possuia a logica de carregamento da pagina
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  windowMain.loadFile('index.html'); // carregando conteudo da janela

  //************************************* */
  //     Adicionando Fundos a Janela      /
  // Docs:https://www.electronjs.org/pt/docs/latest/api/browser-window
  //********************************** */
  // windowMain.setBackgroundColor('hsl(230, 100%, 50%)');
  // windowMain.setBackgroundColor('rgb(255, 145, 145)');
  // windowMain.setBackgroundColor('#ff00a3');
  // windowMain.setBackgroundColor('blueviolet');

  // windowMain.webContents.openDevTools(); // Abrir o inspetor de código da janela

  /** Esse evento esta estremamente ligado a propriedade show false explitada logo acima */
  windowMain.once('ready-to-show', () => {
    windowMain.show();
  });

}

/**No Electron, janelas do navegador só podem ser criadas após o módulo app disparar o evento ready. Você pode esperar por este evento utilizando a API app.whenReady(). Chame a função createWindow() após whenReady() resolver a Promise.*/
app.whenReady().then(createWindowMain);
app.whenReady().then(createWinChild);


/**
Gerencie o ciclo de vida de sua janela
Embora agora você possa abrir uma janela do navegador, precisará de algum código clichê adicional para torná-lo mais nativo para cada plataforma. As janelas do aplicativo se comportam de maneira diferente em cada sistema operacional, e a Electron atribui aos desenvolvedores a responsabilidade de implementar essas convenções em seu aplicativo.

Em geral, você pode usar o atributo processglobal platformpara executar código especificamente para determinados sistemas operacionais.

Encerrar a aplicação quando todas as janelas estiverem fechadas (Windows e Linux)
No Windows e no Linux, fechar todas as janelas geralmente encerra totalmente a aplicação.

Para implementar isso, ouça o evento appdo módulo 'window-all-closed'e chame app.quit()se o usuário não estiver no macOS ( darwin)
 */
app.on('window-all-closed', function () {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

/**
 * Abra uma janela se nenhuma estiver aberta (macOS
Enquanto os aplicativos do Linux e do Windows são encerrados quando não há janelas abertas, os aplicativos do macOS geralmente continuam em execução mesmo sem nenhuma janela aberta, e ativar o aplicativo quando não há janelas disponíveis deve abrir um novo.

Para implementar esse recurso, ouça o evento appdo módulo activatee chame seu createWindow()método existente se nenhuma janela do navegador estiver aberta.

Como as janelas não podem ser criadas antes do readyevento, você só deve ouvir activateeventos depois que seu aplicativo for inicializado. Faça isso anexando seu ouvinte de evento de dentro de seu whenReady()retorno de chamada existente.

 */
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindowMain();
  }
})
