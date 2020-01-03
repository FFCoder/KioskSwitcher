const { remote } = require('electron')
const { powerMonitor, BrowserWindow, app } = remote;
const child = require('child_process');
const path = require('path');



const WINDOW_STATE = {
    NULL: {}
}
const WIN_MODES = {
    PAPERCUT: "PAPERCUT",
    VERITIME: "VERITIME",
}

const VERITIME_URL = "https://veritime.aesoponline.com/Clock?Org=10717&KID=1593"
var MAX_IDLE_TIME = 6;
const VERITIME_BUTTON = document.getElementById('vtLaunch');
const PAPERCUT_BUTTON = document.getElementById('papercutLaunch');
//const PAPERCUT_CWD = path.join(path.dirname(__dirname), "PCRelease");
const PAPERCUT_CWD = path.join(`\\\\papercut\\`, 'PCRelease')

let win;
var WIN_MODE = null;

const loadVeritime = () => {
    win = new BrowserWindow({
        fullscreen: true,
    });
    win.loadURL(VERITIME_URL);
    win.show();
    // Veritime may have a longer idle time if user is preparing to use the barcode scanner. 
    // So I increased the idle time here. 
    MAX_IDLE_TIME = 10;
    WIN_MODE = WIN_MODES.VERITIME;
}

const loadPapercut = async () => {
    win = await child.spawn("pc-release.exe", {
        cwd: PAPERCUT_CWD,
    });
    WIN_MODE = WIN_MODES.PAPERCUT;
    MAX_IDLE_TIME = 10;
    
}

const checkForActivity = () => {
    var idleTime = powerMonitor.getSystemIdleTime();
    if (idleTime >= MAX_IDLE_TIME) {
        if (win !== WINDOW_STATE.NULL) {
            switch (WIN_MODE) {
                case WIN_MODES.PAPERCUT:
                    win.kill();
                    win = null;
                    WIN_MODE = null;
                    break;
                case WIN_MODES.VERITIME:
                    win.close();
                    win = null;
                    WIN_MODE = null;
                    break;
                
            }
        }
    }
}



VERITIME_BUTTON.addEventListener('click', loadVeritime);
PAPERCUT_BUTTON.addEventListener('click', loadPapercut);

setInterval(checkForActivity, 500);
