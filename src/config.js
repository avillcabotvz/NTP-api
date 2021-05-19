const fs = require('fs');

function readConfig() {
    let configJSON = null;
    try {
        configJSON = fs.readFileSync('config.json');
    } catch (err) {
        // No config file
    }

    return configJSON ? JSON.parse(configJSON) : {};
}

const config = readConfig();

module.exports = config;
