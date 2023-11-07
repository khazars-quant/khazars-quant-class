const utils = require("../../utils/index");
const request = utils.request;
const sign = utils.sign.binance;

class main {
    router = {
        allOrders: "/fapi/v1/allOrders",
        balance: "/fapi/v2/balance",
        account: "/fapi/v2/account",
        leverage: "/fapi/v1/leverage",
        marginType: "/fapi/v1/marginType",
        userTrades: "/fapi/v1/userTrades",
        income: "/fapi/v1/income",
        order: "/fapi/v1/order",
        openOrder: "/fapi/v1/openOrder",
        allOrder: "/fapi/v1/allOrders",
        dual: "/fapi/v1/positionSide/dual",
        multiAssetsMargin: "/fapi/v1/multiAssetsMargin",
        positionRisk: "/fapi/v2/positionRisk"
    }
    constructor(url, KEY, SEC) {
        this.baseUrl = url || "https://fapi.binance.com"
        this.KEY = KEY || false
        this.SEC = SEC || false
    }

    link(path) {
            return this.baseUrl + this.router[path]
        }
        //Get request
    async account(data, KEY, SEC) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        data = await sign.signData(SEC, data)
        var options = {
            'method': 'GET',
            'url': this.link("account") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    async balance(data, KEY, SEC) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        data = await sign.signData(SEC, data)
        var options = {
            'method': 'GET',
            'url': this.link("balance") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    async positionRisk(data, KEY, SEC) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        data = await sign.signData(SEC, data)
        var options = {
            'method': 'GET',
            'url': this.link("positionRisk") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    async openOrder(data, KEY, SEC) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        data = await sign.signData(SEC, data)
        var options = {
            'method': 'GET',
            'url': this.link("openOrder") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    async allOrder(data, KEY, SEC) {
            KEY = KEY || this.KEY
            SEC = SEC || this.SEC
            data = await sign.signData(SEC, data)
            var options = {
                'method': 'GET',
                'url': this.link("allOrder") + "?" + data.path + '&signature=' + data.sign,
                'headers': {
                    'Content-Type': 'application/json',
                    'X-MBX-APIKEY': KEY
                }
            };
            return request.req(options);
        }
        //Mulity actions || Differ method

    async dual(data, KEY, SEC, type) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        var method = 'GET'
        if (type) {
            method = 'POST'
        }
        data = await sign.signData(SEC, data)
        var options = {
            'method': method,
            'url': this.link("dual") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    async multiAssetsMargin(data, KEY, SEC, type) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        var method = 'GET'
        if (type) {
            method = 'POST'
        }
        data = await sign.signData(SEC, data)
        var options = {
            'method': method,
            'url': this.link("multiAssetsMargin") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    async order(data, KEY, SEC, type) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        var method = type
        data = await sign.signData(SEC, data)
        var options = {
            'method': method,
            'url': this.link("order") + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

    /**
     * 
     * pair : string , eg : "ETHUSDT"
     * side : string , eg : "open" | "close"
     * positionSide : string , eg : "LONG" | "SHORT"
     * price : number , eg : 129.1 | -1 (marketOrder)
     * amount : number , eg : 0.81
     */

    async placeOrder(KEY, SEC, pair, side, positionSide, price, amount) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        var data = {
            symble: pair,
            side: "",
            positionSide: "",
            type: "",
            quantity: ""
        }
        if (side == "open") {
            if (positionSide == "LONG") {
                data.side = "BUY"
            } else {
                data.side = "SELL"
            }
        } else {
            if (positionSide == "LONG") {
                data.side = "SELL"
            } else {
                data.side = "BUY"
            }
        }
        data.positionSide = positionSide

        if (price > 0) {
            data.type = "MARKET"
        } else {
            data['price'] = price;
            data.type = "LIMIT"
        }

        data.quantity = amount;

        return await this.order(data, KEY, SEC, "POST")
    }

    /**
     * 
     * data : {
     * symble : string ,
     * oriderId : string , | Optional
     * }
     * 
     */
    async deleteOrder(KEY, SEC, data) {
        return this.order(data, KEY, SEC, "DELETE")
    }

}
module.exports = {
    main
}