import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath, URL } from 'url';
import path from 'path';
import fs from 'fs';  // Import the fs module
import Handlebars from 'handlebars';  // Import Handlebars

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js')
      }
  });

  // Compile Handlebars template and load it
  const templatePath = path.join(__dirname, 'src/renderer/views/home.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(templateSource);
  const html = template({ title: "Welcome to Electron" });

  // You can write the HTML to a temporary file and load it, or use a data URL
  const tmpFilePath = path.join(app.getPath('temp'), 'temp.html');
  fs.writeFileSync(tmpFilePath, html, 'utf8');
  mainWindow.loadFile(tmpFilePath);

  mainWindow.on('closed', () => {
      mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
      createWindow();
  }
});