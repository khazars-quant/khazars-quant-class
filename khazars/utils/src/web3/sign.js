var web3;
var chainId
async function doSignTransaction(txn) {
    return await web3.eth.accounts.signTransaction(txn, process.env.PRIVATE_KEY);
}

async function signTxn(to, tx) {
    const gas = await tx.estimateGas({ from: process.env.PUBLIC_ADDRESS });
    const gasPrice = await web3.eth.getGasPrice();
    const gasComsume = gas * gasPrice / 1e18;
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_ADDRESS);
    console.log(nonce)
    return await web3.eth.accounts.signTransaction({
            to: to,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: chainId
        },
        process.env.PRIVATE_KEY
    );
}

async function signTxnWithKey(to, tx, keypair) {

    const gas = await tx.estimateGas({ from: keypair.address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(keypair.address);
    console.log(nonce)
    return await web3.eth.accounts.signTransaction({
            to: to,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: chainId
        },
        keypair.privateKey
    );
}
async function signTxnWithKeyValue(to, tx, keypair, value) {

    const gas = await tx.estimateGas({ from: keypair.address, value: value });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(keypair.address);
    console.log(nonce)
    var methods = {
        to: to,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: chainId,
        value: value
    }
    return await web3.eth.accounts.signTransaction(
        methods,
        keypair.privateKey
    )
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
    doSignTransaction,
    signTxnWithKeyValue,
    signTxnWithKey,
    signTxn,
    getWeb3,
    setWeb3,
}