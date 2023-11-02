const sign = require("./sign");
const call = require("./call");
const send = require("./send");
const utils = require("./utils");
const Web3 = require('web3')


class w3 {
    sign;
    call;
    send;
    constructor(chainId, rpc) {
        const web3 = new Web3(new Web3.providers.HttpProvider(rpc))
        sign.setWeb3(web3, chainId)
        call.setWeb3(web3, chainId)
        send.setWeb3(web3, chainId)
    }
}
module.exports = {
    sign,
    call,
    send,
    utils,
    w3
}