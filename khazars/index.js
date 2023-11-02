const utils = require("./utils/index");

/**
 * About the quant trading class :: 
 * Not going to wast my time for this lol O_o.....
 * 
 * Support exchanges :: 
 * 1.uniswap
 * 2.1inchswap
 * 3.binance_spot
 * 4.binance_future
 * 5.okex_spot
 * 6.okex_future
 */

class quant {
    //Init the qunat 
    constructor(
        type, // string
        keys, // array of keys | privateKeys
        chain, // option , for defi require
    ) {
        this.setSetting(type, keys, chain)
        this.setting = true;
    }
    setSetting(type, keys, chain) {
        switch (type) {
            case "uniswap", "1inchswap":
                var setting = {
                    type: type
                }
                break;
            case "binance_spot", "binance_future", "okex_spot", "okex_future":
                break;
            default:
                return "unsupport exchanges";
        }
    }

    getSetting() {
        return this.setting;
    }
}

module.exports = {
    quant,
    utils
}