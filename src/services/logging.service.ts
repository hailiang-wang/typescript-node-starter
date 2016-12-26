/* Logger Utility */

/**
 * Logger definition
 */

const log4js = require('log4js');
const levels = ["INFO", "DEBUG", "ERROR"];
var level = "DEBUG";
const path = require('path');
const events = require('events');
const dynamicLogging = new events.EventEmitter();
const u = require("util");
const fs = require('fs');
const configFilePath = path.resolve(__dirname, '../config/log4js.json');
const logFilePath = path.resolve(__dirname, '../logs');

dynamicLogging.setMaxListeners(50);

fs.stat(logFilePath, function (err, stats) {
    if (err) {
        fs.mkdir(logFilePath, "0744", function () {
            log4js.configure(configFilePath, {
                reloadSecs: 180
            });
        });
    } else {
        log4js.configure(configFilePath, {
            reloadSecs: 180
        });
    }
});

function getLogger(name) {
    let logger = log4js.getLogger(name);
    logger.setLevel(level);
    dynamicLogging.on("levelChange", function (newLevel) {
        console.log(u.format("logger %s -- > Level : %s ", name, newLevel));
        logger.setLevel(newLevel);
    });
    return logger;
};

function hasLevel(levelName) {
    for (let i = 0; i < levels.length; i++) {
        if (levelName === levels[i]) {
            return true;
        }
    }
    return false;
};

function getLevel() {
    return level;
};

function resetLevel() {
    dynamicLogging.emit("levelChange", getLevel());
};

function setLevel(_level) {
    level = _level;
};

export default {
    getLevel: getLevel,
    resetLevel: resetLevel,
    setLevel: setLevel,
    getLogger: getLogger,
    hasLevel: hasLevel
}