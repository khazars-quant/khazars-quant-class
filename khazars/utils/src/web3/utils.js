const Web3 = require('web3')
const web3 = Web3

function isAddress(add) {
    return web3.utils.isAddress(add)
}

function newAccount() {
    return web3.eth.accounts.create();
}

async function getGwei() {
    return (await web3.eth.getGasPrice()) / Math.pow(10, 9);
}

function getKeyPair(privateKey) {
    return web3.eth.accounts.privateKeyToAccount(privateKey);
}

function toWei(num) {
    return web3.utils.toWei(num, 'ether')
}
module.exports = {
    newAccount,
    isAddress,
    getGwei,
    getKeyPair,
    toWei,
}