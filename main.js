console.log("Electron - Processo principal")

//importação dos recursos do framework 
//app (se refere a aplicação)
//BrowserWindow (criação da janela)
const { app, BrowserWindow } = require('electron/main')

//Janela principal
let win
const createWindow = () => {
  win = new BrowserWindow({
    //Para o sistema Sticky Notes o ideal para boas práticas a largura e altura este seria o ideal, devido a resolução (monitor padrão)
    //width = largura
    width: 1010,
    //height = altura
    height: 720,
    //frame: false,
    //resizable: false,
    //minimizable: false,
    //closable: false,
    //autoHideMenuBar: true
  })
  //carregar o documento HTML na janela
  win.loadFile('./src/views/index.html')
}

  //inicialização da aplicação (assincronismo, ou seja o ".then" indica o assincronismo)
app.whenReady().then(() => {
  createWindow()

  //só ativar a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

//se o sistema não for MAC encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})