console.log("Electron - Processo principal")

//importação dos recursos do framework 
//app (se refere a aplicação)
//BrowserWindow (criação da janela)
//nativeTheme (definir tema claro ou escuro)
//Menu (definir um menu personalizado)
// shell (acessar links externo no navegador)
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')

//Janela principal
let win
const createWindow = () => {
  // definindo o tema da janela claro ou escuro
  nativeTheme.themeSource = 'light'
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

  //carregar o menu personalizado
  //Atenção! Antes importar o recurso Menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  //carregar o documento HTML na janela
  win.loadFile('./src/views/index.html')
}

// janela Sobre
function aboutWindow() {
  nativeTheme.themeSource='light'
  // Obter a janela principal
  const mainWindow = BrowserWindow.getFocusedWindow()
  // Validação (se existir a janela principal)
  if (mainWindow) {
    about = new BrowserWindow({
      width: 320,
      height: 280,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      // Estabelecer uma relação hierárquica entre janelas
      parent: mainWindow,

      // criar uma janela modal (só retorna a principal quando encerrada)
      modal: true
    })
  }
  
  about.loadFile('./src/views/sobre.html')
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

// Reduzir a verbosidade de logs não críticos (devtools)
app.commandLine.appendSwitch('log-level','3')

//template do menu
const template = [
  {
    label: 'Notas',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N'  
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },

  {
    label: 'Ferramentas',
    submenu:[
      {
        label:'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label:'Reduzir',
        role: 'zoomOut'
      },
      {
        label:'Restaurar o zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label:'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },

  {
    label: 'Ajuda',
    submenu:[
      {
        label:'Repositório',
        click: () => shell.openExternal('https://github.com/ElenGrecco/stickynotes')
      },
      {
        label:'Sobre',
        click: () => aboutWindow()
      }
      
    ]
  }

]