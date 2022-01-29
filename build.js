const electronInstaller = require('electron-winstaller');
const path = require('path');

const rootPath = path.join('./');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './release-builds/POC-win32-x64',
    outputDirectory: './installers',
    authors: 'Gaurabh',
    noMsi: true,
    exe: 'poc.exe',
    setupExe: 'POCInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'images', 'icon.ico')
  });

resultPromise.then(() => console.log("It is working"), (e) => console.log(`No dice: ${e.message}`));