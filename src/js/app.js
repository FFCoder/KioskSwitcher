const { remote } = require('electron')
const { powerMonitor, BrowserWindow, app } = remote;
const child = require('child_process');


const WINDOW_STATE = {
    NULL: {}
}
const VERITIME_URL = "https://veritime.aesoponline.com/Clock?Org=10717&KID=1593"
var MAX_IDLE_TIME = 6;
const VERITIME_BUTTON = document.getElementById('vtLaunch');
const PAPERCUT_BUTTON = document.getElementById('papercutLaunch');

let win;

const loadVeritime = () => {
    win = new BrowserWindow({
        fullscreen: true,
    });
    win.loadURL(VERITIME_URL);
    win.show();
    // Veritime may have a longer idle time if user is preparing to use the barcode scanner. 
    // So I increased the idle time here. 
    MAX_IDLE_TIME = 10;
}

const loadPapercut = () => {
    win = child.spawn("pc-release.exe", {
        cwd: '\\\\papercut\\PCRelease\\',
    });
    
}



VERITIME_BUTTON.addEventListener('click', loadVeritime);
PAPERCUT_BUTTON.addEventListener('click', loadPapercut);

setInterval(() => {
    var idleTime = powerMonitor.getSystemIdleTime();
    if (idleTime >= MAX_IDLE_TIME) {
        if (win !== WINDOW_STATE.NULL) {
            win.close();
            win = null;
        }
    }
}, 500);
