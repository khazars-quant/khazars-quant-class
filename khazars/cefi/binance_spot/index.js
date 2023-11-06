const utils = require("../../utils/index");
const request = utils.request;
const sign = utils.sign.binance;

class main {
    router = {
            account: "/api/v3/account",
        }
        //The default headers of request 
    constructor(url, KEY, SEC) {
            this.baseUrl = url || "https://api.binance.com"
            this.KEY = KEY || false
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
            'url': this.link("account") + "?" + data.path + '&signature=' + data.sign,
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