const util = require('util');

const delay = util.promisify(setTimeout);
require('console-stamp')(console);

module.exports = {
    getItemFromList: function (list) {
        return list[Math.floor((Math.random() * list.length))];
    },

    sleep: async function (seconds) {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    },

    retry: async (fn, retryDelay = 10, numRetries = 3) => {
        for (let i = 0; i < numRetries; i++) {
            try {
                return await fn()
            } catch (e) {
                console.error(e)
                if (i === numRetries - 1) throw e
                await delay(retryDelay * 1000)
                retryDelay = retryDelay * 2
            }
        }
    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    },

    chooseUserAgent(choice) {
        var random = this.getRandomInt(0, 100);
        var system = null;
        var browserVersion = null;

        for (const [key, val] of Object.entries(choice)) {
            if (random >= val['probScope'][0] && random <= val['probScope'][1]) {
                system = val['value'];
                console.info(`Select system: ${system} - ${random}`);

                var randomB = this.getRandomInt(0, 100);
                for (const [bkey, bval] of Object.entries(val['browsers'])) {
                    if (randomB >= bval['probScope'][0] && randomB <= bval['probScope'][1]) {
                        var randomV = this.getRandomInt(0, 100);
                        console.info(`Select browser: ${bkey} - ${randomB}`);
                        for (const [vkey, vval] of Object.entries(bval['versions'])) {
                            if (randomV >= vval['probScope'][0] && randomV <= vval['probScope'][1]) {
                                browserVersion = vval['value'];

                                console.info(`Select browser version: ${browserVersion}  - ${randomV}`);
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        return [system, browserVersion];
    }
}
