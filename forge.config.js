module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin', 'linux'],
            config: {
                authors: "Jonathon Chambers",
                exe: "KioskSwitcher"
            }
        }
    ]
}