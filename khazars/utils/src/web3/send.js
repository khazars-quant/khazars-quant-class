const contractConfig = require("./abi/abis")
const s = require("./sign");
var BigNumber = require("bignumber.js")
var web3;
var chainId;
/**
 * 🚀 Send Out Transactions
 */
async function uniswapETHForTokens(tokenA, tokenB, amountIn, amountOut, deadLine, to, keypair) {
    const contractInfo = contractConfig.getConfig("UniSwapV2");
    const Ctr = new web3.eth.Contract(contractInfo.abi, contractInfo.address);
    amountIn = web3.utils.toWei(amountIn, 'ether');
    const tx = Ctr.methods.swapETHForExactTokens(
        (Number(amountOut)).toFixed(0),
        // amountIn,
        [tokenA, tokenB],
        to,
        deadLine
    );
    try {
        const signedTx = await s.signTxnWithKeyValue(contractInfo.address, tx, keypair, amountIn);
        var methods = signTxn.methods;
        signedTx = signedTx.tx;
        // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    } catch (e) {
        console.log(e)
        return false;
    }

}

async function uniswapTokensForExactETH(tokenA, tokenB, amountIn, amountOut, deadLine, to, keypair) {
    const contractInfo = contractConfig.getConfig("UniSwapV2");
    const Ctr = new web3.eth.Contract(contractInfo.abi, contractInfo.address);
    const tx = Ctr.methods.swapTokensForExactETH(
        amountOut, // (Number()).toFixed(0),
        amountIn,
        // amountIn,
        [tokenA, tokenB],
        to,
        deadLine
    );
    try {
        const signedTx = await s.signTxnWithKey(contractInfo.address, tx, keypair, amountIn);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    } catch (e) {
        console.log(e)
        return false;
    }
}

async function erc20Approve(tokenA, target, amount) {
    const contractInfo = contractConfig.getConfig("Erc20");
    const Ctr = new web3.eth.Contract(contractInfo.abi, tokenA.toLowerCase());
    const tx = Ctr.methods.approve(target, amount);
    const signedTx = await signTxn(contractInfo.address, tx);

    if (signedTx == 0) {
        //Gas Limit 
        return 0;
    }
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}

async function erc20ApproveUniswap(tokenA, amount, keypair) {
    const contractInfo = contractConfig.getConfig("Erc20");
    const uni = contractConfig.getConfig("BotRouter");
    const Ctr = new web3.eth.Contract(contractInfo.abi, tokenA.toLowerCase());
    const tx = Ctr.methods.approve(uni.address, new BigNumber(amount));
    const signedTx = await s.signTxnWithKey(tokenA, tx, keypair);
    console.log(signedTx)
    if (signedTx == 0) {
        //Gas Limit 
        return 0;
    }
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
}
/**
 * promis functions 
 */

async function sendPromise(web3, signedTx) {
    try {
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    } catch (e) {
        return false;
    }
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
    uniswapETHForTokens,
    uniswapTokensForExactETH,
    erc20Approve,
    erc20ApproveUniswap,
    sendPromise,
    getWeb3,
    setWeb3
}