import { app, BrowserWindow } from 'electron';
import path from 'path';

process.env.ROOT = path.join(__dirname, '..');
process.env.DIST = path.join(process.env.ROOT, 'dist-electron');
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
	? path.join(process.env.ROOT, 'public')
	: path.join(process.env.ROOT, '.output/public');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win: BrowserWindow;
const preload = path.join(process.env.DIST, 'preload.js');

const createWindow = () => {
	win = new BrowserWindow({
		webPreferences: {
			preload,
			nodeIntegrationInWorker: true,
			contextIsolation: false,
			nodeIntegration: true,
			webSecurity: false
		}
	});

	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL);
		win.webContents.openDevTools();
	} else {
		win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'));
	}
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length == 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
