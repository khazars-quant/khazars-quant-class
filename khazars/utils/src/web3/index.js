const sign = require("./sign");
const call = require("./call");
const send = require("./send");

const Web3 = require('web3')


class w3 {
    sign;
    call;
    send;
    constructor(chianId, rpc) {
        const web3 = new Web3(new Web3.providers.HttpProvider(rpc))
    }
}
module.exports = {
    sign,
    call,
    send,
    w3
}