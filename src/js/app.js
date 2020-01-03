const { remote } = require('electron')
const { powerMonitor, BrowserWindow, app } = remote;
const child = require('child_process');
const path = require('path');

const env = {
    ...process.env,
    NO_UPDATE_NOTIFIER: true,
}


const WINDOW_STATE = {
    NULL: {}
}
const WIN_MODES = {
    PAPERCUT: "PAPERCUT",
    VERITIME: "VERITIME",
}

const VERITIME_URL = "https://veritime.aesoponline.com/Clock?Org=10717&KID=1593";
// Trying out a max time of 10 seconds. Will adjust if needed.
var MAX_IDLE_TIME = 10;
const VERITIME_BUTTON = document.getElementById('vtLaunch');
const PAPERCUT_BUTTON = document.getElementById('papercutLaunch');
const PAPERCUT_CWD = path.join(`\\\\papercut\\`, 'PCRelease')

let win;
var WIN_MODE = null;

const showWaitingMessage = (windowTimeout) => {
    var main_win = document.getElementById('main_win');
    var warning_alert = document.createElement('div');
    warning_alert.classList.add('alert');
    warning_alert.classList.add('alert-info');
    warning_alert.innerHTML = "A test alert";
    main_win.appendChild(warning_alert);
}

const loadVeritime = () => {
    win = new BrowserWindow({
        fullscreen: true,
    });
    win.loadURL(VERITIME_URL);
    win.show();
    WIN_MODE = WIN_MODES.VERITIME;
}

const loadPapercut = () => {
    win = child.spawn("pc-release.exe", {
        cwd: PAPERCUT_CWD,
        env: env
    });
    WIN_MODE = WIN_MODES.PAPERCUT;
    showWaitingMessage(5);
    
}

// Checks to see if screen has been inactive for MAX_IDLE_TIME(Variable) and 
// if so, will close the running task.
// TODO: Find a more elegant solution.
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
