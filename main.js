const { app, BrowserWindow, ipcMain } = require('electron');
const nodemailer = require('nodemailer');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

ipcMain.handle('send-email', async (event, data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: 'recipient@example.com',
    subject: 'New Form Submission',
    text: `Name: ${data.name}\nPhone: ${data.phone}\nAddress: ${data.address}`
  });
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
