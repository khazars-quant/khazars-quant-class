const ERC20ABI = require("./ERC20.json");
const uniSwapV2ABI = require("./uniSwapV2.json");
const uniSwapV2PairABI = require("./uniSwapV2Pair.json");
const abiConfig = {
    "UniSwapV2": {
        "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
        "abi": uniSwapV2ABI
    },
    "UniSwapV2Pair": {
        "address": "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
        "abi": uniSwapV2PairABI
    },
    "Erc20": {
        "abi": ERC20ABI
    }
}

function getConfig(functions) {
    return abiConfig[functions];
}
module.exports = {
    getConfig
}