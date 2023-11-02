const utils = require("../../utils/index");
const request = utils.request;

class main {
    constructor(url) {
        if (url) {
            this.baseUrl = url;
        } else {
            this.baseUrl = "https://fapi.binance.com/fapi/v"
        }
    }
}
module.exports = {
    main
}