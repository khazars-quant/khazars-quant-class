const contractConfig = require("./abi/abis")
var BigNumber = require("bignumber.js")
var web3;
var chainId;
/**
 * Event system
 */
async function getEventByHash(txHash) {
    return await getWeb3().eth.getTransactionReceipt(txHash)
}

/**
 * Call system
 */

async function getBalance(address) {
    return await getWeb3().eth.getBalance(address)
}

async function uniSwapV2Quote(tokenA, tokenB, amount) {
    const contractInfo = contractConfig.getConfig("UniSwapV2");
    const Ctr = new getWeb3().eth.Contract(contractInfo.abi, contractInfo.address);
    var ret;
    await Ctr.methods.getAmountsOut(new BigNumber(amount), [tokenA.toLowerCase(), tokenB.toLowerCase()]).call()
        .then(function(result) {
            ret = result;
        });
    return ret;
}

async function erc20Balance(walletAddress, tokenAddress) {
    const contractInfo = contractConfig.getConfig("Erc20");
    var Ctr = new getWeb3().eth.Contract(contractInfo.abi, tokenAddress.toLowerCase());
    var ret;
    await Ctr.methods.balanceOf(walletAddress).call()
        .then(function(result) {
            ret = result;
        });
    return ret;
}

async function erc20Allowance(tokenAddress, owner) {
    const contractInfo = contractConfig.getConfig("Erc20");
    const uni = contractConfig.getConfig("BotRouter");
    var Ctr = new getWeb3().eth.Contract(contractInfo.abi, tokenAddress.toLowerCase());
    var ret;
    await Ctr.methods.allowance(owner, uni.address).call()
        .then(function(result) {
            ret = result;
        });
    return ret;
}

async function erc20Name(tokenAddress) {
    const contractInfo = contractConfig.getConfig("Erc20");
    var Ctr = new getWeb3().eth.Contract(contractInfo.abi, tokenAddress.toLowerCase());
    var ret;
    await Ctr.methods.name().call()
        .then(function(result) {
            ret = result;
        });
    return ret;
}

async function erc20Symbol(tokenAddress) {
    const contractInfo = contractConfig.getConfig("Erc20");
    var Ctr = new getWeb3().eth.Contract(contractInfo.abi, tokenAddress.toLowerCase());
    var ret;
    await Ctr.methods.symbol().call()
        .then(function(result) {
            ret = result;
        });
    return ret;
}

async function erc20Decimals(tokenAddress) {
    const contractInfo = contractConfig.getConfig("Erc20");
    var Ctr = new getWeb3().eth.Contract(contractInfo.abi, tokenAddress.toLowerCase());
    var ret;
    await Ctr.methods.decimals().call()
        .then(function(result) {
            ret = result;
        });
    return ret;
}

async function getWeb3() {
    return web3;
}

async function setWeb3(w, c) {
    web3 = w;
    chainId = c
    return true;
}
module.exports = {
    uniSwapV2Quote,
    getEventByHash,
    getBalance,
    erc20Balance,
    erc20Allowance,
    erc20Name,
    erc20Symbol,
    erc20Decimals,
    setWeb3,
}