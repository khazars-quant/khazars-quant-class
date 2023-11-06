const utils = require("./utils/index");
const cefi = require("./cefi/index");
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
        return this;
    }
    setSetting(type, keys, chain) {
        switch (type) {
            case "uniswap":
            case "1inchswap":
                var keypair = utils.w3.utils.getKeyPair(keys[0])
                var s = {
                    type: type,
                    defi: true,
                    keypair: keypair,
                    chain: {
                        chainId: chain.chainId,
                        rpc: chain.rpc
                    }
                }
                this.setting = s
                this.obj = {};
                break;
            case "binance_spot":
            case "binance_future":
            case "okex_spot":
            case "okex_future":
                var s = {
                    type: type,
                    defi: false,
                    url: chain || false,
                    keypair: {
                        KEY: keys[0],
                        SEC: keys[1]
                    }
                }
                this.setting = s
                switch (type) {
                    case "binance_spot":
                        this.obj = new cefi.binance_spot.main(s.url, s.keypair.SEC);
                        break;
                    case "binance_future":
                        this.obj = new cefi.binance_future.main(s.url, s.keypair.SEC);
                        break;
                    default:
                        this.obj = {};
                        break;
                }
                break;
            default:
                return "unsupport exchanges";
        }
    }

    getSetting() {
        return this.setting;
    }

    //🚀 The core functions of mixed calling . 
    async account(data) {
        return this.obj.account(data)
    }

}

module.exports = {
    quant,
    utils
}