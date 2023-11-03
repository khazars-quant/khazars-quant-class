const utils = require("../../utils/index");
const request = utils.request;
const sign = utils.sign.binance;

class main {
    router = {
        allOrders: "/fapi/v1/allOrders",
        balance: "/fapi/v2/balance",
        account: "/fapi/v2/account",

    }
    constructor(url) {
            if (url) {
                this.baseUrl = url;
            } else {
                this.baseUrl = "https://fapi.binance.com/fapi/v"
            }
        }
        //Get request 

}
module.exports = {
    main
}