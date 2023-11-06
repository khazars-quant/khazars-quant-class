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
            dual: "/fapi/v1/positionSide/dual",
            multiAssetsMargin: "/fapi/v1/multiAssetsMargin"
        }
        //The default headers of request 
    constructor(url, KEY, SEC) {
            this.baseUrl = url || "https://fapi.binance.com"
            this.SEC = SEC || false
        }
        //Get request
    link(path) {
        return this.baseUrl + this.router[path]
    }

    async account(data, KEY, SEC) {
        KEY = KEY || this.KEY
        SEC = SEC || this.SEC
        data = await sign.signData(SEC, data)
        var options = {
            'method': 'GET',
            'url': link(account) + "?" + data.path + '&signature=' + data.sign,
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
            'url': link(balance) + "?" + data.path + '&signature=' + data.sign,
            'headers': {
                'Content-Type': 'application/json',
                'X-MBX-APIKEY': KEY
            }
        };
        return request.req(options);
    }

}
module.exports = {
    main
}