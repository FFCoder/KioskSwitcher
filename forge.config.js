module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin', 'linux'],
            config: {
                authors: "Jonathon Chambers",
                exe: "KioskSwitcher"
            }
        },
        {
            "name": "@electron-forge/maker-squirrel",
            "config": {
              "name": "switcher",
              "authors": "Jonathon Chambers",
              "copyright": "Griffin-Spalding County Schools",
              "description": "A Simple Kiosk App to Switch between Veritime and Papercut",
              "setupExe": "SwitcherKiosk-Install",
              "setupMsi": "SwitcherKiosk-InstallMSI"
            }
          }
    ],
    "electronPackagerConfig": {
        asar: true
      }
}